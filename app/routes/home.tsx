import { useState } from "react";
import type { Route } from "./+types/home";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "To-do-list" },
    { name: "This is a to-do-list", content: "Welcome to my noob to-do-list!" },
  ];
}

export default function Home() {
  const [items, setItems] = useState<{ description: string; done: boolean }[]>(
    []
  );
  const [inputValue, setInputValue] = useState("");

  function addItem() {
    setItems((s) => [...s, { description: inputValue.trim(), done: false }]);
    setInputValue("");
  }

  function removeItem(index: number) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }

  function toggleDone(index: number) {
    const newItems = [...items];
    newItems[index].done = !newItems[index].done;
    setItems(newItems);
  }

  return (
    <div className="p-3">
      <h1 className="text-3xl font-bold text-center mb-3">TO-DO-LIST</h1>
      <div className="border border-gray rounded-lg w-[500px] max-w-full mx-auto overflow-hidden">
        <ol className="border-b border-gray flex flex-col gap-2 p-3">
          {items.map((item, i) => (
            <li key={`item-${i}`} className="flex justify-between">
              <span className={`flex-1 ${item.done ? "line-through" : ""}`}>
                {item.description}
              </span>
              <button onClick={() => removeItem(i)}>🗑️</button>
              <input
                className="ml-auto"
                type="checkbox"
                checked={item.done}
                onChange={() => toggleDone(i)}
              />
            </li>
          ))}
        </ol>
        <div className="flex">
          <input
            className="flex-1 p-2"
            type="text"
            placeholder="Mete aqui cenas..."
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
          <button className="bg-black text-white px-4" onClick={addItem}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
