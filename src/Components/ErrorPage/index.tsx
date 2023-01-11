import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-top: 20vh;
`;

const ErrorPage = (): JSX.Element => (
  <Container data-testid="error-page-test-id">
    <h1>Sorry, this Application was built for large screens only!</h1>
    <h2>Please widen your browser for the full experience.</h2>
  </Container>
);

export default ErrorPage;
