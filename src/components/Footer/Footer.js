import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";

export default function Footer() {
  const location = useLocation().pathname;
  const render =
    location !== "/sign-up" && location !== "/sign-in" ? true : false;

  function genFooter() {
    if (render) {
      return (
        <Container>
          <Link to="/">
            <ion-icon name="home-outline"></ion-icon>
          </Link>
          <Link to="/cart">
            <ion-icon name="cart-outline"></ion-icon>
          </Link>
          <Link to="/settings">
            <ion-icon name="person-outline"></ion-icon>
          </Link>
        </Container>
      );
    }
    return null;
  }
  return <>{genFooter()}</>;
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  height: 60px;
  width: 100%;
  background-color: white;
  box-shadow: 0px 0px 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-around;
  align-items: center;

  ion-icon {
    font-size: 30px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
