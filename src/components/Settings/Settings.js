import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import httpStatus from "../../utils/httpStatus";

export default function Settings() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  function logOut() {
    if (!window.confirm("Você realmente deseja sair?")) {
      return;
    }

    const API_URL = process.env.REACT_APP_API_URL;

    axios
      .post(
        `${API_URL}/sign-out`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token || ""}`,
          },
        }
      )
      .then(() => {
        setUserInfo(null);
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === httpStatus.UNAUTHORIZED) {
            setUserInfo(null);
            navigate("/");
            return;
          }

          if (error.response.status === httpStatus.INTERNAL_SERVER_ERROR) {
            alert("Não foi possível realizar esta operação");
            return;
          }
        }
      });
  }

  function genSettingsPage() {
    if (!userInfo) {
      return (
        <Container>
          <WelcomeMessage>
            <p>Parece que você ainda não está conectado.</p>
            <p>Entre já ou crie sua conta!</p>
            <div>
              <Link to="/sign-in">
                <Button>Entre</Button>
              </Link>
              <Link to="/sign-up">
                <Button>Cadastre-se</Button>
              </Link>
            </div>
          </WelcomeMessage>
        </Container>
      );
    }
    return (
      <Container>
        <Title>Olá, {userInfo.name}</Title>
        <ButtonsContainer>
          <Link to="/cart">
            <Button>Carrinho</Button>
          </Link>
          <Button onClick={logOut}>Sair</Button>
        </ButtonsContainer>
      </Container>
    );
  }
  return <>{genSettingsPage()}</>;
}

const Container = styled.div`
  margin-top: 70px;
  margin-bottom: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  margin-top: 30px;
  font-size: 32px;
  padding-left: 20px;
  width: 100%;
`;

const WelcomeMessage = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 18px;
    margin-bottom: 4px;
  }

  h1 {
    font-size: 30px;
  }

  div {
    margin-top: 30px;
    width: 80%;
    display: flex;
    justify-content: space-around;
  }
`;

const ButtonsContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 80%;
`;

const Button = styled.button`
  background-color: #2cb566;
  height: 24px;
  border: none;
  color: white;
  width: 110px;
  height: 60px;
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #0d361e;
  border-radius: 60px;
  text-align: center;
  text-decoration: none;
  margin-bottom: 20px;

  :hover {
    cursor: pointer;
    filter: brightness(1.08);
  }
`;
