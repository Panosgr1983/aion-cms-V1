import fs from 'fs';
import path from 'path';

const BASE_DIR = path.join(process.cwd(), 'tools');

const FILES = [
  'check-aion-api-routes.ts',
  'api-fix-helpers.ts',
  'api-doc-generator.ts',
  'zod-checker.ts',
  'cli.ts',
  'installer.ts',
  'ci-template/check-api.yml',
];

function ensureDirSync(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created: ${dirPath}`);
  }
}

function createDummyFile(filePath: string, content = '// TODO: implement\n') {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`📄 Created: ${filePath}`);
  }
}

function setupStructure() {
  console.log('🚀 Setting up AION tools folder structure...');

  FILES.forEach((file) => {
    const fullPath = path.join(BASE_DIR, file);
    const folder = path.dirname(fullPath);
    ensureDirSync(folder);
    createDummyFile(fullPath);
  });

  console.log('✅ All files and folders created!');
}

setupStructure();
