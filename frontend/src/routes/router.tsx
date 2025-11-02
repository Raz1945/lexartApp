import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductsList from "../pages/ProductsList";
import ProductCreate from "../pages/ProductCreate";
import ProductEdit from "../pages/ProductEdit";
import ExternalApis from "../pages/ExternalApis";
import {ProtectedRoute} from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><ProductsList /></ProtectedRoute> },
      { path: "create", element: <ProtectedRoute><ProductCreate /></ProtectedRoute> },
      { path: "edit/:id", element: <ProtectedRoute><ProductEdit /></ProtectedRoute> },
      
      // pública para probar “cliente externo” (x-api-key)
      { path: "external", element: <ExternalApis /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
export default router;
