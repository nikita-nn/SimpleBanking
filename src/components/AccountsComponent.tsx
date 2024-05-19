import {
  AccountStyles,
  BaseCard,
  EditableText,
} from "../styles/renderComponents.ts";
import { Empty, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { useAccounts } from "../context/AccountsContext.tsx";
import { Account } from "../context/AccountTypes.ts";

const RenderAccount = ({ account }: { account: Account }) => {
  const navigate = useNavigate();
  return (
    <AccountStyles
      onClick={() => navigate(`/account/${account.account_number}/`)}
    >
      <Flex align={"center"} gap={"small"}>
        <EditableText size={1}>{account.name}</EditableText>
        <EditableText size={0.9} color={"gray"}>
          ··{account.account_number.toString().slice(-4)}
        </EditableText>
      </Flex>
      <EditableText size={1.75}>
        {account.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $
      </EditableText>
    </AccountStyles>
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
