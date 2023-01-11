import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
const ErrorMessage = styled.h1`
  font-size: 1.45em;
  color: white;
`;

const RetryButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  font-weight: 700;
`;

const Container = styled.div`
  text-align: center;
  margin-top: 20vh;
`;

const Error = ({
  handleFetch,
  setError
}: {
  handleFetch: () => Promise<void>;
  setError: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => (
  <Container>
    <ErrorMessage>Sorry there's been an error...Retry!</ErrorMessage>
    <RetryButton
      onClick={() => {
        setError(false);
        handleFetch();
      }}
    >
      Retry
    </RetryButton>
  </Container>
);

export default Error;
