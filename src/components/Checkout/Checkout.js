import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Form from "../layout/Form";
import FormInput from "../layout/FormInput";
import Button from "../layout/Button";
import toBrl from "../utils/toBrl";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "../contexts/UserContext";
import { deleteLocal } from "../utils/localStorageFunctions";
import axios from "axios";

export default function Checkout() {
  const { cart } = useLocation().state;
  const { cartItems, cartTotal } = cart;
  const navigate = useNavigate();

  const { userInfo } = useContext(UserContext);
  const [adress, setAdress] = useState("");
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardType, setCardType] = useState("credit");

  async function sendOrder(e) {
    e.preventDefault();
    setLoading(true);

    const API_URL = process.env.REACT_APP_API_URL;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const body = {
      adress,
      paymentInfo: {
        name,
        cardType,
        cardNumber,
        cvv,
      },
      items: cartItems,
    };

    try {
      await axios.post(`${API_URL}/order`, body, config);
      deleteLocal(userInfo.email);
      navigate("/orderOverview", {
        state: {
          adress,
          cardNumber: cardNumber.slice(-4),
          items: cartItems,
          total: cartTotal,
        },
      });
    } catch (error) {
      setLoading(false);
      alert("Erro ao registrar pedido!");
    }
  }

  return (
    <Container>
      <Title>
        Por favor, preencha com suas informações de entrega e pagamento:
      </Title>
      <Form onSubmit={sendOrder}>
        <FormInput
          placeholder="Endereço"
          type="text"
          value={adress}
          required
          disabled={loading}
          onChange={(e) => setAdress(e.target.value)}
        />
        <FormInput
          placeholder="Nome no cartão"
          type="text"
          value={name}
          required
          disabled={loading}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          placeholder="Número do cartão"
          type="number"
          value={cardNumber}
          maxLength="16"
          pattern="^[0-9]{16}$"
          required
          disabled={loading}
          onChange={(e) =>
            setCardNumber(e.target.value.slice(0, e.target.maxLength))
          }
        />
        <FormInput
          placeholder="cvv"
          type="number"
          value={cvv}
          maxLength="3"
          pattern="^[0-9]{3}$"
          required
          disabled={loading}
          onChange={(e) => setCvv(e.target.value.slice(0, e.target.maxLength))}
        />
        <SelectContainer>
          <select
            required
            name="cardType"
            id="cardType"
            onChange={(e) => setCardType(e.target.value)}
            disabled={loading}
          >
            <option value="credit">Crédito</option>
            <option value="debit">Débito</option>
          </select>
        </SelectContainer>
        <h3>Total da compra: {toBrl(cartTotal)}</h3>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <ThreeDots color="#ffffff" height={60} width={60} />
          ) : (
            "Realizar pedido"
          )}
        </Button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 70px;
  margin-bottom: 70px;
  padding: 30px 12px 30px 12px;

  h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #003800;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  color: #003800;
  font-weight: bold;
  margin-bottom: 30px;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  label {
    font-size: 18px;
    color: #009c7f;
    font-weight: bold;
    margin-bottom: 6px;
  }

  option {
    height: 40px;
    background-color: #fafafa;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    text-align: left;
    outline: none;
    padding-left: 15px;
    font-size: 16px;
  }

  select {
    height: 40px;
    background-color: #fafafa;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    text-align: left;
    outline: none;
    padding-left: 15px;
    font-size: 16px;

    :disabled {
      background-color: #a6ae9c;
    }
  }
`;
