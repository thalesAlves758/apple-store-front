import styled from "styled-components";

import toBrl from "../utils/toBrl";

export default function CartItem({ index, price, name, image, removeItem }) {
  return (
    <CartItemContainer>
      <ItemImage>
        <img src={image} alt={name} />
      </ItemImage>
      <ItemInfo>
        <ItemName>{name}</ItemName>
        <ItemPrice>Total: {toBrl(price)}</ItemPrice>
        <BtnDelete onClick={() => removeItem(index)}>Remover</BtnDelete>
      </ItemInfo>
    </CartItemContainer>
  );
}

const CartItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  background-color: #ffffff;
  padding: 25px;
  width: 100%;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const ItemImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
`;

const ItemInfo = styled.div`
  width: 100%;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  font-size: 16px;
`;

const ItemName = styled.h3`
  font-weight: 700;
  font-size: 20px;
  color: #003800;
`;

const ItemPrice = styled.p`
  font-size: 18px;
  width: 100%;
  font-weight: 700;
  color: #728957;
`;

const BtnDelete = styled.button`
  width: 100px;
  height: 42px;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  background-color: #85c940;
  border: none;
  border-radius: 5px;

  :hover {
    filter: brightness(1.12);
    cursor: pointer;
  }
`;
