import { ThreeCircles } from "react-loader-spinner";
import styled from "styled-components";

export default function Loader() {
  return (
    <Container>
      <ThreeCircles
        ariaLabel="loading-indicator"
        color="#85c940"
        outerCircleColor="#2cb566"
        height={110}
        width={110}
      />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
