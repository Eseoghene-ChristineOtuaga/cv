"use client";

import { FaTrash } from "react-icons/fa6";

export default function DeleteButton({ action, name }: { action: () => Promise<void>; name: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete "${name}"? This can't be undone.`)) e.preventDefault();
      }}
    >
      <button type="submit" className="icon-btn danger" aria-label={`Delete ${name}`}>
        <FaTrash aria-hidden="true" />
      </button>
    </form>
  );
}
