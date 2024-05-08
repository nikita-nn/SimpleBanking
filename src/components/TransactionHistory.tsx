import { Card, Flex} from "antd";
import { EditableText} from "../styles/renderComponents.ts";
import { useUserBankingInfo } from "../context/UserBankingContext.tsx";


const RenderTransaction = (transaction: Transaction[]) => {

}
export const TransactionHistory = () => {
  const { transactions } = useUserBankingInfo();

  return (
    <Card style={{ padding: "0 0.5rem 0.5rem 0.5rem" }}>
      <Flex vertical gap={"middle"}>
        <EditableText size={2} italic>
         Recent Transactions
        </EditableText>
          <
      </Flex>
    </Card>
  );
};
