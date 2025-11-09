import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RootLayout from './layouts/RootLayout.jsx'
import Home from './components/Home/Home.jsx'
import AllProducts from "./components/AllProducts/AllProducts.jsx";
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AuthProvider from './contexts/AuthProvider.jsx'
import Register from './Register/Register.jsx'
import MyProducts from './components/MyProducts/MyProducts.jsx'
import MyBids from './components/MyBids/MyBids.jsx'
import PrivateRoute from './contexts/PrivateRoute.jsx'
import ProdcutsDetails from './components/ProdcutsDetails.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allProducts",
        Component: AllProducts,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "myProducts",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "myBids",
        element: (
          <PrivateRoute>
            <MyBids></MyBids>
          </PrivateRoute>
        ),
      },
      {
        path: "productDetails/:id",
        loader: ({params}) => fetch(`http://localhost:3000/products/${params.id}`),
        element: (
          <ProdcutsDetails></ProdcutsDetails>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
  </StrictMode>
);
