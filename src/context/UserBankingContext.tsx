import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { User, UserBankingData } from "./UserTypes.ts";
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
  //const [accounts, setAccounts] = useState<[]>([]);
  //const [transactions, setTransactions] = useState<[]>([]);
  const reloadUser = () => {
    get(ApiUrl + "me/").then((response) => setUser(response));
  };

  const loginUser = (values: { username: string; password: string }) => {
    post(ApiUrl + "login/", {
      data: { username: values.username, password: values.password },
    }).then(reloadUser);
  };

  const logoutUser = () => {
    post(ApiUrl + "logout/")
      .then(() => setUser(null))
      .then(() => {
        return <Navigate to={"/login"} />;
      });
  };

  useEffect(() => {
    get(ApiUrl + "me/").then((response) => setUser(response));
  }, []);

  const transactions = [
    {
      id: 21321,
      out: true,
      amount: 50,
      to: 33333,
      from: 11111,
    },
    {
      id: 21322,
      out: false,
      amount: 75,
      to: 11111,
      from: 33333,
    },
    {
      id: 21323,
      out: true,
      amount: 20,
      to: 44444,
      from: 11111,
    },
    {
      id: 21324,
      out: false,
      amount: 100,
      to: 11111,
      from: 55555,
    },
    {
      id: 21325,
      out: true,
      amount: 200,
      to: 66666,
      from: 11111,
    },
    {
      id: 21324,
      out: false,
      amount: 100,
      to: 11111,
      from: 55555,
    },
    {
      id: 21325,
      out: true,
      amount: 200,
      to: 66666,
      from: 11111,
    },
    {
      id: 21324,
      out: false,
      amount: 100,
      to: 11111,
      from: 55555,
    },
    {
      id: 21325,
      out: true,
      amount: 200,
      to: 66666,
      from: 11111,
    },
    {
      id: 21324,
      out: false,
      amount: 100,
      to: 11111,
      from: 55555,
    },
    {
      id: 21325,
      out: true,
      amount: 200,
      to: 66666,
      from: 11111,
    },
    {
      id: 21324,
      out: false,
      amount: 100,
      to: 11111,
      from: 55555,
    },
    {
      id: 21325,
      out: true,
      amount: 200,
      to: 66666,
      from: 11111,
    },
    {
      id: 21324,
      out: false,
      amount: 100,
      to: 11111,
      from: 55555,
    },
    {
      id: 21325,
      out: true,
      amount: 200,
      to: 66666,
      from: 11111,
    },
  ];

  const accounts = [
    {
      id: 1,
      name: "My checking",
      balance: 4000,
      type: "checking",
      account_number: 123456789,
    },
    {
      id: 2,
      name: "My loan",
      balance: -600,
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

  return (
    <UserBankingContext.Provider
      value={{ user, accounts, transactions, loginUser, logoutUser }}
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
