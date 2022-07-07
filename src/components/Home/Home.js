import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Home() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;

    async function fetchData() {
      try {
        const { data } = await axios.get(`${API_URL}/products`);
        setProductList(data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchData();
  });

  function genProductList() {
    if (productList.length > 0) {
      return (
        <Container>
          <List>
            {productList.map((product, index) => (
              <Product
                key={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </List>
        </Container>
      );
    }

    return <>Loading</>;
  }
  return <>{genProductList()}</>;
}

function Product({ name, price, image }) {
  const priceToDisplay = price.toFixed(2).toString().replace(".", ",");

  return (
    <ProductBox>
      <img src={image} alt={name} />
      <h1>{name}</h1>
      <h2>R$ {priceToDisplay}</h2>
      <Button>
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
  height: 204px;
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
    margin-bottom: 6px;
  }
`;

const Button = styled.button`
  background-color: #2cb567;
  height: 24px;
  border: none;
  color: white;
  border-radius: 6px;
  text-align: center;
  text-decoration: none;
  position: absolute;
  bottom: 6px;
  left: 12px;

  :hover {
    cursor: pointer;
    filter: brightness(1.08);
  }
`;
