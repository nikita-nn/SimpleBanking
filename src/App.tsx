import { BalanceCard } from "./components/BalanceCard.tsx";
import { Col, Layout, Row } from "antd";
import { StyledMainLayout } from "./styles/renderComponents.ts";
import { TransactionHistory } from "./components/TransactionHistory.tsx";
import { AccountsComponent } from "./components/AccountsComponent.tsx";

const App = () => {
  return (
    <StyledMainLayout>
      <Layout.Content>
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
      </Layout.Content>
    </StyledMainLayout>
  );
};

export default App;
