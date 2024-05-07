import { Layout, Skeleton } from "antd";
import { StyledLogo, StyledMainLayout } from "./styles/renderComponents.ts";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from "./views/Login.tsx";
import {
  UserBankingInfoProvider,
  useUserBankingInfo,
} from "./context/UserBankingContext.tsx";
import React from "react";
import AccountInfo from "./components/AccountInfo.tsx";

const ClientAreaComponent = React.lazy(
  () => import("./views/ClientAreaView.tsx"),
);

const TransferMoneyComponent = React.lazy(
  () => import("./views/TransferMoney.tsx"),
);

const AuthCheckComponent = () => {
  const { user } = useUserBankingInfo();
  return user ? <Navigate to={"/clientarea"} /> : <Navigate to={"/login"} />;
};

const App = () => {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
      path: "/",
      element: (
        <>
          <StyledLogo src={"/logo.svg"} preview={false} width={"30%"} />
          <StyledMainLayout>
            <Layout.Content>
              <Outlet />
            </Layout.Content>
          </StyledMainLayout>
        </>
      ),
      children: [
        { path: "/", element: <AuthCheckComponent /> },
        { path: "/clientarea", element: <ClientAreaComponent /> },
        { path: "/transfer", element: <TransferMoneyComponent /> },
        {
          path: "/account",
          children: [
            {
              path: ":id",
              element: <AccountInfo />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <React.Suspense fallback={<Skeleton />}>
      <UserBankingInfoProvider>
        <RouterProvider router={router} />
      </UserBankingInfoProvider>
    </React.Suspense>
  );
};

export default App;
