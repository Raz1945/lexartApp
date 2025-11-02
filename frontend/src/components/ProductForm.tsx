import { useState } from "react";

type Props = {
  initial?: { name:string; brand:string; model:string; price:number; color:string; };
  onSubmit: (payload: {name:string;brand:string;model:string;price:number;color:string;}) => Promise<void>;
  submitText?: string;
};
export default function ProductForm({ initial, onSubmit, submitText="Guardar" }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [brand, setBrand] = useState(initial?.brand ?? "");
  const [model, setModel] = useState(initial?.model ?? "");
  const [price, setPrice] = useState<number>(initial?.price ?? 0);
  const [color, setColor] = useState(initial?.color ?? "");
  const [err, setErr] = useState("");

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try { await onSubmit({ name, brand, model, price, color }); }
    catch (er: any) { setErr(er?.response?.data?.mensaje || "Error al guardar"); }
  }

  return (
    <form onSubmit={handle} className="space-y-3">
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <input className="w-full border rounded p-2" placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
      <input className="w-full border rounded p-2" placeholder="Marca" value={brand} onChange={e=>setBrand(e.target.value)} />
      <input className="w-full border rounded p-2" placeholder="Modelo" value={model} onChange={e=>setModel(e.target.value)} />
      <input className="w-full border rounded p-2" type="number" placeholder="Precio" value={price} onChange={e=>setPrice(Number(e.target.value))} />
      <input className="w-full border rounded p-2" placeholder="Color" value={color} onChange={e=>setColor(e.target.value)} />
      <button className="w-full bg-black text-white rounded p-2">{submitText}</button>
    </form>
  );
}
