import { useState, useContext } from "react";

import Form from "../layout/Form";
import FormInput from "../layout/FormInput";
import Button from "../layout/Button";
import axios from "axios";

import UserContext from "../contexts/UserContext";

import httpStatus from "../../utils/httpStatus";

import { ThreeDots } from "react-loader-spinner";

export default function SignInForm() {
  const { setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState({
    email: "",
    password: "",
  });

  function handleForm(event) {
    setBody({ ...body, [event.target.name]: event.target.value });
  }

  function signIn() {
    const API_URL = process.env.REACT_APP_API_URL;

    setLoading(true);

    axios
      .post(`${API_URL}/sign-in`, body)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        if (error.response) {
          const { status } = error.response;

          if (status === httpStatus.UNAUTHORIZED) {
            alert("E-mail ou senha inválidos. Tente novamente!");
            return;
          }
        }
      })
      .finally(() => setLoading(false));
  }

  function handleSubmit(event) {
    event.preventDefault();

    signIn();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormInput
        placeholder="E-mail"
        type="email"
        name="email"
        required
        value={body.email}
        onChange={handleForm}
        disabled={loading}
      />
      <FormInput
        placeholder="Senha"
        type="password"
        name="password"
        required
        value={body.password}
        onChange={handleForm}
        disabled={loading}
      />

      <Button type="submit" disabled={loading}>
        {loading ? (
          <ThreeDots color="#ffffff" height={60} width={60} />
        ) : (
          "Entrar"
        )}
      </Button>
    </Form>
  );
}
