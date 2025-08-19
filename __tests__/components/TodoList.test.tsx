// Test suite for the TodoList component
import { render, screen } from "@testing-library/react";
import { TodoList } from "@/components/TodoList";

const todos = [
  { id: "1", text: "A", completed: false },
  { id: "2", text: "B", completed: true },
];

// Test: Should show a message when there are no todos
it("shows empty state when todos is empty", () => {
  render(<TodoList todos={[]} onToggle={() => {}} onDelete={() => {}} />);
  expect(screen.getByText("No todos")).toBeInTheDocument();
});

// Test: Should render todo item A
it("renders todo item A", () => {
  render(<TodoList todos={todos} onToggle={() => {}} onDelete={() => {}} />);
  expect(screen.getByText("A")).toBeInTheDocument();
});

// Test: Should render todo item B
it("renders todo item B", () => {
  render(<TodoList todos={todos} onToggle={() => {}} onDelete={() => {}} />);
  expect(screen.getByText("B")).toBeInTheDocument();
});

// Test: Renders correct number of items
it("renders the correct number of items", () => {
  render(<TodoList todos={todos} onToggle={() => {}} onDelete={() => {}} />);
  // Two list items should be present
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
});

// // Uncomment the test below to see what happens when you expect a todo item that doesn't exist.
// // This will show a failing test and help you understand how test data affects results.
// it("renders todo item A", () => {
//   // This test will fail because the todos array is empty, so "A" cannot be found.
//   render(<TodoList todos={[]} onToggle={() => {}} onDelete={() => {}} />);
//   expect(screen.getByText("A")).toBeInTheDocument();
// });
