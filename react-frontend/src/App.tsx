import { useEffect, useState } from "react";

type Product = { id: number; title: string; price: number };

export default function App() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {items.map((p) => (
          <li key={p.id}>{p.title} - {p.price}</li>
        ))}
      </ul>
    </div>
  );
}
