import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Cart from "./Cart/Cart";
import Checkout from "./Checkout/Checkout";
import Settings from "./Settings/Settings";

export default function App() {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
  );
}
