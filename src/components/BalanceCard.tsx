import { Card, Flex, Segmented, Typography } from "antd";
import { TransferButton } from "../styles/renderComponents.ts";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

export const BalanceCard = ({ usdBalance }: { usdBalance: number }) => {
  return (
    <Card style={{ padding: "0.5rem" }}>
      <Flex vertical gap={"middle"}>
        <Typography.Text style={{ fontSize: "2rem" }} italic>
          Balance Overview
        </Typography.Text>
        <Typography.Text style={{ fontSize: "4rem" }}>
          {usdBalance} $
        </Typography.Text>
        <Segmented
          options={["USD", "RUB", "EUR", "AUD", "BTC", "ETH"]}
          onChange={(value) => console.log(value)}
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
