# Testing Fundamentals Showcase

A minimal Next.js demo focused on teaching fundamental testing concepts for modern React applications. This project is designed for educational purposes, providing clear examples of unit, integration, and component testing using Jest and React Testing Library.

## Quick Start

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

To run all tests:

```bash
npm test
```

Test files are organized in the `__tests__` directory by type and feature.

## Project Structure

```
/testing-fundamentals
  /app
    layout.tsx, page.tsx, globals.css
  /components
    TodoFilter.tsx, TodoForm.tsx, TodoItem.tsx, TodoList.tsx
  /hooks
    useTodos.ts
  /lib
    utils.ts
  /types
    index.ts, todo.ts
  /__tests__
    /components
      TodoFilter.test.tsx, TodoForm.test.tsx, TodoItem.test.tsx, TodoList.test.tsx
    /hooks
      useTodos.test.tsx
    /integration
      app.test.tsx
    /utils
      utils.test.ts
  jest.config.js, jest.setup.ts, tsconfig.json, package.json, README.md
```

## Key Features

- **Component, hook, and integration tests** in dedicated folders
- **Jest** for test running and assertions
- **React Testing Library** for UI/component testing
- **TypeScript** for type safety and clarity
- **Husky** integration to automatically run tests before committing, prevents committing if tests fail.

## Architecture & Approach

- **Unit tests**: Validate individual functions and hooks.
- **Component tests**: Ensure UI components render and behave correctly.
- **Integration tests**: Test interactions between components and app flows.
- **Educational comments**: Many test files include comments explaining the purpose and approach. I also added example failed tests.

---

## Types of Tests: Unit vs Component vs Integration

Understanding the scope of different test types is key to building a reliable test strategy. Note that in real-world projects, tests are often separated as unit, integration, and e2e tests. Component tests can also be counted as unit tests.

| Test Type            | Scope                                                              | Example in This Project                                                                                        |
| -------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| **Unit Test**        | Tests small units like func/hooks                                  | Testing `useTodos` hook logic (e.g., toggling a todo’s `completed` state).                                     |
| **Component Test**   | Tests component.                                                   | Testing `<TodoItem />` renders correctly and fires onToggle.                                                   |
| **Integration Test** | Tests how multiple units (components, hooks, utils) work together. | Rendering the `<Page />` and verifying add → toggle → delete flow, including counter and localStorage updates. |

**Rule of thumb**:

- Use **unit tests** for small logic. Only contains functions/hooks.
- Use **component tests** for single components.
- Use **integration tests** for key flows between components.

## Important Notes

This project is a showcase/demo. The structure is intentionally simple and clear for learning purposes. In real-world projects, testing strategies may vary depending on complexity and requirements. For example, production-level projects often colocate tests with their components instead of a central `__tests__` folder.
