import { useEffect, useState } from "react";
import { externalList, insertS1, insertS2, insertS3 } from "../services/external.service";
import type { Product } from "../types";

export default function ExternalApis() {
  const [items, setItems] = useState<Product[]>([]);
  const [log, setLog] = useState("");

  async function load() { const data = await externalList(); setItems(data); }
  useEffect(() => { load(); }, []);

  async function doS1() {
    const res = await insertS1({ name:"Xiaomi Redmi 9", brand:"Xiaomi", model:"Redmi 9", price:10000, color:"red" });
    setLog(JSON.stringify(res, null, 2)); await load();
  }
  async function doS2() {
    const res = await insertS2({ name:"Xiaomi Redmi 9", details:{brand:"Xiaomi", model:"Redmi 9", color:"blue"}, price:10200 });
    setLog(JSON.stringify(res, null, 2)); await load();
  }
  async function doS3() {
    const res = await insertS3([
      { name:"Iphone 14 Pro", brand:"Apple", model:"14 Pro", data:[{price:30000,color:"silver"},{price:30100,color:"gold"}] }
    ]);
    setLog(JSON.stringify(res, null, 2)); await load();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">APIs Externas</h1>
      <div className="flex gap-2">
        <button className="px-3 py-2 border rounded" onClick={doS1}>Insertar S1</button>
        <button className="px-3 py-2 border rounded" onClick={doS2}>Insertar S2</button>
        <button className="px-3 py-2 border rounded" onClick={doS3}>Insertar S3</button>
        <button className="px-3 py-2 border rounded" onClick={load}>Refrescar</button>
      </div>

      <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-auto">{log || "// logs..."}</pre>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map(p => (
          <div key={p.id} className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.brand} • {p.model}</p>
            <ul className="text-sm mt-2">
              {p.variantes?.map(v => <li key={`${p.id}-${v.color}-${v.price}`}>💠 {v.color} — ${v.price}</li>)}
            </ul>
          </div>
        ))}
        {items.length === 0 && <div className="col-span-full text-center text-gray-500">No hay productos</div>}
      </div>
    </div>
  );
}
  