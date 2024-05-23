import {
  Button,
  Card,
  Flex,
  Form,
  Input,
  InputNumber,
  Progress,
  Segmented,
  Select,
} from "antd";
import { useState } from "react";
import { useAccounts } from "../context/AccountsContext.tsx";
import { SendTransaction } from "../context/AccountTypes.ts";
import { EditableText } from "../styles/renderComponents.ts";

const TransferMoney = () => {
  const { accounts, sendTransaction } = useAccounts();
  const [externalForm] = Form.useForm();
  const [progressBarState, setProgressBarState] = useState<number>(0);
  const [isInternal, setIsInternal] = useState(true);
  const changeProgressBar = (_: object, allValues: object) => {
    let filledFields = 0;
    Object.values(allValues).forEach((value) => {
      if (value != 0 && value != "" && value) {
        filledFields++;
      }
    });
    const fieldsCount = 4;

    setProgressBarState((filledFields * 100) / fieldsCount);
  };
  const onSend = (values: SendTransaction) =>
    sendTransaction({
      transaction_type: "transfer",
      amount: values.amount,
      from_account: values.from_account,
      to_account: values.to_account,
      description: values.description,
      internal: false,
    });
  return (
    <Card>
      <Flex vertical gap={"middle"}>
        <EditableText size={2} italic>
          Transfer Funds
        </EditableText>
        <Progress percent={progressBarState} type="line" showInfo={false} />
        <Form
          layout="vertical"
          form={externalForm}
          onValuesChange={changeProgressBar}
          onFinish={onSend}
        >
          <Form.Item>
            <Segmented
              options={[
                { label: "Internal", value: true },
                { label: "External", value: false },
              ]}
              onChange={(value) => {
                externalForm.resetFields();
                setIsInternal(value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="to_account"
            label={"To account:"}
            rules={[
              {
                required: true,
                message: "Please enter the recipient acct. number",
              },
            ]}
          >
            {isInternal ? (
              <Select
                options={accounts.map((account) => ({
                  value: account.account_number,
                  label: ` ${account.name} Available balance: ${account.balance}$ `,
                }))}
              />
            ) : (
              <Input placeholder="Recipient account number" />
            )}
          </Form.Item>
          <Form.Item name={"from_account"} label={"From account:"} required>
            <Select
              options={accounts.map((account) => ({
                value: account.account_number,
                label: ` ${account.name} Available balance: ${account.balance}$ `,
              }))}
            />
          </Form.Item>
          <Form.Item
            initialValue={0}
            label={"Amount:"}
            required
            name={"amount"}
            rules={[
              {
                required: true,
                message: "Please enter the amount to transfer",
              },
            ]}
          >
            <InputNumber placeholder="Amount" min={0} addonAfter={"$"} />
          </Form.Item>
          <Form.Item
            name={"description"}
            label={"Comment:"}
            rules={[
              {
                max: 25,
                message: "Description cannot be longer than 25 characters",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type={"primary"} htmlType={"submit"}>
            Transfer
          </Button>
        </Form>
      </Flex>
    </Card>
  );
};

export default TransferMoney;
