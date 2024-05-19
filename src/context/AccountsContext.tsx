import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Account, AccountsData, SendTransaction } from "./AccountTypes.ts";
import { ApiUrl } from "../../settings.ts";
import useFetch from "../hooks/useFetch.ts";
const AccountsContext = createContext<AccountsData | null>(null);

export const AccountsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { get, post } = useFetch();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<[]>([]);

  useEffect(() => {
    reloadAccounts();
    reloadTransactions();
  }, []);

  const reloadAccounts = () => {
    get(ApiUrl + "accounts/").then((response) => setAccounts(response));
  };

  const reloadTransactions = () => {
    get(ApiUrl + "transactions/last_transactions/").then((response) =>
      setTransactions(response),
    );
  };
  const createAccount = (
    name: string,
    type: "checking" | "savings" | "loan" | "credit_card",
  ) => {
    post(ApiUrl + "accounts/", { data: { name: name, type: type } }).then(
      reloadAccounts,
    );
  };

  const sendTransaction = (transaction: SendTransaction) => {
    post(ApiUrl + "transactions/", { data: transaction })
      .then(reloadAccounts)
      .then(reloadTransactions);
  };
  return (
    <AccountsContext.Provider
      value={{
        accounts,
        transactions,
        createAccount,
        sendTransaction,
        reloadAccounts,
        reloadTransactions,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
};

export const useAccounts = () => {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error(
      "useAccounts must be used within a AccountsContextProvider",
    );
  }
  return context;
};
