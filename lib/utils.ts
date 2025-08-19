import { Filter, Todo } from "@/types";

export function filterTodos(todos: Todo[], filter: Filter): Todo[] {
  if (filter === "active") return todos.filter((t) => !t.completed);
  if (filter === "completed") return todos.filter((t) => t.completed);
  return todos;
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}
