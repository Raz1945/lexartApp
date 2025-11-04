import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../services/products.service";

export default function ProductCreate() {
  const nav = useNavigate();
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Agregar producto</h2>
      <ProductForm onSubmit={async (p) => { await createProduct(p); nav("/"); }} />
    </div>
  );
}
