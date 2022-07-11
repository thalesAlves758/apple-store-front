import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/img/logo.png";
import ProductsContext from "../contexts/ProductsContext";

export default function Header() {
  const location = useLocation().pathname;
  const render =
    location !== "/sign-up" && location !== "/sign-in" ? true : false;

  const { productList, setShowedProducts } = useContext(ProductsContext);

  const [searchText, setSearchText] = useState("");

  function getNormalizedText(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  useEffect(() => {
    const products = productList.filter((product) => {
      return getNormalizedText(product.name).includes(
        getNormalizedText(searchText)
      );
    });

    setShowedProducts(products);
  }, [searchText]); //eslint-disable-line

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
            />
            <ion-icon name="search-outline"></ion-icon>
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

  ion-icon {
    position: absolute;
    font-size: 24px;
    left: 10px;
    top: 8px;
    font-weight: bold;
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
  padding-left: 40px;
  font-size: 16px;
`;

const Logo = styled.img`
  position: fixed;
  right: 10px;
  top: 10px;
  height: 40px;
  width: 40px;
`;
