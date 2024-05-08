import { Row } from "antd";
import { BalanceCard } from "../components/BalanceCard.tsx";
import { AccountsComponent } from "../components/AccountsComponent.tsx";
import { useUserBankingInfo } from "../context/UserBankingContext.tsx";
import { Navigate } from "react-router-dom";
import { TransactionHistory } from "../components/TransactionHistory.tsx";
import { ClientAreaCol } from "../styles/renderComponents.ts";

const ClientAreaView = () => {
  const { user } = useUserBankingInfo();
  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Row gutter={[16, 8]}>
      <ClientAreaCol span={8} md={24} lg={12} xl={8}>
        <BalanceCard />
        <AccountsComponent />
      </ClientAreaCol>
      <ClientAreaCol span={8} md={24} lg={12} xl={8}>
        <TransactionHistory />
      </ClientAreaCol>
    </Row>
  );
};

export default ClientAreaView;
