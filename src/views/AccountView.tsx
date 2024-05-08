import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useFetch from "../hooks/useFetch.ts";
import { ApiUrl } from "../../settings.ts";
import { AccountViewPanel, EditableText } from "../styles/renderComponents.ts";
import { useAccounts } from "../context/AccountsContext.tsx";
import { Skeleton } from "antd";

const AccountView = () => {
  const { id } = useParams();
  const { get } = useFetch();
  const { accounts } = useAccounts();

  useEffect(() => {
    get(ApiUrl + `transactions/transactions_account?account_number=${id}`);
  }, []);

  if (!accounts && id) {
    return <Skeleton />;
  }

  const currentAccount = accounts.filter(
    (account) => account.account_number == Number(id),
  )[0];

  return (
    <AccountViewPanel>
      <EditableText size={2}>{currentAccount.account_number}</EditableText>
    </AccountViewPanel>
  );
};

export default AccountView;
