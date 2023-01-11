import { useState } from "react";
import styled from "styled-components";
import { CardData } from "./types";
import Pair from "./Pair";
import Sparkline from "./Sparkline";
import SparklineJumbo from "./SparklineJumbo";
import Volume from "./Volume";
import Price from "./Price";

const DataContainer = styled.div.attrs((props: { toggled: boolean }) => props)`
  display: flex;
  justify-content: space-between;
  border-radius: ${(props) => (props.toggled ? "0px" : "10px")};
  margin: 0px 100px 10px 100px;
  padding: 15px;
  background-color: rgba(18, 15, 34, 1);
  cursor: pointer;
`;

const SparkContainer = styled.div`
  margin: -5px 100px 10px 100px;
  background-color: rgba(18, 15, 34, 1);
  padding: 10px;
`;

const Card = ({ symbol, name, image, sparkData, totalVolume, currentPrice, priceChange }: CardData): JSX.Element => {
  const [toggled, setToggled] = useState<boolean>(false);
  const sparkColor = priceChange > 0 ? "green" : "red";
  return (
    <div data-testid="card-test-id">
      <DataContainer toggled={toggled} onClick={() => setToggled((prev) => !prev)} key={symbol}>
        <Pair symbol={symbol} name={name} image={image} />
        <Sparkline sparkColor={sparkColor} height={50} width={250} sparkData={sparkData} />
        <Volume currentPrice={currentPrice} symbol={symbol} totalVolume={totalVolume} />
        <Price currentPrice={currentPrice} priceChange={priceChange} />
      </DataContainer>
      {toggled && (
        <SparkContainer>
          <SparklineJumbo sparkColor={sparkColor} sparkData={sparkData} />
        </SparkContainer>
      )}
    </div>
  );
};

export default Card;
