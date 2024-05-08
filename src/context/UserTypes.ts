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
  sendTransaction: (transaction: SendTransaction) => void;
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
  date: string;
  amount: string;
  transaction_type: string;
  description: string;
  internal: boolean;
  from_account: number;
  to_account: number;
}

export interface SendTransaction {
  transaction_type: "deposit" | "withdrawal" | "transfer";
  amount: number;
  from_account: string;
  to_account: string;
  internal: boolean;
  description: string;
}
export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}
