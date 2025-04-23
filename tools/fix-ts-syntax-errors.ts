// tools/fix-ts-syntax-errors.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Για να δουλέψει το __dirname σε ES Modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 💡 Patterns προς διόρθωση
const fixes: { pattern: RegExp; replacement: string }[] = [
  { pattern: /\bif\s+([a-zA-Z0-9_.]+)\s*\{/g, replacement: "if ($1) {" },
  { pattern: /\bcatch\s+([a-zA-Z0-9_]+)\s*\{/g, replacement: "catch ($1) {" },
  { pattern: /\.json\s*\{/g, replacement: ".json({" },
  { pattern: /\.findIndex([a-zA-Z])\s*=>/g, replacement: ".findIndex(($1) =>" },
  { pattern: /\.find([a-zA-Z])\s*=>/g, replacement: ".find(($1) =>" },
  { pattern: /console\.error'([^']+)',\s*([a-zA-Z0-9_]+)/g, replacement: "console.error('$1', $2);" },
  { pattern: /export\s+async\s+function\s+([A-Z]+)\s*\{/g, replacement: "export async function $1() {" },
  { pattern: /(\w+):\s*([a-zA-Z0-9_<>]+)\s*=>\s*([a-zA-Z]+)/g, replacement: "$1: ($2) => $3" },
];

// 📁 Αναδρομική σάρωση και διόρθωση
function scanAndFix(dir: string) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanAndFix(fullPath);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      let content = fs.readFileSync(fullPath, "utf-8");
      let original = content;

      fixes.forEach(({ pattern, replacement }) => {
        content = content.replace(pattern, replacement);
      });

      if (content !== original) {
        fs.writeFileSync(fullPath, content, "utf-8");
        console.log(`✅ Fixed: ${fullPath}`);
      }
    }
  }
}

// 🚀 Εκκίνηση
console.log("🛠  Εφαρμόζουμε διορθώσεις syntax σε src/ ...");
scanAndFix(path.resolve(__dirname, "../src"));
console.log("🎉 Ολοκληρώθηκε!");