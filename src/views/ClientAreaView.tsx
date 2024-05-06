import { Col, Row, Typography } from "antd";
import { BalanceCard } from "../components/BalanceCard.tsx";
import { AccountsComponent } from "../components/AccountsComponent.tsx";
import { TransactionHistory } from "../components/TransactionHistory.tsx";

const ClientAreaView = () => {
  return (
    <>
      <Typography.Title style={{ marginTop: 0 }}>
        Welcome back Nikita!
      </Typography.Title>
      <Row gutter={16}>
        <Col
          span={8}
          style={{ display: "flex", gap: "1rem", flexDirection: "column" }}
        >
          <BalanceCard usdBalance={50} />
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
