import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductsList from "../pages/ProductsList";
import ProductCreate from "../pages/ProductCreate";
import ProductEdit from "../pages/ProductEdit";
import { ProtectedRoute } from "./ProtectedRoute";

// NUEVAS PÁGINAS
// import MisProductos from "../pages/MisProductos";
// import Perfil from "../pages/Perfil";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><ProductsList /></ProtectedRoute> },
      { path: "create", element: <ProtectedRoute><ProductCreate /></ProtectedRoute> },
      { path: "edit/:id", element: <ProtectedRoute><ProductEdit /></ProtectedRoute> },
      // { path: "mis-productos", element: <ProtectedRoute><MisProductos /></ProtectedRoute> },
      // { path: "perfil", element: <ProtectedRoute><Perfil /></ProtectedRoute> },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
