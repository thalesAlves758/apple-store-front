import Container from "../layout/Container";
import Main from "../layout/Main";
import Logo from "../layout/Logo";
import SignUpForm from "./SignUpForm";
import StyledLink from "../layout/StyledLink";

export default function SignIn() {
  return (
    <Container>
      <Main>
        <Logo />
        <SignUpForm />
        <StyledLink to="/sign-in">Já possui uma conta? Entre agora!</StyledLink>
      </Main>
    </Container>
  );
}
