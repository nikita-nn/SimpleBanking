import { Card, Flex, Segmented, Skeleton, Typography } from "antd";
import { TransferButton } from "../styles/renderComponents.ts";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useMoneyApi } from "../hooks/useMoneyApi.ts";
import { useState } from "react";
interface CurrencySymbols {
  [key: string]: string;
}
export const BalanceCard = ({ usdBalance }: { usdBalance: number }) => {
  const rates = useMoneyApi();
  const [balance, setBalance] = useState<string>(usdBalance + " " + "$");

  if (!rates || !rates.conversion_rates) {
    return <Skeleton />;
  }

  const exchangeCurrencyRate = (currency: string) => {
    const currencySymbols: CurrencySymbols = {
      RUB: "₽",
      USD: "$",
      EUR: "€",
      AUD: "A$",
      ARS: "AR$",
    };
    setBalance(
      Math.round(rates.conversion_rates[currency] * usdBalance) +
        " " +
        currencySymbols[currency],
    );
  };

  return (
    <Card style={{ padding: "0.5rem" }}>
      <Flex vertical gap={"middle"}>
        <Typography.Text style={{ fontSize: "2rem" }} italic>
          Balance Overview
        </Typography.Text>
        <Typography.Text style={{ fontSize: "4rem" }}>
          {balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Typography.Text>
        <Segmented
          options={["USD", "RUB", "EUR", "AUD", "ARS"]}
          onChange={(value) => exchangeCurrencyRate(value)}
        />
        <Flex justify={"space-between"}>
          <TransferButton type={"primary"} icon={<ArrowUpOutlined />}>
            Transfer
          </TransferButton>
          <TransferButton type={"primary"} icon={<ArrowDownOutlined />}>
            Receive
          </TransferButton>
        </Flex>
      </Flex>
    </Card>
  );
};
