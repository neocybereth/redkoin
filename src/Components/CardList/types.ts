export interface ResponseData {
  symbol: string;
  name: string;
  image: string;
  sparkline_in_7d: { price: number[] };
  total_volume: number;
  current_price: number;
  price_change_percentage_24h: number;
}
