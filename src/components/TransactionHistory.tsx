import { Flex } from "antd";
import {
  BaseCard,
  EditableText,
  TransactionStyles,
} from "../styles/renderComponents.ts";
import dayjs from "dayjs";
import { useAccounts } from "../context/AccountsContext.tsx";
import { Transaction } from "../context/AccountTypes.ts";

export const RenderTransactions = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <div>
      {transactions.map((transaction) => (
        <TransactionStyles>
          <Flex gap={"large"} align={"center"}>
            <EditableText size={1.25}>
              {dayjs(transaction.date).format("DD MMMM")}
            </EditableText>
            <Flex vertical>
              <EditableText size={1.12} color={"gray"}>
                {transaction.internal ? "INTERNAL" : "EXTERNAL"}{" "}
                {transaction.transaction_type.toUpperCase()}
              </EditableText>
              {transaction.description && (
                <EditableText size={1} italic>
                  «{transaction.description}»
                </EditableText>
              )}
            </Flex>
          </Flex>
          <EditableText
            size={1.5}
            color={
              transaction.transaction_type == "deposit" ? "#5d986c" : "#b05041"
            }
          >
            {transaction.transaction_type == "deposit" ? "+" : "-"}
            {transaction.amount}$
          </EditableText>
        </TransactionStyles>
      ))}
    </div>
  );
};
export const TransactionHistory = () => {
  const { transactions } = useAccounts();

  return (
    <BaseCard>
      <Flex vertical gap={"middle"}>
        <EditableText size={2} italic>
          Recent Transactions
        </EditableText>
        <RenderTransactions transactions={transactions} />
      </Flex>
    </BaseCard>
  );
};
