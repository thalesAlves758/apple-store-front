import styled from "styled-components";

import logo from "../../assets/img/logo.png";

export default function Logo() {
  return (
    <LogoContainer>
      <img src={logo} alt="Logo" />
      AppleStore
    </LogoContainer>
  );
}

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  margin: 20px 0;

  img {
    width: 60px;
    height: 60px;
    margin-right: 6px;
  }
`;
