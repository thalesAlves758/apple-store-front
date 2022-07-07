import { useLocation } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const location = useLocation().pathname;
  const render =
    location !== "/sign-up" && location !== "/sign-in" ? true : false;

  function genHeader() {
    if (render) {
      return (
        <Container>
          <SearchBar>
            <Input placeholder="Pesquisar" type="text" />
            <ion-icon name="search-outline"></ion-icon>
          </SearchBar>
        </Container>
      );
    }
    return null;
  }
  return <>{genHeader()}</>;
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 100%;
  background-color: #85c940;
  box-shadow: 0px 0px 9px 3px rgba(0, 0, 0, 0.25);
`;

const SearchBar = styled.div`
  width: 90%;
  height: 40px;
  position: relative;

  ion-icon {
    position: absolute;
    font-size: 24px;
    left: 10px;
    top: 8px;
    font-weight: bold;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  text-align: left;
  outline: none;
  padding-left: 40px;
  font-size: 16px;
`;
