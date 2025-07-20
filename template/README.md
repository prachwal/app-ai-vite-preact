# My Preact App

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

```bash
npm install
npm run dev
```

## Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run dev:host` - Start development server accessible from network
- `npm run preview` - Preview production build

### Building
- `npm run build` - Build for production
- `npm run build:check` - Type check and build
- `npm run build:analyze` - Build and analyze bundle size

### Testing
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

### Documentation
- `npm run docs:api` - Generate API documentation
- `npm run docs:dev` - Generate docs and open in browser
- `npm run docs:all` - Generate all documentation

### Storybook
- `npm run storybook` - Start Storybook development server
- `npm run storybook:build` - Build Storybook for production
- `npm run storybook:serve` - Serve built Storybook

### Utilities
- `npm run type-check` - Check TypeScript types
- `npm run lint` - Lint and type check
- `npm run clean` - Clean build artifacts

## Project Structure

```
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
```

## Coding Guidelines

This project follows strict separation of concerns:

- **Components (.tsx)**: Only presentation and user interactions
- **Services (.ts)**: Business logic and API calls
- **Hooks (.ts)**: Custom hooks for state management
- **Utils (.ts)**: Pure utility functions

## Testing

Every `.ts` file must have a corresponding `.test.ts` file with 100% coverage.
Components are tested using `@testing-library/preact`.

## Documentation

- **API Documentation**: Auto-generated with TypeDoc at `/docs/api/`
- **Storybook**: Component documentation and playground
- **Test Coverage**: Available at `/docs/coverage/`

## Learn More

- [Preact Documentation](https://preactjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/)
- [TypeDoc](https://typedoc.org/)
