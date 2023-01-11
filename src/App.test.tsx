import React from "react";
import "jest-canvas-mock";
import { render, screen } from "@testing-library/react";
import CardsList from "./Components/CardList";
import Card from "./Components/Card";

const testData = {
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
  image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  current_price: 17432.69,
  market_cap: 335722385550,
  market_cap_rank: 1,
  fully_diluted_valuation: 366075614887,
  total_volume: 22237837362,
  high_24h: 17507.77,
  low_24h: 17199.25,
  price_change_24h: 225.38,
  price_change_percentage_24h: 1.3098,
  market_cap_change_24h: 4203710645,
  market_cap_change_percentage_24h: 1.26802,
  circulating_supply: 19258781,
  total_supply: 21000000,
  max_supply: 21000000,
  ath: 69045,
  ath_change_percentage: -74.75236,
  ath_date: "2021-11-10T14:24:11.849Z",
  atl: 67.81,
  atl_change_percentage: 25607.75581,
  atl_date: "2013-07-06T00:00:00.000Z",
  roi: null,
  last_updated: "2023-01-11T06:51:10.488Z",
  sparkline_in_7d: {
    price: [
      16847.414958668527, 16870.3299147353, 16868.97971869581, 16873.663531434013, 16839.31631698298,
      16840.379694210023, 16836.715819170204, 16812.569889413244, 16828.855757828445, 16844.44495295743,
      16849.2538753479, 16861.65882922434, 16925.521898016355, 16972.97281021798, 16833.71355871587, 16811.06387455646,
      16824.22707232957, 16826.44858550658, 16861.25234132466, 16855.527051354722, 16844.843586970845
    ]
  }
};

test("renders ErrorPage component when window width is below threshold", async () => {
  window.innerWidth = 1000;
  render(<CardsList />);
  expect(await screen.findByTestId("error-page-test-id")).toBeInTheDocument();
});

test("renders card properties correctly", async () => {
  render(
    <Card
      key={testData.symbol}
      symbol={testData.symbol}
      name={testData.name}
      image={testData.image}
      sparkData={testData.sparkline_in_7d.price}
      totalVolume={testData.total_volume}
      currentPrice={testData.current_price}
      priceChange={testData.price_change_24h}
    />
  );
  const cards = await screen.findAllByTestId("card-test-id");
  cards.forEach((card) => {
    expect(card).toHaveTextContent("BTC-USD");
    expect(card).toHaveTextContent("Bitcoin");
    expect(card).toHaveTextContent("225.38");
  });
});
