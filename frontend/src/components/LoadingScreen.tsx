// export default function LoadingScreen() {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-50">
//       <div className="flex flex-col items-center space-y-3">
//         <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
//         <p className="text-gray-600 font-medium">Cargando...</p>
//       </div>
//     </div>
//   );
// }


export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700 animate-fadeIn">
      {/* Logo o ícono minimalista */}
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <span className="absolute text-indigo-600 font-bold text-xl select-none">
          L
        </span>
      </div>

      {/* Texto con efecto de pulso */}
      <h1 className="text-lg font-semibold text-indigo-600 tracking-wide mb-1">
        Lexart Store
      </h1>
      <p className="text-sm text-gray-500 animate-pulse">Cargando...</p>
    </div>
  );
}
