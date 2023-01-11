import styled from "styled-components";
import CardList from "./Components/CardList";

const Background = styled.div`
  background-color: black;
  background-size: cover;
`;

const Title = styled.h1`
  font-size: 1.45em;
  text-align: center;
  color: white;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const App = (): JSX.Element => (
  <Background>
    <TitleContainer>
      <img height={60} width={60} alt="AVAX Chad mascot" src="/wolfie.png" />
      <Title>Ava Labs Test</Title>
    </TitleContainer>
    <section>
      <CardList />
    </section>
  </Background>
);

export default App;
