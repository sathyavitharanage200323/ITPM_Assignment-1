```md
# ITPM Assignment 1 — SwiftTranslator Test Automation (Option 1)

Automated functional + UI testing for **Singlish → Sinhala** translation using **Playwright** on:  
https://www.swifttranslator.com/

## What this repo does
- Runs **24 Positive functional scenarios** (expected **Pass**)
- Runs **14 Negative functional scenarios** (expected **Fail** to show incorrect behavior)
- Runs **1 UI scenario** (`UI_0001`) to test UI stability (rapid swap)

Generates:
- ✅ CSV report (assignment template columns)
- ✅ Screenshots evidence (Fail-only + UI)

---

## Project structure
```

ITPM assaingnment 1/
package.json
playwright.config.js
cases.option1.js
tests/
translator.spec.js
reports/                 (generated)
translator-results.csv
screenshots/             (generated)
fails/
ui/

````

---

## Requirements
- **Node.js 18+** recommended
- Windows PowerShell / Terminal

Check:
```bash
node -v
npm -v
````

---

## Install

From the project root:

1. (Optional) Create `package.json` if missing:

```bash
npm init -y
```

2. Install Playwright Test:

```bash
npm i -D @playwright/test
```

3. Install browsers:

```bash
npx playwright install
```

Or Chromium only (recommended):

```bash
npx playwright install chromium
```

---

## Run tests (recommended)

Run **Chromium only** with **1 worker** (most stable):

```bash
npx playwright test --project=chromium --workers=1
```

Optional: open Playwright HTML report:

```bash
npx playwright show-report
```

---

## Outputs

After running:

### CSV report

```
reports/translator-results.csv
```

Columns match the assignment template:

* TC ID
* Test case name
* Input length type
* Input
* Expected output
* Actual output
* Status
* Accuracy justification/ Description of issue type
* What is covered by the test

### Screenshots (evidence)

Fail-only functional screenshots:

```
screenshots/fails/
```

Files:

* `{TC_ID}-FAIL.png` (full page)
* `{TC_ID}-input.png` (input close-up)
* `{TC_ID}-output.png` (output close-up)

UI screenshot:

```
screenshots/ui/
```

File:

* `UI_0001-Pass.png` or `UI_0001-Fail.png`

---

## Where to edit

* Test scenarios list:

  * `cases.option1.js` (24 Pos + 14 Neg)
* Playwright automation + CSV + screenshots + UI scenario:

  * `tests/translator.spec.js`

---

## Troubleshooting

### ❌ Cannot find module '../cases.option1.js'

Make sure `cases.option1.js` is in the project root (same level as `package.json`).

### ❌ Cannot use --browser option when configuration file defines projects

Use:

```bash
npx playwright test --project=chromium
```

NOT:

```bash
npx playwright test --browser=chromium
```

### ❌ Flaky run / page closes / timeouts

Use a single worker:

```bash
npx playwright test --project=chromium --workers=1
```

---

## Note about Negative scenarios

Negative scenarios are intentionally designed to expose incorrect conversions.
If the translator improves and some Neg tests start passing, update Neg inputs/expected outputs to keep **14 failures** required by the assignment.

```
```
