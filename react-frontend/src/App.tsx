import { useEffect, useMemo, useState } from "react";

type Product = { id: number; name: string; price: number };

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";

export default function App() {
  const [items, setItems] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);

  const api = useMemo(() => `${API_BASE}/api/products`, []);

  async function load() {
    const res = await fetch(api);
    const data = (await res.json()) as Product[];
    setItems(data);
  }

  async function add() {
    await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });
    setName("");
    setPrice(0);
    await load();
  }

  async function remove(id: number) {
    await fetch(`${api}/${id}`, { method: "DELETE" });
    await load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Products</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          style={{ width: 140, padding: 8 }}
        />
        <button onClick={add} disabled={!name.trim()} style={{ padding: "8px 12px" }}>
          Add
        </button>
      </div>

      <ul style={{ padding: 0, listStyle: "none" }}>
        {items.map((p) => (
          <li
            key={p.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 12,
              border: "1px solid #ddd",
              borderRadius: 10,
              marginBottom: 8,
            }}
          >
            <div>
              <b>{p.name}</b>
              <div>{p.price}</div>
            </div>
            <button onClick={() => remove(p.id)} style={{ padding: "6px 10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
