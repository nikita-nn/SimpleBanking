import { Row } from "antd";
import { BalanceCard } from "../components/BalanceCard.tsx";
import { AccountsComponent } from "../components/AccountsComponent.tsx";
import { useUserBankingInfo } from "../context/UserBankingContext.tsx";
import { Navigate } from "react-router-dom";
import { TransactionHistory } from "../components/TransactionHistory.tsx";
import { ClientAreaCol } from "../styles/renderComponents.ts";
import FinancialChart from "../components/FinancialChart.tsx";
import TransferMoney from "./TransferMoney.tsx";
import ActionCard from "./ActionCard.tsx";
import OpenAccount from "../components/OpenAccount.tsx";

const ClientAreaView = () => {
  const { user } = useUserBankingInfo();
  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Row gutter={[16, 8]} style={{ padding: "3rem" }}>
      <ClientAreaCol span={8} md={24} lg={12} xl={7}>
        <BalanceCard />
        <ActionCard />
        <AccountsComponent />
      </ClientAreaCol>
      <ClientAreaCol span={8} md={24} lg={12} xl={10}>
        <TransactionHistory />
        <FinancialChart />
      </ClientAreaCol>{" "}
      <ClientAreaCol span={8} md={24} lg={12} xl={7}>
        <TransferMoney />
        <OpenAccount />
      </ClientAreaCol>
    </Row>
  );
};

export default ClientAreaView;
