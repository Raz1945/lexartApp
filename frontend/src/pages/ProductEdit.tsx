import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { getProduct, updateProduct } from "../services/products.service";

export default function ProductEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [initial, setInitial] = useState<{name:string;brand:string;model:string;price:number;color:string;}>();

  useEffect(() => {
    (async () => {
      const p = await getProduct(Number(id));
      const price = p.variantes?.[0]?.price ?? 0;
      const color = p.variantes?.[0]?.color ?? "";
      setInitial({ name: p.name, brand: p.brand, model: p.model, price, color });
    })();
  }, [id]);

  if (!initial) return <div>Cargando...</div>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Editar producto</h2>
      <ProductForm
        initial={initial}
        submitText="Actualizar"
        onSubmit={async (p) => {
          await updateProduct(Number(id), { name: p.name, brand: p.brand, model: p.model });
          // (Opcional: endpoint para actualizar variante)
          nav("/");
        }}
      />
    </div>
  );
}
