import { Link } from "react-router-dom";
import styled from "styled-components";

import logo from "../../assets/img/logo.png";

export default function Logo() {
  return (
    <LogoContainer>
      <Link to="/">
        <img src={logo} alt="Logo" />
        AppleStore
      </Link>
    </LogoContainer>
  );
}

const LogoContainer = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin: 20px 0;
  font-family: "Titan One", cursive;

  a {
    display: flex;
    align-items: center;
    color: #009c7f;
    text-decoration: none;
  }

  img {
    width: 60px;
    height: 60px;
    margin-right: 6px;
  }
`;
