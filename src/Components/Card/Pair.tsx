import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-left: 20px;
  margin-top: 20px;
`;

const NamePairContainer = styled.div`
  flex-direction: column;
`;

const Pair = styled.h2`
  margin: 0px 0px;
`;

const Name = styled.h4`
  margin-top: 5px;
`;

const Symbol = styled.img`
  margin: 10px 10px 0px 0px;
`;

const PairContainer = ({ symbol, name, image }: { symbol: string; name: string; image: string }): JSX.Element => {
  return (
    <Container>
      <Symbol height={20} width={20} src={image} alt={`${name} icon`} />
      <NamePairContainer>
        <Pair>{symbol.toUpperCase()}-USD</Pair>
        <Name className="text-weak">{name}</Name>
      </NamePairContainer>
    </Container>
  );
};

export default PairContainer;
