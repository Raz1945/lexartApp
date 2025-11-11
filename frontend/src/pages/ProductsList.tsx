import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types";
import { deleteProduct, getProducts } from "../services/products.service";
import SearchBar from "../components/SearchBar";

export default function ProductsList() {
  const [items, setItems] = useState<Product[]>([]);
  const [q, setQ] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await getProducts(q);
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const m = items.filter((p) => {
      const text = [
        p.name,
        p.brand,
        p.model,
        ...(p.variantes?.map((v) => v.color) || []),
      ]
        .join(" ")
        .toLowerCase();

      const inQ = q ? text.includes(q.toLowerCase()) : true;
      const inBrand = brand
        ? (p.brand || "").toLowerCase().includes(brand.toLowerCase())
        : true;
      const inColor = color
        ? (p.variantes || []).some((v) =>
            v.color.toLowerCase().includes(color.toLowerCase())
          )
        : true;
      const prices = p.variantes?.map((v) => v.price) ?? [];
      const pMin = prices.length ? Math.min(...prices) : 0;
      const pMax = prices.length ? Math.max(...prices) : 0;
      const inMin = min ? pMax >= Number(min) : true;
      const inMax = max ? pMin <= Number(max) : true;
      return inQ && inBrand && inColor && inMin && inMax;
    });
    return m;
  }, [items, q, brand, color, min, max]);

  async function onDelete(id?: number) {
    if (!id) return;
    if (!confirm("¿Eliminar producto?")) return;
    await deleteProduct(id);
    await load();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-600 animate-pulse">
        Cargando productos...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl font-semibold text-gray-800">Productos</h1>
        <Link
          to="/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm transition"
        >
          + Agregar producto
        </Link>
      </div>

      {/* Filtros */}
      <SearchBar
        q={q}
        setQ={setQ}
        brand={brand}
        setBrand={setBrand}
        color={color}
        setColor={setColor}
        min={min}
        setMin={setMin}
        max={max}
        setMax={setMax}
        onSearch={load}
      />

      {/* Lista */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5"
          >
            <div className="mb-2">
              <h3 className="font-semibold text-gray-900">{p.name}</h3>
              <p className="text-sm text-gray-500">
                {p.brand} • {p.model}
              </p>
            </div>

            <div className="mt-2 border-t border-gray-100 pt-2">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Variantes:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                {p.variantes?.map((v) => (
                  <li key={`${p.id}-${v.color}-${v.price}`}>
                    💠 {v.color} —{" "}
                    <span className="font-semibold text-gray-800">
                      ${v.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2 mt-4">
              <Link
                to={`/edit/${p.id}`}
                className="flex-1 text-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition"
              >
                Editar
              </Link>
              <button
                onClick={() => onDelete(p.id)}
                className="flex-1 text-center px-3 py-2 border border-red-300 text-red-600 rounded-md text-sm hover:bg-red-50 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-500 border border-dashed border-gray-300 rounded-md">
            No se encontraron productos que coincidan con tu búsqueda.
          </div>
        )}
      </div>
    </div>
  );
}
