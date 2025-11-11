import { useState } from "react";
import type { AxiosError } from "axios";

type Props = {
  initial?: {
    name: string;
    brand: string;
    model: string;
    price: number;
    color: string;
  };
  onSubmit: (payload: {
    name: string;
    brand: string;
    model: string;
    price: number;
    color: string;
  }) => Promise<void>;
  submitText?: string;
};

export default function ProductForm({
  initial,
  onSubmit,
  submitText = "Guardar",
}: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [brand, setBrand] = useState(initial?.brand ?? "");
  const [model, setModel] = useState(initial?.model ?? "");
  const [price, setPrice] = useState<number>(initial?.price ?? 0);
  const [color, setColor] = useState(initial?.color ?? "");
  const [err, setErr] = useState("");

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      await onSubmit({ name, brand, model, price, color });
    } catch (er) {
      const axiosError = er as AxiosError<{ mensaje?: string }>;
      const backendMessage = axiosError.response?.data?.mensaje;
      setErr(backendMessage || axiosError.message || "Error al guardar");
    }
  }

  const hasData = name || brand || model || color || price;

  return (
    <div className="flex flex-col md:flex-row gap-8 animate-fadeIn">
      {/* FORMULARIO */}
      <form
        onSubmit={handle}
        className="flex-1 space-y-5 md:max-w-md"
      >
        {err && (
          <p className="text-red-600 text-sm text-center bg-red-50 border border-red-100 rounded p-2">
            {err}
          </p>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del producto
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            placeholder="Ej: iPhone 15"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Marca
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="Ej: Apple"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modelo
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="Ej: Pro Max"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio
            </label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="Ej: 999"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="Ej: Azul medianoche"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors"
        >
          {submitText}
        </button>
      </form>

      {/* PREVIEW */}
      {hasData && (
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">
            Vista previa del producto
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {name || "Producto sin nombre"}
                </h4>
                <p className="text-sm text-gray-600">
                  {brand || "Marca desconocida"} • {model || "Modelo"}
                </p>
              </div>
              <span className="text-indigo-600 font-semibold text-base">
                ${price || 0}
              </span>
            </div>

            <div className="mt-3 text-sm text-gray-600">
              💠 {color || "Sin color especificado"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
