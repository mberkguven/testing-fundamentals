"use client";

import React from "react";
import { Filter } from "@/types";

interface Props {
  current: Filter;
  onChange: (f: Filter) => void;
}

const tabs: Filter[] = ["all", "active", "completed"];

export function TodoFilter({ current, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {tabs.map((t) => (
        <button
          key={t}
          aria-label={`filter-${t}`}
          className={
            "px-3 py-1 rounded border " +
            (current === t
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700")
          }
          onClick={() => onChange(t)}
        >
          {t[0].toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
