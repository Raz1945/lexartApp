type Props = {
  q: string;
  setQ: (v: string) => void;
  brand: string;
  setBrand: (v: string) => void;
  color: string;
  setColor: (v: string) => void;
  min: string;
  setMin: (v: string) => void;
  max: string;
  setMax: (v: string) => void;
  onSearch: () => void;
};
export default function SearchBar(p: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-4">
      <input className="border p-2 rounded" placeholder="Buscar..." value={p.q} onChange={e=>p.setQ(e.target.value)} />
      <input className="border p-2 rounded" placeholder="Marca" value={p.brand} onChange={e=>p.setBrand(e.target.value)} />
      <input className="border p-2 rounded" placeholder="Color" value={p.color} onChange={e=>p.setColor(e.target.value)} />
      <input className="border p-2 rounded" type="number" placeholder="Precio min" value={p.min} onChange={e=>p.setMin(e.target.value)} />
      <input className="border p-2 rounded" type="number" placeholder="Precio max" value={p.max} onChange={e=>p.setMax(e.target.value)} />
      <button onClick={p.onSearch} className="bg-black text-white rounded px-3">Filtrar</button>
    </div>
  );
}
