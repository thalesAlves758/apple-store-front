import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import UserContext from "../contexts/UserContext";
import CartContext from "../contexts/CartContext";
import Button from "../layout/Button";
import toBrl from "../utils/toBrl";
import RenderIf from "../utils/RenderIf";
import { setLocal } from "../utils/localStorageFunctions";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { userInfo } = useContext(UserContext);
  const { cartGlobal, setCartGlobal } = useContext(CartContext);

  const navigate = useNavigate();

  const [cartTotal, setCartTotal] = useState(0);

  function getCartTotal() {
    const REDUCE_INITIAL_VALUE = 0;

    return cartGlobal.reduce(
      (accumulator, current) => accumulator + current.price,
      REDUCE_INITIAL_VALUE
    );
  }

  function removeItem(index) {
    const newCartItems = cartGlobal.filter(
      (_, currentIndex) => currentIndex !== index
    );

    setLocal(userInfo.email, newCartItems);
    setCartGlobal(newCartItems);
  }

  function renderCartItems() {
    return cartGlobal.map((cartItem, index) => (
      <CartItem
        key={index}
        index={index}
        image={cartItem.image}
        name={cartItem.name}
        price={cartItem.price}
        removeItem={removeItem}
      />
    ));
  }

  function finishOrder() {
    const cart = {
      cartTotal,
      cartGlobal,
    };

    navigate("/checkout", { state: { cart } });
  }

  useEffect(() => {
    if (!userInfo) {
      alert("Você precisa estar conectado para visualizar o carrinho!");
      navigate("/sign-in");
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    setCartTotal(getCartTotal());
  }, [cartGlobal]); // eslint-disable-line

  return (
    <Container>
      <RenderIf isTrue={cartGlobal.length === 0}>
        <NoItemsMessage>
          Não há nenhum item no carrinho no momento!
        </NoItemsMessage>
      </RenderIf>

      <RenderIf isTrue={cartGlobal.length > 0}>
        <PageTitle>
          Seu carrinho
          <ion-icon name="cart"></ion-icon>
        </PageTitle>

        <CartItems>{renderCartItems()}</CartItems>

        <CartInfo>
          <CartTotal>Subtotal: {toBrl(cartTotal)}</CartTotal>
          <FinishOrderButton onClick={finishOrder}>
            Finalizar pedido {`(${cartGlobal.length} item(ns))`}
          </FinishOrderButton>
        </CartInfo>
      </RenderIf>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 78px 0 70px;
`;

const CartInfo = styled.div`
  background-color: #ffffff;
  padding: 25px;
  width: calc(100% - (2 * 25px));
  margin-top: 14px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const CartTotal = styled.div`
  font-weight: 700;
  font-size: 20px;
`;

const FinishOrderButton = styled(Button)`
  width: 100%;
  height: 60px;
  margin-top: 12px;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  padding: 0 25px;
`;

const PageTitle = styled.h1`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 25px;
  font-size: 26px;
  font-weight: 700;
  color: #009c7f;

  ion-icon {
    margin-left: 6px;
  }
`;

const NoItemsMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  padding: 0 25px;
  color: #003800;
`;
