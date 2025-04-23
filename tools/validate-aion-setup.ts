#!/usr/bin/env ts-node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import chalk from "chalk";

// ✔️ Helper: Load tsconfig paths
const tsconfigPath = path.resolve("tsconfig.json");

if (!fs.existsSync(tsconfigPath)) {
  console.error(chalk.red("❌ tsconfig.json not found."));
  process.exit(1);
}

const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf-8"));
const baseUrl = tsconfig.compilerOptions?.baseUrl || "src";
const paths = tsconfig.compilerOptions?.paths || {};

console.log(chalk.cyan("\n🔍 Έλεγχος alias paths από tsconfig...\n"));

// ✔️ Print all aliases
Object.entries(paths).forEach(([alias, target]) => {
  console.log(chalk.green(`✔ Alias "${alias}" → ${target}`));
});

// ✔️ Test if aliases resolve correctly via tsconfig
console.log(chalk.cyan("\n🧪 Τεστ TypeScript compiler για alias imports..."));
try {
  execSync("tsc --noEmit", { stdio: "inherit" });
  console.log(chalk.green("\n✅ TypeScript compiled successfully.\n"));
} catch (err) {
  console.error(chalk.red("\n❌ TypeScript compile error (alias ή imports)."));
}

// ✔️ Scan for invalid import paths
console.log(chalk.cyan("\n🔎 Σκανάρισμα αρχείων για invalid imports...\n"));

const walk = (dir: string, filelist: string[] = []) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, filelist);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      filelist.push(filepath);
    }
  });
  return filelist;
};

const allFiles = walk(path.resolve("src"));

const brokenImports: string[] = [];

allFiles.forEach((file) => {
  const content = fs.readFileSync(file, "utf-8");
  const importRegex = /from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content))) {
    const importPath = match[1];
    if (importPath.startsWith("@")) {
      const rootAlias = importPath.split("/")[0];
      const aliasTarget = paths[`${rootAlias}/*`] || paths[rootAlias];
      if (!aliasTarget) {
        brokenImports.push(`${file}: ${importPath}`);
      }
    }
  }
});

if (brokenImports.length > 0) {
  console.log(chalk.red(`\n❌ Βρέθηκαν ${brokenImports.length} προβληματικά imports:`));
  brokenImports.forEach((line) => console.log("   -", line));
} else {
  console.log(chalk.green("✅ Όλα τα alias φαίνονται εντάξει!"));
}