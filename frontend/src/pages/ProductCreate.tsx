import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../services/products.service";

export default function ProductCreate() {
  const nav = useNavigate();

  async function handleSubmit(p: any) {
    await createProduct(p);
    nav("/");
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 animate-fadeIn">
      <div className="w-full bg-slate-400 rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            🛍️ Agregar producto
          </h2>
          <button
            onClick={() => nav(-1)}
            className="text-sm text-indigo-600 hover:text-indigo-700 transition"
          >
            ← Volver
          </button>
        </div>

        {/* Formulario */}
        <div className="border-t border-gray-100 pt-5">
          <ProductForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
