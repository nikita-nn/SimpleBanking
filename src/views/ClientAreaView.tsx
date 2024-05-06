import { Col, Row, Skeleton, Typography } from "antd";
import { BalanceCard } from "../components/BalanceCard.tsx";
import { AccountsComponent } from "../components/AccountsComponent.tsx";
import { TransactionHistory } from "../components/TransactionHistory.tsx";
import { useUserBankingInfo } from "../context/UserBankingContext.tsx";

const ClientAreaView = () => {
  const { user, accounts } = useUserBankingInfo();

  if (!user) {
    return <Skeleton />;
  }

  return (
    <>
      <Typography.Title style={{ marginTop: 0 }}>
        Welcome back {user?.first_name} {user?.last_name}!
      </Typography.Title>
      <Row gutter={16}>
        <Col
          span={8}
          style={{ display: "flex", gap: "1rem", flexDirection: "column" }}
        >
          <BalanceCard accounts={accounts} />
          <AccountsComponent />
        </Col>
        <Col span={16}>
          <TransactionHistory />
        </Col>
      </Row>
    </>
  );
};

export default ClientAreaView;
