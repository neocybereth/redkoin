import { useState, useEffect, useCallback } from "react";
import { ResponseData } from "./types";
import { CardData } from "../Card/types";
import Error from "../Error";
import Card from "../Card";
import ErrorPage from "../ErrorPage";

const CardsList = (): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<CardData[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Strictly used for fetching, no side effects
  const fetchData = async (page: number): Promise<CardData[]> => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=${page}&sparkline=true`
      );
      const resData: ResponseData[] = await response.json();
      // Peel off only necessary data
      // No need to pass around the rest of the response which is unused data
      const newData = resData.map((data: ResponseData) => {
        const {
          symbol,
          name,
          image,
          sparkline_in_7d: { price },
          total_volume,
          current_price,
          price_change_percentage_24h
        } = data;
        return {
          symbol,
          name,
          image,
          sparkData: price,
          totalVolume: total_volume,
          currentPrice: current_price,
          priceChange: price_change_percentage_24h
        };
      });
      return newData;
    } catch (error) {
      // Would typically log the error here
      console.log(error);
      return [];
    }
  };

  // Fetch on mount
  const handleFetch = useCallback(async () => {
    fetchData(page).then((newData) => {
      if (newData.length === 0) setError(true);
      else setData((prevData) => [...prevData, ...newData]);
    });
  }, [page]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  // Infinite scroll
  useEffect(() => {
    function handleScroll() {
      const isAtBottom =
        Math.ceil(window.innerHeight + document.documentElement.scrollTop) >= document.documentElement.offsetHeight;
      if (isAtBottom) setPage((prev) => prev + 1);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check for screen size and render error for tablet and mobile
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (windowWidth < 1150) return <ErrorPage />;
  return (
    <div>
      {error ? (
        <Error setError={setError} handleFetch={handleFetch} />
      ) : (
        <>
          {data.map(({ symbol, name, image, sparkData, totalVolume, currentPrice, priceChange }, i) => (
            <Card
              key={`${symbol}-${i}`}
              symbol={symbol}
              name={name}
              image={image}
              sparkData={sparkData}
              totalVolume={totalVolume}
              currentPrice={currentPrice}
              priceChange={priceChange}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CardsList;
