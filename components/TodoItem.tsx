"use client";

import { Todo } from "@/types";
import React from "react";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-center gap-3 p-2 border-b">
      <input
        aria-label={`toggle-${todo.text}`}
        type="checkbox"
        className="h-4 w-4"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={todo.completed ? "line-through text-gray-500" : ""}>
        {todo.text}
      </span>
      <button
        aria-label={`delete-${todo.text}`}
        className="ml-auto text-sm text-red-600 hover:underline"
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
