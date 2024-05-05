import { AccountStyles, EditableText } from "../styles/renderComponents.ts";
import { Card, Flex, Typography } from "antd";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const objects = [
  {
    id: 1,
    name: "My checking",
    balance: 5000,
    type: "checking",
    account_number: 123456789,
  },
  {
    id: 2,
    name: "My loan",
    balance: -7200,
    type: "loan",
    account_number: 987654321,
  },
  {
    id: 3,
    name: "My savings",
    balance: 3100,
    type: "savings",
    account_number: 456789123,
  },
];

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
  return (
    <Card>
      <Flex vertical gap={"middle"}>
        <Typography.Text style={{ fontSize: "2rem" }} italic>
          Account Summary
        </Typography.Text>
        {objects.map((account) => (
          <Account
            name={account.name}
            balance={account.balance}
            accountNumber={account.account_number}
          />
        ))}
      </Flex>
    </Card>
  );
};
