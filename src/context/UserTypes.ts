export interface UserBankingData {
  user: User | null;
  accounts: Account[];
  transactions: Transaction[];
  updateUser: (newUser: User) => void;
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
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}
