// Test suite for the useTodos hook
import { act, renderHook } from "@testing-library/react";
import { useTodos } from "../../hooks/useTodos";

function clearStorage() {
  localStorage.clear();
}

describe("useTodos", () => {
  beforeEach(() => clearStorage());

  // Test: initializes with no todos and 0 active count
  it("initializes with empty state", () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toEqual([]);
    expect(result.current.activeCount).toBe(0);
  });

  // Test: adds a todo when non-empty, trims whitespace, and persists
  it("adds a trimmed todo and persists to localStorage", () => {
    const { result } = renderHook(() => useTodos());

    act(() => result.current.addTodo("  Task 1  "));
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe("Task 1");
    expect(result.current.activeCount).toBe(1);

    const stored = JSON.parse(localStorage.getItem("todos") || "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].text).toBe("Task 1");
    expect(stored[0].completed).toBe(false);
  });

  // Test: does not add when text is empty/whitespace only
  it("does not add empty/whitespace-only todos", () => {
    const { result } = renderHook(() => useTodos());

    act(() => result.current.addTodo("   "));
    expect(result.current.todos).toHaveLength(0);
  });

  // Test: toggles completion state and updates activeCount
  it("toggles completion state and updates activeCount", () => {
    const { result } = renderHook(() => useTodos());
    act(() => result.current.addTodo("Task 1"));
    const id = result.current.todos[0].id;

    act(() => result.current.toggleTodo(id));
    expect(result.current.todos[0].completed).toBe(true);
    expect(result.current.activeCount).toBe(0);

    act(() => result.current.toggleTodo(id));
    expect(result.current.todos[0].completed).toBe(false);
    expect(result.current.activeCount).toBe(1);
  });

  // Test: deletes a todo by id
  it("deletes a todo", () => {
    const { result } = renderHook(() => useTodos());
    act(() => result.current.addTodo("Task 1"));
    const id = result.current.todos[0].id;

    act(() => result.current.deleteTodo(id));
    expect(result.current.todos).toHaveLength(0);
    expect(result.current.activeCount).toBe(0);
  });

  // Test: filters todos and clears completed
  it("filters todos and clears completed", () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo("A");
      result.current.addTodo("B");
    });
    const idB = result.current.todos.find((t) => t.text === "B")!.id;
    act(() => result.current.toggleTodo(idB));

    act(() => result.current.setFilter("active"));
    expect(result.current.filteredTodos.map((t) => t.text)).toEqual(["A"]);

    act(() => result.current.setFilter("completed"));
    expect(result.current.filteredTodos.map((t) => t.text)).toEqual(["B"]);

    act(() => result.current.clearCompleted());
    expect(result.current.todos.map((t) => t.text)).toEqual(["A"]);
  });

  // // Uncomment the test below to see a failing example for filtering.
  // // It intentionally expects the wrong filtered result when current is 'completed'.
  // it("shows active todo when filter is completed (this will fail)", () => {
  //   const { result } = renderHook(() => useTodos());
  //   act(() => {
  //     result.current.addTodo("A");
  //     result.current.addTodo("B");
  //   });
  //   const idB = result.current.todos.find((t) => t.text === "B")!.id;
  //   act(() => result.current.toggleTodo(idB));
  //   act(() => result.current.setFilter("completed"));
  //   // To fix this test, we need to expect it to equal ["B"] instead of ["A"]
  //   expect(result.current.filteredTodos.map((t) => t.text)).toEqual(["A"]);
  // });
});
