import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/img/logo.png";
import normalizeText from "../utils/normalizeText";

export default function Header() {
  const navigate = useNavigate();

  const location = useLocation().pathname;
  const render =
    location !== "/sign-up" && location !== "/sign-in" ? true : false;

  const [searchParams] = useSearchParams();

  const [searchText, setSearchText] = useState(
    searchParams.get("search") || ""
  );

  function navigateToHome() {
    navigate(searchText === "" ? "/" : `/?search=${normalizeText(searchText)}`);
  }

  function genHeader() {
    if (render) {
      return (
        <Container>
          <SearchBar>
            <Input
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Pesquisar"
              type="search"
              value={searchText}
              onKeyUp={(event) => event.key === "Enter" && navigateToHome()}
            />
            <SearchButton onClick={() => navigateToHome()}>
              <ion-icon name="search-outline"></ion-icon>
            </SearchButton>
            <Logo src={logo} />
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
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 100%;
  background-color: #2cb566;
  box-shadow: 0px 0px 9px 3px rgba(0, 0, 0, 0.25);
`;

const SearchBar = styled.div`
  width: 90%;
  height: 40px;
  position: relative;
`;

const SearchButton = styled.button`
  position: absolute;
  font-size: 24px;
  right: 12%;
  height: 100%;
  width: 40px;
  border: none;
  background-color: transparent;
  font-weight: bold;

  :hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 88%;
  height: 100%;
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  text-align: left;
  outline: none;
  padding-left: 15px;
  font-size: 16px;
`;

const Logo = styled.img`
  position: fixed;
  right: 10px;
  top: 10px;
  height: 40px;
  width: 40px;
`;
