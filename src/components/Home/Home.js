import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { getLocal, setLocal } from "../utils/localStorageFunctions";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import toBrl from "../utils/toBrl";
import Loader from "../layout/Loader";

export default function Home() {
  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useState(getLocal("cart") || []);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;

    async function fetchData() {
      try {
        const { data } = await axios.get(`${API_URL}/products`);
        setProductList(data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        }
      }
    }
    fetchData();
  }, []);

  function addToCart(name, price, image, id) {
    if (!userInfo) {
      alert("Você precisa estar conectado para adicionar itens ao carrinho!");
      navigate("/sign-in");
    }

    const newCart = [...cart, { name, price, image, _id: id }];

    setCart(newCart);
    setLocal("cart", newCart);
  }

  function genProductList() {
    if (productList.length > 0) {
      return (
        <Container>
          <List>
            {productList.map((product, index) => (
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
  return <>{genProductList()}</>;
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
