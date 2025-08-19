// Test suite for the TodoItem component
import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItem } from "@/components/TodoItem";

// Mock todo data and handler functions
const mockTodo = { id: "1", text: "Test todo", completed: false };
const mockOnToggle = jest.fn();
const mockOnDelete = jest.fn();

// Reset mock function calls before each test to ensure isolation
beforeEach(() => {
  jest.clearAllMocks();
});

// Test: TodoItem should render the todo text
it("renders todo text correctly", () => {
  render(
    <TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
  );
  expect(screen.getByText("Test todo")).toBeInTheDocument();
});

// Test: TodoItem should call onToggle when the checkbox is clicked
it("calls onToggle when checkbox is clicked", () => {
  render(
    <TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
  );
  fireEvent.click(screen.getByLabelText("toggle-Test todo"));
  expect(mockOnToggle).toHaveBeenCalledWith("1");
  expect(mockOnToggle).toHaveBeenCalledTimes(1);
});

// Test: TodoItem should call onDelete when the delete button is clicked
it("calls onDelete when delete button is clicked", () => {
  render(
    <TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />
  );
  fireEvent.click(screen.getByLabelText("delete-Test todo"));
  expect(mockOnDelete).toHaveBeenCalledWith("1");
});
