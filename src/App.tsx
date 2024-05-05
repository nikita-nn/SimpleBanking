import { Layout } from "antd";
import { StyledMainLayout } from "./styles/renderComponents.ts";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./views/Login.tsx";
import ClientAreaView from "./views/ClientAreaView.tsx";

const App = () => {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
      path: "/",
      element: (
        <StyledMainLayout>
          <Layout.Content>
            <Outlet />
          </Layout.Content>
        </StyledMainLayout>
      ),
      children: [{ path: "/clientarea", element: <ClientAreaView /> }],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
