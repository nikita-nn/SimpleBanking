import { BaseCard, EditableText } from "../styles/renderComponents.ts";
import { Button, Flex, Form, Input, Segmented } from "antd";
import { useAccounts } from "../context/AccountsContext.tsx";

const OpenAccount = () => {
  const [accountOpenForm] = Form.useForm();
  const { createAccount } = useAccounts();
  const onFinish = (values: {
    account_type: "checking" | "savings" | "loan" | "credit_card";
    account_name: string;
  }) => {
    createAccount(values.account_name, values.account_type);
  };
  return (
    <BaseCard>
      <Flex vertical gap={"middle"}>
        <EditableText size={2} italic>
          Open new account
        </EditableText>
        <Form form={accountOpenForm} layout={"vertical"} onFinish={onFinish}>
          <Form.Item name={"account_name"} label={"Account name"} required>
            <Input />
          </Form.Item>
          <Form.Item
            name={"account_type"}
            label={"Account type"}
            required
            initialValue={"checking"}
          >
            <Segmented
              options={[
                { value: "savings", label: "Savings" },
                { value: "checking", label: "Checking" },
              ]}
            />
          </Form.Item>
          <Button type={"primary"} htmlType={"submit"}>
            Open new account
          </Button>
        </Form>
      </Flex>
    </BaseCard>
  );
};

export default OpenAccount;
