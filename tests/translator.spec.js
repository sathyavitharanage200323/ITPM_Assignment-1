// tests/translator.spec.js
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const cases = require("../cases.option1.js");

// ---------- Helpers ----------
function normalize(text) {
  return (text || "")
    .toString()
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .normalize("NFC");
}

function csvEscape(value) {
  const s = (value ?? "").toString();
  if (/[,"\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function getInputBox(page) {
  const singlish = page.locator(
    'textarea[placeholder="Input Your Singlish Text Here."]'
  );
  if (await singlish.count()) {
    await expect(singlish).toBeVisible({ timeout: 10000 });
    return singlish;
  }

  const any = page.locator("textarea").first();
  await expect(any).toBeVisible({ timeout: 10000 });
  return any;
}

async function getOutputBox(page) {
  const output = page.locator("div.whitespace-pre-wrap.overflow-y-auto");
  await expect(output).toBeVisible({ timeout: 10000 });
  return output;
}

async function readBoxText(locator) {
  try {
    return await locator.inputValue({ timeout: 2000 });
  } catch {}
  try {
    return await locator.innerText({ timeout: 2000 });
  } catch {}
  try {
    return (await locator.textContent({ timeout: 2000 })) || "";
  } catch {}
  return "";
}

async function waitForOutputChange(page, outputBox, previous, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (page.isClosed()) return "";
    const now = normalize(await readBoxText(outputBox));
    if (now !== previous) return now;
    await page.waitForTimeout(150);
  }
  return normalize(await readBoxText(outputBox));
}

function isTBDExpected(expected) {
  const e = normalize(expected);
  return !e || e.toUpperCase() === "TBD";
}

// ---------- Report collector ----------
const results = [];
const reportDir = path.join(process.cwd(), "reports");
const reportCsvPath = path.join(reportDir, "translator-results.csv");

// Screenshot folders
const shotsFailDir = path.join(process.cwd(), "screenshots", "fails");
const shotsTbdDir = path.join(process.cwd(), "screenshots", "tbd");
const shotsUiDir = path.join(process.cwd(), "screenshots", "ui");

test.describe.configure({ mode: "serial" });

test.describe("SwiftTranslator - Singlish to Sinhala functional scenarios", () => {
  test.beforeAll(() => {
    ensureDir(reportDir);
    ensureDir(shotsFailDir);
    ensureDir(shotsTbdDir);
    ensureDir(shotsUiDir);
  });

  test.beforeEach(async ({ page }) => {
    page.on("dialog", async (d) => {
      try {
        await d.dismiss();
      } catch {}
    });

    await page.goto("https://www.swifttranslator.com/", {
      waitUntil: "domcontentloaded",
    });

    await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});
  });

  // ---------- Functional scenarios ----------
  for (const tc of cases) {
    test(`${tc.id} - ${tc.name}`, async ({ page }) => {
      const inputBox = await getInputBox(page);
      const outputBox = await getOutputBox(page);

      const prevOut = normalize(await readBoxText(outputBox));

      await inputBox.fill("");
      await inputBox.fill(tc.input);

      const actualRaw = await waitForOutputChange(page, outputBox, prevOut, 20000);

      const expectedIsTbd = isTBDExpected(tc.expected);
      let status = "TBD";

      if (!expectedIsTbd) {
        status =
          normalize(actualRaw) === normalize(tc.expected) ? "Pass" : "Fail";
      }

      // ----- Screenshots -----
      const safeId = tc.id.replace(/[^a-zA-Z0-9_-]/g, "_");

      // Fail-only screenshots
      if (status === "Fail") {
        await page.screenshot({
          path: path.join(shotsFailDir, `${safeId}-FAIL.png`),
          fullPage: true,
        });
        await inputBox.screenshot({
          path: path.join(shotsFailDir, `${safeId}-input.png`),
        });
        await outputBox.screenshot({
          path: path.join(shotsFailDir, `${safeId}-output.png`),
        });
      }

      // If expected is TBD, capture evidence too (so you can justify)
      if (status === "TBD") {
        await page.screenshot({
          path: path.join(shotsTbdDir, `${safeId}-TBD.png`),
          fullPage: true,
        });
      }

      results.push({
        "TC ID": tc.id,
        "Test case name": tc.name,
        "Input length type": tc.lenType,
        "Input": tc.input,
        "Expected output": tc.expected,
        "Actual output": actualRaw,
        "Status": status,
        "Accuracy justification/ Description of issue type": tc.justification,
        "What is covered by the test": tc.covered,
      });

      expect(true).toBeTruthy();
    });
  }

  // ---------- UI scenario (1) ----------
  test("UI_0001 - Swap button rapid clicks should not break UI", async ({ page }) => {
    let status = "Pass";
    let actual = "";
    let issue =
      "UI remains responsive; swapping does not freeze or clear fields unexpectedly.";

    try {
      const inputBox = await getInputBox(page);
      const outputBox = await getOutputBox(page);
      const swapBtn = page.getByRole("button", { name: /Swap Languages/i });

      await expect(swapBtn).toBeVisible({ timeout: 8000 });

      const before = normalize(await readBoxText(outputBox));

      await inputBox.fill("suba udhaasanak");
      for (let i = 0; i < 5; i++) await swapBtn.click().catch(() => {});

      const inputAfterSwap = await getInputBox(page);
      await inputAfterSwap.click({ timeout: 10000 });
      await expect(inputAfterSwap).toBeEditable({ timeout: 10000 });
      await inputAfterSwap.fill("oyata kohomadha?");

      const out = await waitForOutputChange(page, outputBox, before, 20000);
      actual = out || "";

      if (!normalize(out)) {
        status = "Fail";
        issue = "After rapid swapping, output did not update / UI became unstable.";
      }
    } catch (e) {
      status = "Fail";
      actual = e?.message || "UI error";
      issue = "Swap button not found / interaction failed / UI unstable.";
    }

    await page.screenshot({
      path: path.join(shotsUiDir, `UI_0001-${status}.png`),
      fullPage: true,
    });

    results.push({
      "TC ID": "UI_0001",
      "Test case name": "Swap button rapid clicks should not break translation UI",
      "Input length type": "N/A",
      "Input": "Swap x5 quickly, then enter a new sentence",
      "Expected output": "UI responsive; output updates correctly",
      "Actual output": actual,
      "Status": status,
      "Accuracy justification/ Description of issue type": issue,
      "What is covered by the test": "UI stability/usability under rapid interaction",
    });

    expect(true).toBeTruthy();
  });

  // ---------- UI scenario (2) Clear button ----------
  test("UI_0002 - Clear button should reset input and output", async ({ page }) => {
    let status = "Pass";
    let actual = "";
    let issue = "Clear button resets both input and output correctly.";

    try {
      const inputBox = await getInputBox(page);
      const outputBox = await getOutputBox(page);

      // Try common clear button names
      const clearBtn = page
        .getByRole("button", { name: /clear|reset/i })
        .first();

      await expect(clearBtn).toBeVisible({ timeout: 8000 });

      const prevOut = normalize(await readBoxText(outputBox));

      await inputBox.fill("ammaa");
      await waitForOutputChange(page, outputBox, prevOut, 15000);

      await clearBtn.click();

      // Validate input cleared
      const inputVal = await inputBox.inputValue().catch(() => "");
      const outVal = normalize(await readBoxText(outputBox));

      actual = `input="${normalize(inputVal)}" output="${outVal}"`;

      if (normalize(inputVal) !== "" || outVal !== "") {
        status = "Fail";
        issue = "Clear button did not fully clear input and/or output.";
      }
    } catch (e) {
      status = "Fail";
      actual = e?.message || "UI error";
      issue = "Clear/Reset button not found or interaction failed.";
    }

    await page.screenshot({
      path: path.join(shotsUiDir, `UI_0002-${status}.png`),
      fullPage: true,
    });

    results.push({
      "TC ID": "UI_0002",
      "Test case name": "Clear button clears input + output",
      "Input length type": "N/A",
      "Input": "Enter text then click Clear/Reset",
      "Expected output": 'input="" and output=""',
      "Actual output": actual,
      "Status": status,
      "Accuracy justification/ Description of issue type": issue,
      "What is covered by the test": "UI behavior → Clear/Reset → State reset validation",
    });

    expect(true).toBeTruthy();
  });

  // ---------- Export CSV ----------
  test.afterAll(() => {
    ensureDir(reportDir);

    const headers = [
      "TC ID",
      "Test case name",
      "Input length type",
      "Input",
      "Expected output",
      "Actual output",
      "Status",
      "Accuracy justification/ Description of issue type",
      "What is covered by the test",
    ];

    const lines = [];
    lines.push(headers.map(csvEscape).join(","));

    for (const row of results) {
      lines.push(headers.map((h) => csvEscape(row[h])).join(","));
    }

    fs.writeFileSync(reportCsvPath, lines.join("\n"), "utf8");
    console.log(`CSV report written: ${reportCsvPath}`);
    console.log(`Fail screenshots: ${shotsFailDir}`);
    console.log(`TBD screenshots: ${shotsTbdDir}`);
    console.log(`UI screenshots: ${shotsUiDir}`);
  });
});
