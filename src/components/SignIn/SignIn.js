import Container from "../layout/Container";
import Main from "../layout/Main";
import Logo from "../layout/Logo";
import SignInForm from "./SignInForm";

export default function SignIn() {
  return (
    <Container>
      <Main>
        <Logo />
        <SignInForm />
      </Main>
    </Container>
  );
}
