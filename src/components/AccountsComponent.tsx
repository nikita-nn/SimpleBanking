import { AccountStyles, EditableText } from "../styles/renderComponents.ts";
import { Card, Flex, Typography } from "antd";
import { useUserBankingInfo } from "../context/UserBankingContext.tsx";
import { Account } from "../context/UserTypes.ts";
import { useNavigate } from "react-router-dom";

const RenderAccount = ({ account }: { account: Account }) => {
  const navigate = useNavigate();
  return (
    <AccountStyles onClick={() => navigate(`/account/${account.id}/`)}>
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
  const { accounts } = useUserBankingInfo();
  return (
    <Card>
      <Flex vertical gap={"middle"}>
        <Typography.Text style={{ fontSize: "2rem" }} italic>
          Account Summary
        </Typography.Text>
        {accounts.map((account) => (
          <RenderAccount account={account} />
        ))}
      </Flex>
    </Card>
  );
};
