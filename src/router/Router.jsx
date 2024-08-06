import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './CartContext';
import HomePage from "../pages/HomePage/HomePage";
import Pagepoint from "../pages/PointPage/Pagepoint";
import Appbar from "../component/Appbar";
import ListProductsPage from "../pages/ProductPage/ListProductsPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import NoPage from "../pages/ErrorPage/NoPage";
import Footer from "../component/Footer";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import Navbar from "../component/Navbar";

function Router() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          if (path != "LoginPage" && path != "LoginPage" )
          {
            <Route path="/" element={<Appbar />}>
              <Route index element={<HomePage />} />
              <Route path="Pagepoint" element={<Pagepoint />} />
              <Route path="List-Product" element={<ListProductsPage />} />
              <Route path="List-Product/Product" element={<ProductPage />} />
              {/* <Route path="/product/:id" component={ProductPage} /> */}
              <Route path="CheckoutPage" element={<CheckoutPage />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          }
          else
          {
            <Route path="/" element={<Navbar />}>
              <Route path="LoginPage" element={<LoginPage />} />
              <Route path="RegisterPage" element={<RegisterPage />} />
            </Route>
          }
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default Router;
