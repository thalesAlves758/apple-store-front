import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import toBrl from "../utils/toBrl";
import Button from "../layout/Button";

export default function OrderOverview() {
  const navigate = useNavigate();
  const { adress, cardNumber, items, total } = useLocation().state;

  return (
    <Container>
      <p>Pedido feito</p>
      <p>com sucesso!</p>
      <div>
        <h2>Endereço</h2>
        <p>{adress}</p>
        <p></p>
      </div>
      <div>
        <h2>Pagamento</h2>
        <p>Cartão com final: {cardNumber}</p>
      </div>
      <div>
        <h2>Itens</h2>
        {items.map((item, index) => (
          <p key={index}>
            {item.name} - {toBrl(item.price)}
          </p>
        ))}
      </div>
      <div>
        <h2>Total: {toBrl(total)}</h2>
      </div>
      <HomeButton onClick={() => navigate("/")}>Continuar comprando</HomeButton>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 70px;
  margin-bottom: 60px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  color: #293845;

  p {
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    color: #247a6b;
  }

  > div {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    padding-left: 14px;

    p {
      font-size: 18px;
      text-align: left;
      color: #293845;
      font-weight: 400;
      margin-top: 2px;
    }
  }

  h2 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }
`;

const HomeButton = styled(Button)`
  width: 70%;
  height: 50px;
  align-self: center;
  margin-top: 30px;
`;
