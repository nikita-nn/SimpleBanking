import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.ts";
import { ApiUrl } from "../../settings.ts";
import {
  AccountViewPanel,
  ActionPanelElement,
  EditableText,
} from "../styles/renderComponents.ts";
import { useAccounts } from "../context/AccountsContext.tsx";
import { Divider, Empty, Flex, Skeleton } from "antd";
import { RenderTransactions } from "../components/TransactionHistory.tsx";
import { Transaction } from "../context/AccountTypes.ts";
import { CloseOutlined } from "@ant-design/icons";

const AccountView = () => {
  const { id } = useParams();
  const { get } = useFetch();
  const { accounts, closeAccount } = useAccounts();
  const navigate = useNavigate();
  const [accountTransactions, setAccountTransactions] = useState<Transaction[]>(
    [],
  );

  useEffect(() => {
    get(
      ApiUrl + `transactions/transactions_account/?account_number=${id}`,
    ).then((response) => setAccountTransactions(response));
  }, []);

  const currentAccount = accounts.filter(
    (account) => account.account_number == Number(id),
  )[0];
  if (!currentAccount && id && accountTransactions) {
    return <Skeleton />;
  }
  return (
    <>
      <AccountViewPanel>
        <EditableText color={"white"} size={1.5}>
          {currentAccount.name} ··
          {currentAccount.account_number.toString().slice(-4)}
        </EditableText>
        <div className={"balance"}>
          <EditableText size={5} color={"white"}>
            {currentAccount.balance} $
          </EditableText>
        </div>
      </AccountViewPanel>
      <ActionPanelElement
        onClick={() => {
          closeAccount(currentAccount.id);
          navigate("/clientarea");
        }}
      >
        <CloseOutlined /> Close account
      </ActionPanelElement>
      <Flex
        vertical
        gap={"middle"}
        style={{ marginTop: "1rem", paddingLeft: "2rem" }}
      >
        <EditableText size={1.75}>Transactions</EditableText>
        <Divider style={{ marginTop: 0 }} />
      </Flex>
      {accountTransactions.length ? (
        <RenderTransactions transactions={accountTransactions} />
      ) : (
        <Empty style={{ height: "100vh", marginTop: "10vh" }} />
      )}
    </>
  );
};

export default AccountView;
