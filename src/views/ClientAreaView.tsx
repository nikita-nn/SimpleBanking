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
    <>
      <Row gutter={[16, 8]} style={{ padding: "3rem" }}>
        <ClientAreaCol span={9} md={24} lg={12} xl={9}>
          <BalanceCard />
          <ActionCard />
          <AccountsComponent />
          <FinancialChart />
        </ClientAreaCol>
        <ClientAreaCol span={16} md={24} lg={12} xl={15}>
          <TransactionHistory />
          <Row gutter={[16, 8]}>
            <ClientAreaCol span={12} md={24} lg={12} xl={12}>
              <OpenAccount />
            </ClientAreaCol>
            <ClientAreaCol span={12} md={24} lg={12} xl={12}>
              <TransferMoney />
            </ClientAreaCol>
          </Row>
        </ClientAreaCol>
      </Row>
    </>
  );
};

export default ClientAreaView;
