"use client";

import React, { useState } from "react";

interface Props {
  onAdd: (text: string) => void;
}

export function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim().length === 0) return;
    onAdd(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        aria-label="todo-input"
        className="flex-1 px-3 py-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a todo"
      />
      <button
        aria-label="add-todo"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
