import styled from "styled-components";

const Button = styled.button`
  height: 40px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  font-size: 18px;
  background-color: #2cb566;
  color: #ffffff;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  :hover {
    filter: brightness(1.08);
    cursor: pointer;
  }

  :disabled {
    opacity: 0.5;

    :hover {
      cursor: default;
      filter: none;
    }
  }
`;

export default Button;
