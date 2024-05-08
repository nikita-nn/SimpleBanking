import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.ts";
import { ApiUrl } from "../../settings.ts";
import {
  AccountViewPanel,
  EditableText,
} from "../styles/renderComponents.ts";
import { useAccounts } from "../context/AccountsContext.tsx";
import { Skeleton } from "antd";
import { RenderTransactions } from "../components/TransactionHistory.tsx";
import { Transaction } from "../context/AccountTypes.ts";

const AccountView = () => {
  const { id } = useParams();
  const { get } = useFetch();
  const { accounts } = useAccounts();
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

      <RenderTransactions transactions={accountTransactions} />
    </>
  );
};

export default AccountView;
