import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../layout/Form";
import FormInput from "../layout/FormInput";
import Button from "../layout/Button";
import axios from "axios";

import { ThreeDots } from "react-loader-spinner";

export default function SignInForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleForm(event) {
    setBody({ ...body, [event.target.name]: event.target.value });
  }

  function signUp() {
    const API_URL = process.env.REACT_APP_API_URL;

    setLoading(true);

    const { name, email, password } = body;

    axios
      .post(`${API_URL}/sign-up`, { name, email, password })
      .then(() => {
        navigate("/sign-in");
      })
      .catch(() => {
        alert(
          "Não foi possível realizar esta operação no momento. Tente novamente mais tarde!"
        );
      })
      .finally(() => setLoading(false));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { password, confirmPassword } = body;

    if (password !== confirmPassword) {
      alert("As senhas devem ser iguais");
      return;
    }

    signUp();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormInput
        placeholder="Nome"
        type="text"
        name="name"
        required
        value={body.name}
        onChange={handleForm}
        disabled={loading}
      />
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
      <FormInput
        placeholder="Confirme a senha"
        type="password"
        name="confirmPassword"
        required
        value={body.confirmPassword}
        onChange={handleForm}
        disabled={loading}
      />

      <Button type="submit" disabled={loading}>
        {loading ? (
          <ThreeDots color="#ffffff" height={60} width={60} />
        ) : (
          "Cadastrar"
        )}
      </Button>
    </Form>
  );
}
