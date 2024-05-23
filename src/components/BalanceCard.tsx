import { Flex, Segmented, Skeleton } from "antd";
import { BaseCard, EditableText } from "../styles/renderComponents.ts";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.ts";
import { RatesResponse } from "../context/UserTypes.ts";
import { useAccounts } from "../context/AccountsContext.tsx";
interface CurrencySymbols {
  [key: string]: string;
}
export const BalanceCard = () => {
  const { get } = useFetch();
  const { accounts } = useAccounts();
  const usdBalance = accounts.reduce(
    (accumulator, account) => accumulator + Math.round(account.balance),
    0,
  );
  const [rates, setRates] = useState<RatesResponse>();
  const [balance, setBalance] = useState<string>(usdBalance + " " + "$");

  useEffect(() => {
    get<RatesResponse>(
      "https://v6.exchangerate-api.com/v6/9b2f9dc2c238e90925475337/latest/USD",
      {
        includeCredentials: false,
      },
    ).then((response) => setRates(response));
  }, []);

  if (!rates || !rates.conversion_rates) {
    return <Skeleton />;
  }

  const exchangeCurrencyRate = (currency: string) => {
    const currencySymbols: CurrencySymbols = {
      RUB: "₽",
      USD: "$",
      EUR: "€",
      AUD: "A$",
    };
    setBalance(
      Math.round(rates.conversion_rates[currency] * usdBalance) +
        " " +
        currencySymbols[currency],
    );
  };

  return (
    <BaseCard>
      <Flex vertical gap={"middle"}>
        <EditableText size={2} italic>
          Total balance
        </EditableText>
        <EditableText size={4} fontWeight={"normal"}>
          {balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </EditableText>
        <Segmented
          style={{ width: "max-content" }}
          options={["USD", "RUB", "EUR", "AUD"]}
          onChange={(value) => exchangeCurrencyRate(value)}
        />
      </Flex>
    </BaseCard>
  );
};
