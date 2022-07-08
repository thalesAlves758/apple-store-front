import Container from "../layout/Container";
import Main from "../layout/Main";
import Logo from "../layout/Logo";
import SignInForm from "./SignInForm";
import StyledLink from "../layout/StyledLink";

export default function SignIn() {
  return (
    <Container>
      <Main>
        <Logo />
        <SignInForm />
        <StyledLink to="/sign-up">
          Ainda não possui uma conta? Cadastre-se agora!
        </StyledLink>
      </Main>
    </Container>
  );
}
