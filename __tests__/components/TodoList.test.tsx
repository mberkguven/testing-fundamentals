// Import render and screen utilities from React Testing Library
import { render, screen } from "@testing-library/react";
// Import the TodoList component to be tested
import { TodoList } from "@/components/TodoList";

// Sample todos data for testing
const todos = [
  { id: "1", text: "A", completed: false },
  { id: "2", text: "B", completed: true },
];

// Test: TodoList should show a message when there are no todos
it("renders empty state", () => {
  // Render TodoList with an empty todos array
  render(<TodoList todos={[]} onToggle={() => {}} onDelete={() => {}} />);
  // Assert that the 'No todos' message is displayed
  expect(screen.getByText("No todos")).toBeInTheDocument();
});

// Test: TodoList should render todo items when provided
it("renders items", () => {
  // Render TodoList with sample todos
  render(<TodoList todos={todos} onToggle={() => {}} onDelete={() => {}} />);
  // Assert that both todo items are displayed
  expect(screen.getByText("A")).toBeInTheDocument();
  expect(screen.getByText("B")).toBeInTheDocument();
});
