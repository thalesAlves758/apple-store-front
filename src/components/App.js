import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

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
import ProductsContext from "./contexts/ProductsContext";
import CartContext from "./contexts/CartContext";
import { getLocal } from "./utils/localStorageFunctions";

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [productList, setProductList] = useState([]);
  const [showedProducts, setShowedProducts] = useState([]);
  const [cartGlobal, setCartGlobal] = useState(
    userInfo ? getLocal(userInfo.email) || [] : []
  );

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
          <CartContext.Provider value={{ cartGlobal, setCartGlobal }}>
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
          </CartContext.Provider>
        </ProductsContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
