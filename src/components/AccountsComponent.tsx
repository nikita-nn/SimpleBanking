import {
  AccountStyles,
  BaseCard,
  EditableText,
} from "../styles/renderComponents.ts";
import { Empty, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { useAccounts } from "../context/AccountsContext.tsx";
import { Account } from "../context/AccountTypes.ts";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const RenderAccount = ({ account }: { account: Account }) => {
  const navigate = useNavigate();
  const [viewAN, setViewAN] = useState(true);
  return (
    <Flex gap={"middle"}>
      <AccountStyles
        onClick={() => navigate(`/account/${account.account_number}/`)}
      >
        <Flex align={"center"} gap={"small"}>
          <EditableText size={1}>{account.name}</EditableText>
          <EditableText size={0.9} color={"gray"}>
            {viewAN
              ? `··${account.account_number.toString().slice(-4)}`
              : account.account_number}
          </EditableText>
        </Flex>
        <EditableText size={1.75}>
          {account.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $
        </EditableText>
      </AccountStyles>
      {viewAN ? (
        <EyeOutlined
          style={{ fontSize: "20px" }}
          onClick={() => setViewAN(!viewAN)}
        />
      ) : (
        <EyeInvisibleOutlined
          style={{ fontSize: "20px" }}
          onClick={() => setViewAN(!viewAN)}
        />
      )}
    </Flex>
  );
};

export const AccountsComponent = () => {
  const { accounts } = useAccounts();
  return (
    <BaseCard>
      <Flex vertical gap={"middle"}>
        <EditableText size={2} italic>
          Account Summary
        </EditableText>
        {accounts.length ? (
          accounts.map((account) => (
            <RenderAccount account={account} key={account.id} />
          ))
        ) : (
          <Empty />
        )}
      </Flex>
    </BaseCard>
  );
};
