import { Flex } from "antd";
import {
  BaseCard,
  EditableText,
  TransactionStyles,
} from "../styles/renderComponents.ts";
import dayjs from "dayjs";
import { useAccounts } from "../context/AccountsContext.tsx";

export const TransactionHistory = () => {
  const { transactions } = useAccounts();

  return (
    <BaseCard>
      <Flex vertical gap={"middle"}>
        <EditableText size={2} italic>
          Recent Transactions
        </EditableText>
        <div>
          {transactions.map((transaction) => (
            <TransactionStyles>
              <Flex gap={"large"} align={"center"}>
                <EditableText size={1.25}>
                  {dayjs(transaction.date).format("DD MMMM")}
                </EditableText>
                <EditableText size={1.12} color={"gray"}>
                  {transaction.internal ? "INTERNAL" : "EXTERNAL"}{" "}
                  {transaction.transaction_type.toUpperCase()}
                </EditableText>
              </Flex>
              <EditableText
                size={1.5}
                color={
                  transaction.transaction_type == "deposit"
                    ? "#5d986c"
                    : "#b05041"
                }
              >
                {transaction.transaction_type == "deposit" ? "+" : "-"}
                {transaction.amount}$
              </EditableText>
            </TransactionStyles>
          ))}
        </div>
      </Flex>
    </BaseCard>
  );
};
