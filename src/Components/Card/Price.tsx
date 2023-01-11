import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 20px 0px 0px;
  width: 120px;
`;

const Price = styled.h2`
  margin: 0px;
  text-align: right;
`;

const Change = styled.h4.attrs((props: { color: string }) => props)`
  margin-top: 5px;
  color: ${(props) => props.color};
  text-align: right;
`;

const PriceSection = ({ currentPrice, priceChange }: { currentPrice: number; priceChange: number }): JSX.Element => {
  const priceColor = priceChange > 0 ? "green" : "red";
  return (
    <Container>
      <Price>${currentPrice.toLocaleString()}</Price>
      <Change color={priceColor}>{priceChange.toFixed(2)}%</Change>
    </Container>
  );
};

export default PriceSection;
