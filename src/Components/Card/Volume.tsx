import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 120px;
`;

const Volume = styled.h2`
  margin: 0px 0px;
  display: flex;
`;

const Title = styled.h4`
  margin-top: 5px;
`;

const Symbol = styled.span`
  margin-left: 5px;
  text-transform: uppercase;
`;

const VolumeSection = ({
  totalVolume,
  currentPrice,
  symbol
}: {
  totalVolume: number;
  currentPrice: number;
  symbol: string;
}): JSX.Element => {
  return (
    <Container>
      <Volume>
        {Math.round(totalVolume / currentPrice).toLocaleString()} <Symbol>{symbol}</Symbol>
      </Volume>
      <Title className="text-weak">24h Volume</Title>
    </Container>
  );
};

export default VolumeSection;
