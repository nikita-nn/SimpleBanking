import { Card, Flex, List } from "antd";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import { EditableText, TransactionStyles } from "../styles/renderComponents.ts";
import { useUserBankingInfo } from "../context/UserBankingContext.tsx";

export const TransactionHistory = () => {
  const { transactions } = useUserBankingInfo();

  return (
    <Card style={{ padding: "0 0.5rem 0.5rem 0.5rem" }}>
      <Flex vertical gap={"middle"}>
        <EditableText size={2} italic>
          Transaction history
        </EditableText>
        <List
          itemLayout="horizontal"
          dataSource={transactions}
          renderItem={(transaction) => (
            <List.Item>
              <TransactionStyles>
                {transaction.out ? (
                  <UpCircleOutlined />
                ) : (
                  <DownCircleOutlined />
                )}
                <EditableText color={"gray"} size={1}>
                  Internal transfer #{transaction.id} to acct. #{transaction.to}{" "}
                  from acct. #{transaction.from}
                </EditableText>
              </TransactionStyles>
            </List.Item>
          )}
        />
      </Flex>
    </Card>
  );
};
