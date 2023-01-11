export interface CardData {
  symbol: string;
  name: string;
  image: string;
  sparkData: number[];
  totalVolume: number;
  currentPrice: number;
  priceChange: number;
}

export interface SparkTypes {
  sparkData: number[];
  width: number;
  height: number;
  sparkColor: "red" | "green";
}
