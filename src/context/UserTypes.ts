export interface UserBankingData {
  user: User | null;
  loginUser: (values: { username: string; password: string }) => void;
  logoutUser: () => void;
}

export interface RatesResponse {
  conversion_rates: {
    [key: string]: number;
  };
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  last_login: string;
}
