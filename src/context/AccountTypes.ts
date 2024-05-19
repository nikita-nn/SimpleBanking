export interface AccountsData {
  createAccount: (
    name: string,
    type: "checking" | "savings" | "loan" | "credit_card",
  ) => void;
  sendTransaction: (transaction: SendTransaction) => void;
  accounts: Account[];
  transactions: Transaction[];
  reloadAccounts: () => void;
  reloadTransactions: () => void;
  closeAccount: (accountId: number) => void;
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
