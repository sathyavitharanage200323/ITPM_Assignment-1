// cases.option1.js
// Dataset based on provided table (Option 1: Singlish -> Sinhala)
// NOTE:
// - UI tests (Clear/Swap) are handled inside translator.spec.js
// - Avoid chat-style abbreviations like "Thx", "u", "gr8" as NEG cases (assignment rule)
// - Duplicate ID fixed: second Pos_Fun_0026 renamed to Pos_Fun_0026A

module.exports = [
  {
    id: "Pos_Fun_0001",
    name: "Family noun - mother",
    lenType: "S",
    input: "ammaa",
    expected: "අම්මා",
    justification: "Correct long-vowel handling: 'aa' → 'ා'. Spelling correct.",
    covered:
      "Daily language usage → Common nouns → Vowel length (aa) → S (≤30) → Accuracy validation",
  },
  {
    id: "Pos_Fun_0002",
    name: "Family noun - father",
    lenType: "S",
    input: "thaththaa",
    expected: "තාත්තා",
    justification:
      "Long vowel missing: expected 'තා' but output lost vowel length; meaning/pronunciation changes.",
    covered:
      "Daily language usage → Common nouns → Vowel length (aa) → S (≤30) → Accuracy failure",
  },
  {
    id: "Pos_Fun_0003",
    name: "Pronoun - I",
    lenType: "S",
    input: "mama",
    expected: "මම",
    justification: "Basic consonant-vowel mapping correct; word preserved.",
    covered:
      "Daily language usage → Pronouns → S (≤30) → Basic mapping → Accuracy validation",
  },
  {
    id: "Pos_Fun_0004",
    name: "Pronoun - we",
    lenType: "S",
    input: "api",
    expected: "අපි",
    justification: "Correct short vowel consonant mapping.",
    covered:
      "Daily language usage → Pronouns → S (≤30) → Basic mapping → Accuracy validation",
  },
  {
    id: "Pos_Fun_0005",
    name: "Imperative verb - read",
    lenType: "S",
    input: "kiyawanna",
    expected: "කියවන්න",
    justification:
      "Mixed-script corruption: unexpected 'w' inserted; breaks Sinhala orthography.",
    covered:
      "Grammatical forms → Verbs/Imperatives → Mixed-script corruption → S (≤30) → Accuracy failure",
  },
  {
    id: "Pos_Fun_0006",
    name: "Simple adjective",
    lenType: "S",
    input: "lassanai",
    expected: "ලස්සනයි",
    justification:
      "Wrong vowel modifier: 'ai' mapped to 'ෛ' incorrectly; changes spelling/meaning.",
    covered:
      "Grammatical forms → Adjectives → Vowel modifier (ai/ෛ) → S (≤30) → Accuracy failure",
  },
  {
    id: "Pos_Fun_0007",
    name: "Plural group",
    lenType: "S",
    input: "api okkoma yamu",
    expected: "අපි ඔක්කොම යමු",
    justification:
      "Multi-word sentence preserved with correct spacing and words.",
    covered:
      "Sentence structures → Simple multi-word → Spacing correctness → S (≤30) → Accuracy validation",
  },
  {
    id: "Pos_Fun_0008",
    name: "Yes/No question",
    lenType: "S",
    input: "oyata therunawada?",
    expected: "ඔයාට තේරෙනවද?",
    justification:
      "Question form corrupted + mixed-script 'w'; incorrect characters and word forms.",
    covered:
      "Sentence structures → Interrogative + punctuation → Mixed-script corruption → S (≤30) → Accuracy failure",
  },
  {
    id: "Pos_Fun_0009",
    name: "WH question location",
    lenType: "S",
    input: "koheda?",
    expected: "කොහෙද?",
    justification:
      "Wrong consonant selection ('ද' vs 'ඩ'); phonetic mapping error.",
    covered:
      "Character mapping → Dental vs retroflex (ද/ඩ) → S (≤30) → Phonetic accuracy failure",
  },
  {
    id: "Pos_Fun_0010",
    name: "Compound with saha",
    lenType: "S",
    input: "ammaa saha thaththaa",
    expected: "අම්මා සහ තාත්තා",
    justification:
      "Second noun loses long vowel again; partial correctness but meaning/pronunciation reduced.",
    covered:
      "Sentence structures → Compound (‘saha’) → Vowel length issue → S (≤30) → Accuracy failure",
  },
  {
    id: "Pos_Fun_0011",
    name: "Cause/effect (nisa)",
    lenType: "M",
    input: "vassa nisa api ada yanne nae",
    expected: "වැස්ස නිසා අපි අද යන්නේ නෑ",
    justification:
      "Multiple errors: missing diacritics; wrong letters (අද→අඩ); shortened forms; meaning degraded.",
    covered:
      "Sentence structures → Cause/effect → Multi-error mapping → M (31–299) → Accuracy failure",
  },
  {
    id: "Pos_Fun_0012",
    name: "Conditional (thibboth)",
    lenType: "M",
    input: "salli thibboth api yamu",
    expected: "සල්ලි තිබ්බොත් අපි යමු",
    justification:
      "Conditional phrase converted correctly; spacing intact.",
    covered:
      "Grammatical forms → Conditional → M (31–299) → Accuracy validation",
  },
  {
    id: "Pos_Fun_0013",
    name: "Future tense",
    lenType: "S",
    input: "heta ennam",
    expected: "හෙට එන්නම්",
    justification:
      "Future suffix '-nnam' preserved correctly; conjunct characters OK.",
    covered:
      "Grammatical forms → Future tense → Conjunct handling → S (≤30) → Accuracy validation",
  },
  {
    id: "Pos_Fun_0014",
    name: "Past action",
    lenType: "S",
    input: "api giya",
    expected: "අපි ගියා",
    justification:
      "Final vowel dropped (ගියා→ගිය); tense/aspect changes.",
    covered:
      "Grammatical forms → Past tense completion → Final vowel handling → S (≤30) → Accuracy failure",
  },
  {
    id: "Pos_Fun_0015",
    name: "Negation",
    lenType: "S",
    input: "mata epa nae",
    expected: "මට එපා නෑ",
    justification:
      "Negation + vowel signs missing; output becomes unnatural and incomplete.",
    covered:
      "Grammatical forms → Negation (නෑ) → Vowel sign loss → S (≤30) → Accuracy failure",
  },
  {
    id: "Pos_Fun_0016",
    name: "Numbers + suffix",
    lenType: "S",
    input: "mata 100k dhenna",
    expected: "මට 100ක් දෙන්න",
    justification:
      "Digits preserved; Sinhala suffix 'ක්' attached correctly.",
    covered:
      "Formatting → Numbers in text → Numeric token handling → S (≤30) → Accuracy validation",
  },
  {
    id: "Pos_Fun_0017",
    name: "Time query",
    lenType: "S",
    input: "dan welava kiyada?",
    expected: "දැන් වෙලාව කීයද?",
    justification:
      "Severe corruption: wrong letters + mixed-script 'w'; question form broken.",
    covered:
      "Daily language usage → Time reference → Mixed-script corruption → S (≤30) → Accuracy failure",
  },
  {
    id: "Pos_Fun_0018",
    name: "Direction command",
    lenType: "S",
    input: "dakunata harenna",
    expected: "දකුණට හැරෙන්න",
    justification:
      "Wrong consonants (ද→ඩ) and missing vowel marks; command meaning degraded.",
    covered:
      "Daily language usage → Commands → Consonant accuracy → S (≤30) → Accuracy failure",
  },
  {
    id: "Pos_Fun_0019",
    name: "Mixed tech terms",
    lenType: "M",
    input: "aluth update eka install karanna",
    expected: "අලුත් update එක install කරන්න",
    justification:
      "English technical words preserved; Sinhala parts correct.",
    covered:
      "Mixed Singlish + English → Technical terms → M (31–299) → Accuracy validation",
  },
  {
    id: "Pos_Fun_0020",
    name: "Brand name handling",
    lenType: "M",
    input: "Facebook eke post ekak damma",
    expected: "Facebook එකේ post එකක් දැම්මා",
    justification:
      "Brand partly unchanged; Sinhala grammar/letters wrong; “එකේ” not converted; “දැම්මා” corrupted.",
    covered:
      "Mixed Singlish + English → Brand names → Grammar + mapping failure → M (31–299)",
  },
  {
    id: "Pos_Fun_0021",
    name: "Weather adjective",
    lenType: "S",
    input: "ada godak rassnei",
    expected: "අද ගොඩක් රස්නෙයි",
    justification:
      "Wrong word (අද→අඩ) and adjective distorted; meaning/spelling incorrect.",
    covered:
      "Daily usage → Adjectives → S (≤30) → Accuracy failure",
  },
  {
    id: "Pos_Fun_0022",
    name: "Punctuation comma",
    lenType: "S",
    input: "hari, yamu",
    expected: "හරි, යමු",
    justification: "Punctuation preserved; words correct.",
    covered:
      "Punctuation handling → Comma preservation → S (≤30) → Accuracy validation",
  },
  {
    id: "Pos_Fun_0023",
    name: "Long paragraph stability",
    lenType: "L",
    input: "TBD",
    expected:
      "මම ගෙඩර එනකොට bus එක late උන. ticket එක online ගට්ට. traffic ගොඩක් තිබ්බ නිස මම පොඩ්ඩක් late. ගෙඩර ගිහින් dinner හඩල නිඩගට්ට.",
    justification:
      "Long input stability observation; keep as robustness/stability evidence.",
    covered:
      "Input variations → Long text (≥300 chars) → Stability + quality degradation",
  },
  {
    id: "Pos_Fun_0025",
    name: "Phrase corrupted - suba dawasak",
    lenType: "S",
    input: "suba dawasak",
    expected: "සුබ දවසක්",
    justification:
      "Confirmed bug: mixed Latin 'w' + wrong Sinhala letters; phrase becomes invalid.",
    covered:
      "Negative testing → Common phrase → Mixed-script corruption → S (≤30)",
  },
  {
    id: "Pos_Fun_0026",
    name: "Greeting corrupted - ayubowan",
    lenType: "S",
    input: "ayubowan",
    expected: "ආයුබෝවන්",
    justification:
      "Mixed-script bug: 'w' appears; greeting becomes wrong/invalid.",
    covered:
      "Negative testing → Greetings → Mixed-script corruption → S (≤30)",
  },
  {
    id: "Pos_Fun_0026A",
    name: "HTML tags not sanitized",
    lenType: "M",
    input: "<div>api yamu</div>",
    expected: "<div>අපි යමු</div>",
    justification:
      "Inner Sinhala converted; tags preserved; system handles tags in this case.",
    covered:
      "Negative testing → Code-like input (HTML) → Sanitization/handling → M (31–299)",
  },
  {
    id: "Pos_Fun_0027",
    name: "Line breaks formatting",
    lenType: "M",
    input: "mama yannawa\no ya enawada?",
    expected: "TBD",
    justification:
      "Newlines may collapse into spaces or break mapping mid-line; verify formatting preservation.",
    covered:
      "Formatting → Line breaks → M (31–299) → Formatting preservation check",
  },
  {
    id: "Pos_Fun_0028",
    name: "Software Update Mixed",
    lenType: "M",
    input: "aluth update eka install karanna",
    expected: "අලුත් update එක install කරන්න",
    justification:
      'Successfully preserved English technical terms "update" and "install".',
    covered:
      "Mixed Singlish + English → Technical terms → M (31–299) → Accuracy validation",
  },
  {
    id: "Pos_Fun_0029",
    name: "Polite Request",
    lenType: "M",
    input: "karunakarala mata udavu karanna",
    expected: "කරුණාකරලා මට උදවු කරන්න",
    justification:
      'Handled the multi-syllabic polite request word "karunakarala" correctly; formal register preserved.',
    covered:
      "Requests → Polite vs informal → M (31–299) → Accuracy validation",
  },
  {
    id: "Pos_Fun_0030",
    name: "Pure Special Chars",
    lenType: "M",
    input: "!@#$%^&*",
    expected: "!@#$%^&*",
    justification:
      "Special characters handling check (verify if system incorrectly processes them).",
    covered: "Formatting → Special characters",
  },
  {
    id: "Pos_Fun_0031",
    name: "Emoji Text Handling",
    lenType: "M",
    input: "suba dhavasak 😊",
    expected: "සුබ දවසක් 😊",
    justification:
      "Emoji handling check (verify if emojis affect transliteration).",
    covered: "Formatting → Emojis",
  },
  {
    id: "Pos_Fun_0032",
    name: "Foreign script mixed",
    lenType: "M",
    input: "mama NiHao yanawa",
    expected: "මම NiHao යනවා",
    justification:
      "Foreign script/word mixing check (verify handling).",
    covered: "Mixed language → Foreign scripts",
  },
  {
    id: "Pos_Fun_0033",
    name: "Repeating consonants stress",
    lenType: "S",
    input: "kkkkkkkkkk",
    expected: "ක්ක්ක්ක්ක්ක්ක්ක්ක්ක්ක්",
    justification:
      "Stress/junk input handling check (verify expected behavior).",
    covered: "Input variations → Junk input/stress",
  },
  {
    id: "Pos_Fun_0034",
    name: "Adjective usage",
    lenType: "S",
    input: "lassana malak",
    expected: "ලස්සන මලක්",
    justification:
      'Successful transliteration of adjective "lassana" and phrase correctness.',
    covered: "Grammatical forms → Adjectives → Accuracy validation",
  },
  {
    id: "Pos_Fun_0035",
    name: "Incorrect capitalization / mixed case",
    lenType: "S",
    input: "aBA kanna mama hari aasa kalaa",
    expected: "aBA කන්න මම හරි ආස කලා",
    justification:
      "Mixed-case/mixed-script handling check (verify corruption issues).",
    covered:
      "Mixed-case text handling → Mixed-script corruption detection",
  },
  {
    id: "Pos_Fun_0036",
    name: "Simple sentence",
    lenType: "S",
    input: "mama aasama poth kiyavanna",
    expected: "මම ආසම පොත් කියවන්න",
    justification: "Sentence converts cleanly; correct word forms.",
    covered: "Daily usage → Simple sentence → Accuracy validation",
  },
  {
    id: "Pos_Fun_0037",
    name: "Repetition emphasis",
    lenType: "S",
    input: "gaenu Lamayi Lamayi harima lassana",
    expected: "ගැනු ළමයි ළමයි හරිම ලස්සන",
    justification: "Repeated word emphasis preserved.",
    covered: "Repeated word expressions → Adjectives → Accuracy validation",
  },
  {
    id: "Pos_Fun_0038",
    name: "Negative preference sentence",
    lenType: "S",
    input: "mama bath kanna aasa nae",
    expected: "මම බත් කන්න ආස නැ",
    justification: "Negation preserved; sentence remains natural.",
    covered: "Negation patterns → Daily usage → Accuracy validation",
  },
  {
    id: "Pos_Fun_0039",
    name: "Institution/common word mixed",
    lenType: "S",
    input: "sliit eka harima lassanayi",
    expected: "ස්ලීට් එක හරිම ලස්සනයි",
    justification: "Mixed proper word preserved; output correct.",
    covered: "Mixed language → Common words/proper nouns → Accuracy validation",
  },
  {
    id: "Pos_Fun_0040",
    name: "Repeated words",
    lenType: "S",
    input: "paata paata samanallu godayi",
    expected: "පාට පාට සමනල්ලු ගොඩයි",
    justification: "Repetition preserved; plural meaning ok.",
    covered: "Repeated word expressions → Daily usage → Accuracy validation",
  },
  {
    id: "Pos_Fun_0041",
    name: "Day to day expression",
    lenType: "S",
    input: "udheema ira paayanava",
    expected: "උදේම ඉර පායනව",
    justification: "Common expression converts correctly.",
    covered: "Daily usage → Expressions → Accuracy validation",
  },
  {
    id: "Pos_Fun_0042",
    name: "Mixed tech terms short",
    lenType: "S",
    input: "wifi harima slow",
    expected: "wifi හරිම slow",
    justification: "Technical terms preserved; Sinhala parts correct.",
    covered: "Mixed Singlish + English → Tech terms → S (≤30)",
  },
  {
    id: "Pos_Fun_0043",
    name: "Simple command",
    lenType: "S",
    input: "pahatha balanna",
    expected: "පහත බලන්න",
    justification: "Imperative preserved; correct Sinhala.",
    covered: "Imperative (command) → S (≤30) → Accuracy validation",
  },
];
