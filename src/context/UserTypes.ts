export interface UserBankingData {
  user: User | null;
  accounts: Account[];
  transactions: Transaction[];
  loginUser: (values: { username: string; password: string }) => void;
  logoutUser: () => void;
  createAccount: (
    name: string,
    type: "checking" | "savings" | "loan" | "credit_card",
  ) => void;
}

export interface RatesResponse {
  conversion_rates: {
    [key: string]: number;
  };
}

export interface Account {
  id: number;
  name: string;
  balance: number;
  type: string;
  account_number: number;
}

export interface Transaction {
  id: number;
  out: boolean;
  amount: number;
  to: number;
  from: number;
  internal?: boolean;
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}
