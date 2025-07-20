#!/usr/bin/env node

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync, readdirSync, statSync, unlinkSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectName = process.argv[2] || 'my-preact-app';

console.log(`🚀 Creating a new Preact app: ${projectName}`);

// Create project directory
if (existsSync(projectName)) {
  console.error(`❌ Directory ${projectName} already exists!`);
  process.exit(1);
}

mkdirSync(projectName, { recursive: true });

// Template directory
const templateDir = join(__dirname, '..', 'template');

// Copy template files recursively
function copyDir(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  
  const files = readdirSync(src);
  
  for (const file of files) {
    const srcPath = join(src, file);
    const destPath = join(dest, file);
    
    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // Copy all template files
  copyDir(templateDir, projectName);
  
  // Update package.json with project name
  const packageJsonPath = join(projectName, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  packageJson.name = projectName;
  packageJson.private = true;
  delete packageJson.bin;
  delete packageJson.files;
  delete packageJson.description;
  delete packageJson.keywords;
  delete packageJson.author;
  delete packageJson.license;
  delete packageJson.repository;
  delete packageJson.homepage;
  delete packageJson.bugs;
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  // Rename gitignore to .gitignore (npm ignores .gitignore files during publish)
  const gitignorePath = join(projectName, 'gitignore');
  const dotGitignorePath = join(projectName, '.gitignore');
  if (existsSync(gitignorePath)) {
    copyFileSync(gitignorePath, dotGitignorePath);
    unlinkSync(gitignorePath);
  }
  
  console.log(`✅ Created ${projectName}`);
  console.log('\n📦 Next steps:');
  console.log(`  cd ${projectName}`);
  console.log('  npm install');
  console.log('  npm run dev');
  console.log('\n🚀 Available commands:');
  console.log('  npm run dev          - Start development server');
  console.log('  npm run build        - Build for production');
  console.log('  npm run test         - Run tests');
  console.log('  npm run storybook    - Start Storybook');
  console.log('  npm run docs:api     - Generate API documentation');
  console.log('\n📚 Learn more:');
  console.log('  - Preact: https://preactjs.com/');
  console.log('  - Storybook: https://storybook.js.org/');
  console.log('  - Tailwind CSS: https://tailwindcss.com/');
  
} catch (error) {
  console.error('❌ Error creating project:', error.message);
  process.exit(1);
}
