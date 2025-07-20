#!/usr/bin/env node

/**
 * Build script for template folder
 * Copies and prepares files for the npm template
 */

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { 
  readFileSync, 
  writeFileSync, 
  copyFileSync, 
  existsSync, 
  mkdirSync, 
  readdirSync, 
  statSync,
  rmSync 
} from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, '..');
const TEMPLATE_DIR = join(ROOT_DIR, 'template');

// Files and directories to exclude from template
const EXCLUDE_PATTERNS = [
  'node_modules',
  'dist',
  'storybook-static',
  'public/docs',
  '.git',
  '.github',
  'template',
  'bin',
  'debug-test',
  'test-*',
  '.npmignore',
  'package-lock.json',
  'coverage'
];

// Files that need special processing
const SPECIAL_FILES = {
  '.gitignore': 'gitignore', // rename to avoid npm ignoring it
  'package.json': 'package.json' // needs content modification
};

/**
 * Check if file/dir should be excluded
 */
function shouldExclude(filePath, fileName) {
  return EXCLUDE_PATTERNS.some(pattern => {
    if (pattern.includes('*')) {
      return fileName.match(new RegExp(pattern.replace('*', '.*')));
    }
    return fileName === pattern || filePath.includes(pattern);
  });
}

/**
 * Copy directory recursively with exclusions
 */
function copyDir(src, dest, basePath = '') {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  const files = readdirSync(src);

  for (const file of files) {
    const srcPath = join(src, file);
    const relativePath = join(basePath, file);
    
    // Special handling for .gitignore - copy but rename to avoid npm ignoring it
    if (file === '.gitignore') {
      console.log(`  📄 Copying file: ${relativePath} -> gitignore`);
      const destPath = join(dest, 'gitignore');
      copyFileSync(srcPath, destPath);
      continue;
    }
    
    // Skip excluded files
    if (shouldExclude(relativePath, file)) {
      console.log(`  ⏭️  Skipping: ${relativePath}`);
      continue;
    }

    const destPath = join(dest, SPECIAL_FILES[file] || file);

    if (statSync(srcPath).isDirectory()) {
      console.log(`  📁 Copying dir: ${relativePath}/`);
      copyDir(srcPath, destPath, relativePath);
    } else {
      console.log(`  📄 Copying file: ${relativePath}`);
      
      if (file === 'package.json') {
        // Special handling for package.json - remove template-specific fields
        const packageContent = JSON.parse(readFileSync(srcPath, 'utf8'));
        
        // Reset to template defaults
        packageContent.name = 'my-preact-app';
        packageContent.version = '0.1.0';
        packageContent.private = true;
        
        // Remove template-specific fields
        delete packageContent.bin;
        delete packageContent.files;
        delete packageContent.description;
        delete packageContent.keywords;
        delete packageContent.author;
        delete packageContent.license;
        delete packageContent.repository;
        delete packageContent.homepage;
        delete packageContent.bugs;
        
        writeFileSync(destPath, JSON.stringify(packageContent, null, 2));
      } else {
        copyFileSync(srcPath, destPath);
      }
    }
  }
}

/**
 * Main build function
 */
function buildTemplate() {
  console.log('🏗️  Building template folder...\n');

  // Clean existing template
  if (existsSync(TEMPLATE_DIR)) {
    console.log('🧹 Cleaning existing template...');
    rmSync(TEMPLATE_DIR, { recursive: true, force: true });
  }

  // Create new template
  console.log('📦 Creating template from current project...\n');
  copyDir(ROOT_DIR, TEMPLATE_DIR);

  // Create template README
  const templateReadme = `# My Preact App

A modern Preact application with TypeScript, Tailwind CSS, Storybook, and comprehensive testing setup.

## Features

- 🚀 **Preact** - Fast 3kB alternative to React
- 📝 **TypeScript** - Type safety and better developer experience
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📚 **Storybook** - Component development and documentation
- 🧪 **Vitest** - Fast unit testing with coverage reports
- 📖 **TypeDoc** - Automatic API documentation generation
- ⚡ **Vite** - Fast build tool and development server

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## Available Scripts

### Development
- \`npm run dev\` - Start development server
- \`npm run dev:host\` - Start development server accessible from network
- \`npm run preview\` - Preview production build

### Building
- \`npm run build\` - Build for production
- \`npm run build:check\` - Type check and build
- \`npm run build:analyze\` - Build and analyze bundle size

### Testing
- \`npm run test\` - Run tests in watch mode
- \`npm run test:run\` - Run tests once
- \`npm run test:ui\` - Run tests with UI
- \`npm run test:coverage\` - Run tests with coverage report

### Documentation
- \`npm run docs:api\` - Generate API documentation
- \`npm run docs:dev\` - Generate docs and open in browser
- \`npm run docs:all\` - Generate all documentation

### Storybook
- \`npm run storybook\` - Start Storybook development server
- \`npm run storybook:build\` - Build Storybook for production
- \`npm run storybook:serve\` - Serve built Storybook

### Utilities
- \`npm run type-check\` - Check TypeScript types
- \`npm run lint\` - Lint and type check
- \`npm run clean\` - Clean build artifacts

## Project Structure

\`\`\`
src/
├── components/     # UI components (.tsx) - presentation only
│   ├── Button.tsx
│   ├── Card.tsx
│   └── index.ts
├── hooks/         # Custom hooks (.ts) - state logic
├── services/      # Business logic (.ts) - API calls
├── utils/         # Pure utility functions (.ts)
├── stories/       # Storybook stories (.stories.tsx)
├── test/          # Test files (.test.ts/.test.tsx)
├── assets/        # Static assets
├── app.tsx        # Main app component
└── main.tsx       # Application entry point
\`\`\`

## Coding Guidelines

This project follows strict separation of concerns:

- **Components (.tsx)**: Only presentation and user interactions
- **Services (.ts)**: Business logic and API calls
- **Hooks (.ts)**: Custom hooks for state management
- **Utils (.ts)**: Pure utility functions

## Testing

Every \`.ts\` file must have a corresponding \`.test.ts\` file with 100% coverage.
Components are tested using \`@testing-library/preact\`.

## Documentation

- **API Documentation**: Auto-generated with TypeDoc at \`/docs/api/\`
- **Storybook**: Component documentation and playground
- **Test Coverage**: Available at \`/docs/coverage/\`

## Learn More

- [Preact Documentation](https://preactjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/)
- [TypeDoc](https://typedoc.org/)
`;

  writeFileSync(join(TEMPLATE_DIR, 'README.md'), templateReadme);

  console.log('\n✅ Template build completed!');
  console.log(`📁 Template available at: ${TEMPLATE_DIR}`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    buildTemplate();
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

export { buildTemplate };
