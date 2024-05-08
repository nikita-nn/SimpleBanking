import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  Account,
  SendTransaction,
  User,
  UserBankingData,
} from "./UserTypes.ts";
import useFetch from "../hooks/useFetch.ts";
import { ApiUrl } from "../../settings.ts";
import { Navigate } from "react-router-dom";

const UserBankingContext = createContext<UserBankingData | null>(null);

export const UserBankingInfoProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { get, post } = useFetch();
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<[]>([]);
  const reloadUser = () => {
    get(ApiUrl + "me/").then((response) => setUser(response));
  };

  const reloadData = () => {
    reloadUser();
    reloadAccounts();
  };

  const loginUser = (values: { username: string; password: string }) => {
    post(ApiUrl + "login/", {
      data: { username: values.username, password: values.password },
    }).then(reloadData);
  };

  const sendTransaction = (transaction: SendTransaction) => {
    post(ApiUrl + "transactions/", { data: transaction }).then(reloadAccounts);
  };

  const logoutUser = () => {
    post(ApiUrl + "logout/")
      .then(() => setUser(null))
      .then(() => {
        return <Navigate to={"/login"} />;
      });
  };

  useEffect(() => {
    reloadData();
  }, []);

  const reloadAccounts = () => {
    get(ApiUrl + "accounts/").then((response) => setAccounts(response));
    get(ApiUrl + "transactions/last_transactions").then((response) => setTransactions(response));
  };
  const createAccount = (
    name: string,
    type: "checking" | "savings" | "loan" | "credit_card",
  ) => {
    post(ApiUrl + "accounts/", { data: { name: name, type: type } }).then(
      reloadAccounts,
    );
  };

  return (
    <UserBankingContext.Provider
      value={{
        user,
        accounts,
        transactions,
        loginUser,
        logoutUser,
        createAccount,
        sendTransaction,
      }}
    >
      {children}
    </UserBankingContext.Provider>
  );
};

export const useUserBankingInfo = () => {
  const context = useContext(UserBankingContext);
  if (!context) {
    throw new Error(
      "useUserBankingInfo must be used within a UserBankingContextProvider",
    );
  }
  return context;
};
