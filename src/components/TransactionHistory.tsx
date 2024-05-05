import { Card, Flex, List } from "antd";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import { EditableText, TransactionStyles } from "../styles/renderComponents.ts";

const Transaction = ({
  isOut,
  to,
  from,
  id,
}: {
  isOut: boolean;
  amount: number;
  to: number;
  from: number;
  id: number;
}) => {
  return (
    <TransactionStyles>
      {isOut ? <UpCircleOutlined /> : <DownCircleOutlined />}
      <EditableText color={"gray"} size={1}>
        Transaction #{id} to acct. #{to} from acct. #{from}
      </EditableText>
    </TransactionStyles>
  );
};

const transactions = [
  {
    id: 21321,
    out: true,
    amount: 50,
    to: 33333,
    from: 11111,
  },
  {
    id: 21322,
    out: false,
    amount: 75,
    to: 11111,
    from: 33333,
  },
  {
    id: 21323,
    out: true,
    amount: 20,
    to: 44444,
    from: 11111,
  },
  {
    id: 21324,
    out: false,
    amount: 100,
    to: 11111,
    from: 55555,
  },
  {
    id: 21325,
    out: true,
    amount: 200,
    to: 66666,
    from: 11111,
  },
  {
    id: 21324,
    out: false,
    amount: 100,
    to: 11111,
    from: 55555,
  },
  {
    id: 21325,
    out: true,
    amount: 200,
    to: 66666,
    from: 11111,
  },
  {
    id: 21324,
    out: false,
    amount: 100,
    to: 11111,
    from: 55555,
  },
  {
    id: 21325,
    out: true,
    amount: 200,
    to: 66666,
    from: 11111,
  },
  {
    id: 21324,
    out: false,
    amount: 100,
    to: 11111,
    from: 55555,
  },
  {
    id: 21325,
    out: true,
    amount: 200,
    to: 66666,
    from: 11111,
  },
  {
    id: 21324,
    out: false,
    amount: 100,
    to: 11111,
    from: 55555,
  },
  {
    id: 21325,
    out: true,
    amount: 200,
    to: 66666,
    from: 11111,
  },
  {
    id: 21324,
    out: false,
    amount: 100,
    to: 11111,
    from: 55555,
  },
  {
    id: 21325,
    out: true,
    amount: 200,
    to: 66666,
    from: 11111,
  },
];
export const TransactionHistory = () => {
  return (
    <Card style={{ padding: "0 0.5rem 0.5rem 0.5rem" }}>
      <Flex vertical gap={"middle"}>
        <EditableText size={2} italic>
          Transaction history
        </EditableText>
        <List
          itemLayout="horizontal"
          dataSource={transactions}
          renderItem={(item) => (
            <List.Item>
              <Transaction
                id={item.id}
                isOut={item.out}
                amount={item.amount}
                to={item.to}
                from={item.from}
              />
            </List.Item>
          )}
        />
      </Flex>
    </Card>
  );
};
