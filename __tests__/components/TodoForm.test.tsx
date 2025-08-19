// Test suite for the TodoForm component
import { fireEvent, render, screen } from "@testing-library/react";
import { TodoForm } from "@/components/TodoForm";

// Reset mock function calls before each test to ensure isolation
let onAdd: jest.Mock;
beforeEach(() => {
  onAdd = jest.fn();
});

// Test: Should call onAdd with input value when non-empty input is submitted
it("calls onAdd with input value and clears input", () => {
  render(<TodoForm onAdd={onAdd} />);
  const input = screen.getByLabelText("todo-input") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "New Task" } });
  fireEvent.click(screen.getByLabelText("add-todo"));
  expect(onAdd).toHaveBeenCalledWith("New Task");
  expect(input.value).toBe("");
});

// Test: Should not call onAdd when input is empty
it("does not call onAdd when input is empty", () => {
  render(<TodoForm onAdd={onAdd} />);
  fireEvent.click(screen.getByLabelText("add-todo"));
  expect(onAdd).not.toHaveBeenCalled();
});

// // Uncomment the test below to see a failing example involving trimming.
// // It expects the raw spaced string to be submitted, but the form trims input.
// it("submits raw spaced text without trimming (this will fail)", () => {
//   render(<TodoForm onAdd={onAdd} />);
//   const input = screen.getByLabelText("todo-input") as HTMLInputElement;
//   fireEvent.change(input, { target: { value: "  Spaced  " } });
//   fireEvent.click(screen.getByLabelText("add-todo"));
//   expect(onAdd).toHaveBeenCalledWith("  Spaced  ");
// });
