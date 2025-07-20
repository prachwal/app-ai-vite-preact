# create-preact-storybook-template

A modern Preact application template with TypeScript, Tailwind CSS, Storybook, comprehensive testing, and documentation setup.

## Features

- 🚀 **Preact** - Fast 3kB alternative to React with modern hooks
- 📝 **TypeScript** - Full type safety and excellent developer experience  
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- 📚 **Storybook** - Component development environment and documentation
- 🧪 **Vitest** - Lightning-fast unit testing with coverage reports
- 📖 **TypeDoc** - Automatic API documentation generation from JSDoc
- ⚡ **Vite** - Next-generation build tool with HMR
- 🏗️ **Modern Architecture** - Strict separation of presentation and business logic

## Quick Start

Create a new Preact app with one command:

```bash
npm create preact-storybook-template my-app
cd my-app
npm install
npm run dev
```

Or with yarn:

```bash
yarn create preact-storybook-template my-app
cd my-app
yarn install
yarn dev
```

Or with pnpm:

```bash
pnpm create preact-storybook-template my-app
cd my-app
pnpm install
pnpm dev
```

## What's Included

### 📦 Dependencies
- **Preact** - Modern React alternative with hooks support
- **TypeScript** - Type safety and IntelliSense
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server

### 🧪 Development & Testing
- **Vitest** - Unit testing framework
- **@testing-library/preact** - Testing utilities
- **@vitest/coverage-v8** - Coverage reporting
- **@vitest/ui** - Testing interface

### 📚 Documentation & Stories
- **Storybook** - Component documentation and development
- **TypeDoc** - API documentation generation
- **@microsoft/tsdoc** - TSDoc support

### 🏗️ Architecture Guidelines
- **Strict separation of concerns** - UI components vs business logic
- **Component-driven development** - Build and test components in isolation
- **Type-safe** - Comprehensive TypeScript coverage
- **Test-driven** - 100% test coverage requirement
- **Documentation-first** - Storybook stories for every component

## Available Scripts

Your new project will include these npm scripts:

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report

# Documentation
npm run storybook    # Start Storybook dev server
npm run docs:api     # Generate TypeDoc documentation
npm run docs:all     # Generate all documentation

# Code Quality
npm run type-check   # TypeScript type checking
npm run lint         # Lint and type check
npm run clean        # Clean build artifacts
```

## Project Structure

```
my-app/
├── src/
│   ├── components/     # UI components (.tsx) - presentation only
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── index.ts
│   ├── hooks/         # Custom hooks (.ts) - state logic
│   ├── services/      # Business logic (.ts) - API calls
│   ├── utils/         # Pure utility functions (.ts)
│   ├── stories/       # Storybook stories (.stories.tsx)
│   ├── test/          # Test files (.test.ts/.test.tsx)
│   ├── assets/        # Static assets
│   ├── app.tsx        # Main app component
│   └── main.tsx       # Application entry point
├── public/            # Static public files
├── docs/              # Generated documentation
└── package.json       # Project configuration
```

## Architecture Principles

This template enforces clean architecture with strict separation:

### 🎨 Presentation Layer (Components)
- `.tsx` files in `src/components/`
- **Only** UI rendering and user interactions
- Import business logic from services/hooks
- Comprehensive Storybook stories

### 🧠 Business Logic Layer
- `.ts` files in `src/services/`, `src/hooks/`, `src/utils/`
- API calls, data transformations, state management
- Pure functions and custom hooks
- 100% test coverage required

### 📝 Documentation Layer
- **Storybook** - Component playground and documentation
- **TypeDoc** - API documentation from JSDoc comments
- **Test Coverage** - Detailed coverage reports

## Best Practices

### ✅ Do's
- Keep components small and focused
- Write comprehensive tests for all business logic
- Document all public APIs with JSDoc
- Create Storybook stories for all components
- Use TypeScript strictly (no `any` types)
- Follow the separation of concerns principle

### ❌ Don'ts
- Put business logic directly in components
- Skip writing tests for `.ts` files
- Hardcode API endpoints or configuration
- Ignore TypeScript warnings
- Create components without stories

## Examples

### Component with Business Logic Separation

```tsx
// ❌ Bad: Logic mixed with presentation
export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]);
  
  return <div>{user?.name}</div>;
}

// ✅ Good: Separated concerns
// services/userService.ts
export const fetchUser = (id: string) => fetch(`/api/users/${id}`).then(r => r.json());

// hooks/useUser.ts  
export const useUser = (id: string) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser(id).then(setUser);
  }, [id]);
  return user;
};

// components/UserProfile.tsx
export function UserProfile({ userId }: { userId: string }) {
  const user = useUser(userId);
  return <div>{user?.name}</div>;
}
```

## Contributing

This template is designed to be a starting point. Feel free to:

- Add more components and utilities
- Extend the testing setup
- Customize the build configuration
- Add more Storybook addons

## Learn More

- [Preact Documentation](https://preactjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/)
- [TypeDoc](https://typedoc.org/)

## License

MIT