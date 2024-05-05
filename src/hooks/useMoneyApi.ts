import { useEffect, useState } from "react";
interface RatesResponse {
  conversion_rates: {
    [key: string]: number;
  };
}
export const useMoneyApi = () => {
  const [rates, setRates] = useState<RatesResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://v6.exchangerate-api.com/v6/96996cbc4ebe9898742f9d8c/latest/USD",
        );
        const json: RatesResponse = await response.json();
        setRates(json);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, []);

  return rates;
};
