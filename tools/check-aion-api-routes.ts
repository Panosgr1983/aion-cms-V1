import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const tsconfigPath = path.resolve(process.cwd(), 'tsconfig.json');

function runTSCheck() {
  if (!fs.existsSync(tsconfigPath)) {
    console.error('❌ tsconfig.json not found!');
    process.exit(1);
  }

  const command = `tsc --noEmit --project ${tsconfigPath}`;
  console.log('🧪 Checking TypeScript project for syntax/type errors...\n');

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ TypeScript errors found:\n');
      console.log(stdout || stderr);
    } else {
      console.log('✅ No syntax or type errors found. All good!');
    }
  });
}

runTSCheck();