import { Layout } from "antd";
import { StyledLogo, StyledMainLayout } from "./styles/renderComponents.ts";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./views/Login.tsx";
import ClientAreaView from "./views/ClientAreaView.tsx";
import { UserBankingInfoProvider } from "./context/UserBankingContext.tsx";

const App = () => {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
      path: "/",
      element: (
        <>
          <StyledLogo src={"./public/logo.svg"} preview={false} width={"30%"} />
          <StyledMainLayout>
            <Layout.Content>
              <Outlet />
            </Layout.Content>
          </StyledMainLayout>
        </>
      ),
      children: [{ path: "/clientarea", element: <ClientAreaView /> }],
    },
  ]);
  return (
    <UserBankingInfoProvider>
      <RouterProvider router={router} />
    </UserBankingInfoProvider>
  );
};

export default App;
