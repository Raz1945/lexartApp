import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { deleteProduct, getProducts } from '../services/products.service';
import SearchBar from '../components/SearchBar';


// Lista de productos con opciones de búsqueda y filtrado
// Permite ver, editar y eliminar productos.
// Todo: paginación
// Todo: mejorar diseño

export default function ProductsList() {
  const [items, setItems] = useState<Product[]>([]);
  const [q, setQ] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  async function load() {
    const data = await getProducts(q);
    setItems(data);
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
        .join(' ')
        .toLowerCase();
      const inQ = q ? text.includes(q.toLowerCase()) : true;
      const inBrand = brand
        ? (p.brand || '').toLowerCase().includes(brand.toLowerCase())
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
    if (!confirm('¿Eliminar producto?')) return;
    await deleteProduct(id);
    await load();
  }

  return (
    <div>
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

      <div className='flex justify-between items-center mb-3'>
        <h1 className='text-xl font-semibold'>Productos</h1>
        <Link to='/create' className='bg-black text-white px-3 py-2 rounded'>
          Agregar
        </Link>
      </div>

      <div className='grid md:grid-cols-2 gap-4'>
        {filtered.map((p) => (
          // Producto Card
          <div key={p.id} className='bg-white rounded-xl shadow p-4'>
            <h3 className='font-semibold'>{p.name}</h3>
            <p className='text-sm text-gray-600'>
              {p.brand} • {p.model}
            </p>
            <div className='mt-2'>
              <p className='text-sm font-medium'>Variantes:</p>
              <ul className='text-sm'>
                {p.variantes?.map((v) => (
                  <li key={`${p.id}-${v.color}-${v.price}`}>
                    💠 {v.color} — ${v.price}
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex gap-2 mt-3'>
              <Link to={`/edit/${p.id}`} className='px-3 py-2 border rounded'>
                Editar
              </Link>
              <button
                onClick={() => onDelete(p.id)}
                className='px-3 py-2 border rounded text-red-600'
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className='col-span-full text-center text-gray-500'>
            Sin resultados
          </div>
        )}
      </div>
    </div>
  );
}
