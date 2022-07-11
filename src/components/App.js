import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import UserContext from "./contexts/UserContext";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Cart from "./Cart/Cart";
import Checkout from "./Checkout/Checkout";
import OrderOverview from "./OrderOverview/OrderOverview";
import Settings from "./Settings/Settings";
import { setNewInterval } from "./utils/intervals";
import ProductsContext from "./contexts/ProductsContext";

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [productList, setProductList] = useState([]);
  const [showedProducts, setShowedProducts] = useState([]);

  useEffect(() => {
    const THIRTY_SECONDS = 30 * 1000;

    setNewInterval(() => {
      if (userInfo) {
        const API_URL = process.env.REACT_APP_API_URL;

        const { token } = userInfo;

        axios
          .post(
            `${API_URL}/status`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
            }
          });
      }
    }, THIRTY_SECONDS);
  }, [userInfo]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <ProductsContext.Provider
          value={{
            productList,
            setProductList,
            showedProducts,
            setShowedProducts,
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orderOverview" element={<OrderOverview />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <Footer />
        </ProductsContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
