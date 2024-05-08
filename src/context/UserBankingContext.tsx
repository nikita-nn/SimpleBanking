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

const UserBankingInfoProvider = ({ children }: { children: ReactNode }) => {
  const { get, post } = useFetch();
  const [user, setUser] = useState<User | null>(null);

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
    reloadUser();
  }, []);

  return (
    <UserBankingContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserBankingContext.Provider>
  );
};

const useUserBankingInfo = () => {
  const context = useContext(UserBankingContext);
  if (!context) {
    throw new Error(
      "useUserBankingInfo must be used within a UserBankingContextProvider",
    );
  }
  return context;
};

export { useUserBankingInfo, UserBankingInfoProvider };
