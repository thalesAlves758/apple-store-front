import styled from "styled-components";

const FormInput = styled.input`
  height: 40px;
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  text-align: left;
  outline: none;
  padding-left: 15px;
  font-size: 16px;

  :disabled {
    background-color: #a6ae9c;
  }
`;

export default FormInput;
