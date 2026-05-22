/**
 * Script to extract hardcoded strings from calculator files
 * and prepare them for translation
 *
 * This script:
 * 1. Scans all calculator .tsx files
 * 2. Identifies hardcoded English strings
 * 3. Generates unique translation keys
 * 4. Outputs a mapping file for manual translation
 *
 * Usage: node scripts/extract-and-translate.js
 */

const fs = require('fs');
const path = require('path');

const CALC_DIRS = [
  'src/pages/automotive',
  'src/pages/property',
  'src/pages/islamic-finance',
  'src/pages/life',
  'src/pages/finance',
  'src/pages/income-tax'
];

const PROJECT_ROOT = '/tmp/cc-agent/63772935/project';

// Regex patterns to find hardcoded strings
const STRING_PATTERNS = [
  // Strings in JSX text content
  />{([^<{}]+)}</g,
  // Strings in attributes
  /(?:placeholder|title|label|description)=["']([^"']+)["']/g,
  // String literals assigned to variables
  /(?:const|let)\s+\w+\s*=\s*["']([^"']+)["']/g
];

function extractStringsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const strings = new Set();

  STRING_PATTERNS.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const str = match[1].trim();
      // Filter out: empty strings, variables, numbers, single chars
      if (str.length > 3 && /[a-zA-Z]{3,}/.test(str) && !str.startsWith('{') && !str.match(/^[\d\s]+$/)) {
        strings.add(str);
      }
    }
  });

  return Array.from(strings);
}

function generateKey(str, calculatorName) {
  // Generate a key from the string
  const words = str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .slice(0, 4)
    .join('_');
  return `${calculatorName}.${words}`;
}

function processCalculators() {
  const allStrings = {};

  CALC_DIRS.forEach(dir => {
    const fullDir = path.join(PROJECT_ROOT, dir);
    if (!fs.existsSync(fullDir)) return;

    const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.tsx'));

    files.forEach(file => {
      const filePath = path.join(fullDir, file);
      const calcName = file.replace('.tsx', '').replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');

      console.log(`Processing: ${file}`);
      const strings = extractStringsFromFile(filePath);

      allStrings[calcName] = {};
      strings.forEach(str => {
        const key = generateKey(str, calcName);
        allStrings[calcName][key] = {
          en: str,
          ms: `[TO_TRANSLATE] ${str}`
        };
      });
    });
  });

  // Save to JSON file
  const outputPath = path.join(PROJECT_ROOT, 'translation-extraction.json');
  fs.writeFileSync(outputPath, JSON.stringify(allStrings, null, 2));

  console.log(`\nExtracted strings saved to: ${outputPath}`);
  console.log(`Total calculators processed: ${Object.keys(allStrings).length}`);
  console.log(`Total unique strings: ${Object.values(allStrings).reduce((sum, calc) => sum + Object.keys(calc).length, 0)}`);
}

processCalculators();
