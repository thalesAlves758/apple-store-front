import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { getLocal, setLocal } from "../utils/localStorageFunctions";
import UserContext from "../contexts/UserContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductsContext from "../contexts/ProductsContext";
import toBrl from "../utils/toBrl";
import Loader from "../layout/Loader";
import normalizeText from "../utils/normalizeText";
import RenderIf from "../utils/RenderIf";

export default function Home() {
  const { productList, setProductList, showedProducts, setShowedProducts } =
    useContext(ProductsContext);
  const [cart, setCart] = useState(getLocal("cart") || []);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const searchedText = searchParams.get("search");

  function renderProducts(products) {
    setShowedProducts(
      products.filter((product) => {
        return normalizeText(product.name).includes(searchedText || "");
      })
    );
  }

  useEffect(() => {
    if (productList.length === 0) {
      const API_URL = process.env.REACT_APP_API_URL;

      async function fetchData() {
        try {
          const { data } = await axios.get(`${API_URL}/products`);
          setProductList(data);
          renderProducts(data);
        } catch (error) {
          if (error.response) {
            console.log(error.response.data);
          }
        }
      }
      fetchData();
      return;
    }

    renderProducts(productList);
  }, [searchedText]); /* eslint-disable-line */

  function addToCart(name, price, image, id) {
    if (!userInfo) {
      alert("Você precisa estar conectado para adicionar itens ao carrinho!");
      navigate("/sign-in");
    } else {
      const newCart = [...cart, { name, price, image, _id: id }];

      setCart(newCart);
      setLocal("cart", newCart);
      setUserInfo({ ...userInfo, cartLenght: newCart.length });
    }
  }

  function genProductList() {
    if (productList.length > 0) {
      return (
        <Container>
          <List>
            {showedProducts.map((product, index) => (
              <Product
                key={index}
                name={product.name}
                price={product.price}
                image={product.image}
                id={product._id}
                addToCart={addToCart}
              />
            ))}
          </List>
        </Container>
      );
    }

    return <Loader />;
  }
  return (
    <>
      <RenderIf isTrue={showedProducts.length > 0}>{genProductList()}</RenderIf>

      <RenderIf isTrue={showedProducts.length === 0}>
        <NoProductsMessage>Nenhum produto encontrado</NoProductsMessage>
      </RenderIf>
    </>
  );
}

function Product({ name, price, image, id, addToCart }) {
  return (
    <ProductBox>
      <img src={image} alt={name} />
      <h1>{name}</h1>
      <h2>{toBrl(price)}</h2>
      <Button onClick={() => addToCart(name, price, image, id)}>
        <p>Adicionar ao carrinho</p>
      </Button>
    </ProductBox>
  );
}

const NoProductsMessage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  padding: 0 25px;
  color: #003800;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  margin-bottom: 60px;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  justify-content: space-between;
  margin: 20px 0 10px 0;
`;

const ProductBox = styled.div`
  width: 48%;
  height: 220px;
  background-color: white;
  margin-bottom: 20px;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  padding: 0 8px 0 8px;
  position: relative;

  img {
    width: 100%;
    margin-top: 8px;
    height: 100px;
    object-fit: fill;
    margin-bottom: 6px;
  }

  h1 {
    font-weight: bold;
    color: #003800;
  }

  h2 {
    font-weight: bold;
    position: absolute;
    bottom: 38px;
    left: 8px;
  }
`;

const Button = styled.button`
  background-color: #85c940;
  height: 24px;
  border: none;
  color: white;
  border-radius: 6px;
  text-align: center;
  text-decoration: none;

  position: absolute;
  bottom: 6px;
  left: 6px;
  font-weight: bold;

  :hover {
    cursor: pointer;
    filter: brightness(1.08);
  }
`;
