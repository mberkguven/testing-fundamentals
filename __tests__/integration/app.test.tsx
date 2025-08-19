import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import Page from "@/app/page";

describe("Integration: Todos flows", () => {
  beforeEach(() => localStorage.clear());

  it("adds a todo and updates the counter", () => {
    render(<Page />);
    const input = screen.getByLabelText("todo-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Task 1" } });
    fireEvent.click(screen.getByLabelText("add-todo"));

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByLabelText("todo-counter")).toHaveTextContent("1 active");
  });

  it("filters active and completed correctly", () => {
    render(<Page />);
    const input = screen.getByLabelText("todo-input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Task A" } });
    fireEvent.click(screen.getByLabelText("add-todo"));
    fireEvent.change(input, { target: { value: "Task B" } });
    fireEvent.click(screen.getByLabelText("add-todo"));

    // Complete Task B
    fireEvent.click(screen.getByLabelText("toggle-Task B"));

    // Active filter shows only Task A
    fireEvent.click(screen.getByLabelText("filter-active"));
    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.queryByText("Task B")).toBeNull();

    // Completed filter shows only Task B
    fireEvent.click(screen.getByLabelText("filter-completed"));
    expect(screen.getByText("Task B")).toBeInTheDocument();
    expect(screen.queryByText("Task A")).toBeNull();

    // All shows both
    fireEvent.click(screen.getByLabelText("filter-all"));
    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.getByText("Task B")).toBeInTheDocument();
  });

  it("toggles completion and deletes items updating UI", () => {
    render(<Page />);
    const input = screen.getByLabelText("todo-input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Task X" } });
    fireEvent.click(screen.getByLabelText("add-todo"));

    // Toggle to completed → active count should be 0
    fireEvent.click(screen.getByLabelText("toggle-Task X"));
    expect(screen.getByLabelText("todo-counter")).toHaveTextContent("0 active");

    // Delete and expect it gone
    fireEvent.click(screen.getByLabelText("delete-Task X"));
    expect(screen.queryByText("Task X")).toBeNull();
  });

  // Test: Should persist todos across reload
  it("persists todos across reload (via localStorage)", () => {
    const { unmount } = render(<Page />);
    const input = screen.getByLabelText("todo-input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Persistent Task" } });
    fireEvent.click(screen.getByLabelText("add-todo"));

    // Complete the task to test state persistence
    fireEvent.click(screen.getByLabelText("toggle-Persistent Task"));
    expect(screen.getByLabelText("todo-counter")).toHaveTextContent("0 active");

    unmount();
    cleanup();
    render(<Page />);

    // Verify localStorage contains the task
    expect(window.localStorage.getItem("todos")).toContain("Persistent Task");

    // Verify both presence and completed state persisted
    expect(screen.getByText("Persistent Task")).toBeInTheDocument();
    expect(screen.getByLabelText("todo-counter")).toHaveTextContent("0 active");
  });

  // Uncomment the test below to see a failing expectation for the counter.
  // It wrongly expects the counter to stay at 1 after toggling completed.
  // it("keeps counter at 1 after toggle (this will fail)", () => {
  //   render(<Page />);
  //   const input = screen.getByLabelText("todo-input") as HTMLInputElement;
  //   fireEvent.change(input, { target: { value: "Task Y" } });
  //   fireEvent.click(screen.getByLabelText("add-todo"));
  //   fireEvent.click(screen.getByLabelText("toggle-Task Y"));
  //   expect(screen.getByLabelText("todo-counter")).toHaveTextContent("1 active");
  // });
});
