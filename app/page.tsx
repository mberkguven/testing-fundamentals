"use client";

import { useEffect, useState } from "react";

import { useTodos } from "@/hooks/useTodos";
import TodoFilter from "@/components/TodoFilter";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const {
    filteredTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    filter,
    setFilter,
    activeCount,
  } = useTodos();

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">Todos</h1>
          <TodoForm onAdd={addTodo} />
          <div className="flex items-center justify-between">
            <TodoFilter current={filter} onChange={setFilter} />
            <span
              aria-label="todo-counter"
              className="text-sm text-gray-600"
              suppressHydrationWarning
            >
              {activeCount} active
            </span>
          </div>
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
}
