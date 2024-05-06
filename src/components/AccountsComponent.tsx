import { AccountStyles, EditableText } from "../styles/renderComponents.ts";
import { Card, Flex, Typography } from "antd";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useUserBankingInfo } from "../context/UserBankingContext.tsx";

const Account = ({
  name,
  balance,
  accountNumber,
}: {
  name: string;
  balance: number;
  accountNumber: number;
}) => {
  const [viewAN, setViewAN] = useState(true);
  return (
    <AccountStyles>
      <Flex align={"center"} gap={"small"}>
        <EditableText size={1}>{name}</EditableText>
        <EditableText size={0.9} color={"gray"}>
          {viewAN ? `··${accountNumber.toString().slice(-4)}` : accountNumber}
        </EditableText>

        {viewAN ? (
          <EyeOutlined onClick={() => setViewAN(!viewAN)} />
        ) : (
          <EyeInvisibleOutlined onClick={() => setViewAN(!viewAN)} />
        )}
      </Flex>
      <EditableText size={1.25} strong>
        {balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $
      </EditableText>
    </AccountStyles>
  );
};

export const AccountsComponent = () => {
  const { accounts } = useUserBankingInfo();
  return (
    <Card>
      <Flex vertical gap={"middle"}>
        <Typography.Text style={{ fontSize: "2rem" }} italic>
          Account Summary
        </Typography.Text>
        {accounts.map((account) => (
          <Account
            key={account.id}
            name={account.name}
            balance={account.balance}
            accountNumber={account.account_number}
          />
        ))}
      </Flex>
    </Card>
  );
};
