import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Progress,
  Row,
  Select,
  Typography,
} from "antd";
import { useState } from "react";
import { useAccounts } from "../context/AccountsContext.tsx";
import { SendTransaction } from "../context/AccountTypes.ts";

const TransferMoney = () => {
  const { accounts, sendTransaction } = useAccounts();
  const [externalForm] = Form.useForm();
  const [progressBarState, setProgressBarState] = useState<number>(0);

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
    <>
      <Flex vertical gap={"middle"}>
        <Typography.Title style={{ margin: 0 }}>
          Transfer Funds
        </Typography.Title>
        <Progress percent={progressBarState} type="line" showInfo={false} />
        <Row>
          <Col span={10}>
            <Typography.Title level={2}>Recipient Info</Typography.Title>
            <Form
              form={externalForm}
              onValuesChange={changeProgressBar}
              onFinish={onSend}
            >
              <Form.Item
                name="to_account"
                rules={[
                  {
                    required: true,
                    message: "Please enter the recipient name",
                  },
                ]}
              >
                <Input placeholder="Recipient Name" />
              </Form.Item>
              <Form.Item name={"from_account"}>
                <Select
                  options={accounts.map((account) => ({
                    value: account.account_number,
                    label:
                      account.type +
                      "  #" +
                      account.account_number +
                      ` (${account.name}) Available balance: ${account.balance}$ `,
                  }))}
                />
              </Form.Item>
              <Form.Item
                initialValue={0}
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
              <Form.Item name={"description"}>
                <Input />
              </Form.Item>
              <Button type={"primary"} htmlType={"submit"}>
                Transfer
              </Button>
            </Form>
          </Col>
          <Col span={12}></Col>
        </Row>
      </Flex>
    </>
  );
};

export default TransferMoney;
