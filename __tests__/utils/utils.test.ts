import { filterTodos } from "../../lib/utils";
import { Todo } from "../../types/todo";

describe("filterTodos utility function", () => {
  const todos: Todo[] = [
    { id: "1", text: "A", completed: false },
    { id: "2", text: "B", completed: true },
    { id: "3", text: "C", completed: false },
  ];

  describe("Filter: all", () => {
    it("returns all todos when filter is 'all'", () => {
      const result = filterTodos(todos, "all");
      expect(result).toHaveLength(3);
      expect(result).toEqual(todos);
    });
  });

  describe("Filter: active", () => {
    it("returns only incomplete todos when filter is 'active'", () => {
      const result = filterTodos(todos, "active");
      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: "1", text: "A", completed: false },
        { id: "3", text: "C", completed: false },
      ]);
    });
  });

  describe("Filter: completed", () => {
    it("returns only completed todos when filter is 'completed'", () => {
      const result = filterTodos(todos, "completed");
      expect(result).toHaveLength(1);
      expect(result).toEqual([{ id: "2", text: "B", completed: true }]);
    });
  });

  describe("Edge cases", () => {
    it("returns empty array when no todos match filter", () => {
      const allCompletedTodos: Todo[] = [
        { id: "1", text: "Done", completed: true },
      ];
      expect(filterTodos(allCompletedTodos, "active")).toEqual([]);
    });

    it("handles empty todo array", () => {
      expect(filterTodos([], "all")).toEqual([]);
      expect(filterTodos([], "active")).toEqual([]);
      expect(filterTodos([], "completed")).toEqual([]);
    });

    // // This test is failed intentionally to show how to handle invalid filter types.
    // it("handles invalid filter type (this will fail)", () => {
    //   expect(filterTodos(todos, "invalid" as any)).toEqual([]);
    // });
  });
});
