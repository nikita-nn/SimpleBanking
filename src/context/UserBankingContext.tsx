import { createContext, useContext, ReactNode, useState } from "react";
import { User, UserBankingData } from "./UserTypes.ts";

const UserBankingContext = createContext<UserBankingData | null>(null);

export const UserBankingInfoProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  //const [accounts, setAccounts] = useState<[]>([]);
  //const [transactions, setTransactions] = useState<[]>([]);
  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

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
      value={{ user, accounts, transactions, updateUser }}
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
