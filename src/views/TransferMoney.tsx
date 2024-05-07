import { useUserBankingInfo } from "../context/UserBankingContext.tsx";
import {
  Button,
  Col,
  Divider,
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

const TransferMoney = () => {
  const { accounts } = useUserBankingInfo();
  const [externalForm] = Form.useForm();
  const [progressBarState, setProgressBarState] = useState<number>(0);

  const changeProgressBar = (_: object, allValues: object) => {
    let filledFields = 0;
    Object.values(allValues).forEach((value) => {
      if (value != 0 && value != "") {
        filledFields++;
      }
    });
    const fieldsCount = 3;

    setProgressBarState((filledFields * 100) / fieldsCount);
  };

  return (
    <>
      <Flex vertical gap={"middle"}>
        <Typography.Title style={{ margin: 0 }}>
          Transfer Funds
        </Typography.Title>
        <Progress percent={progressBarState} type="line" showInfo={false} />
        <Row>
          <Col span={10}>
            <Divider />
            <Typography.Title level={2}>Recipient Info</Typography.Title>
            <Form
              form={externalForm}
              onValuesChange={changeProgressBar}
              onFinish={(values) => console.log(values)}
            >
              <Form.Item
                initialValue={""}
                name="recipient"
                rules={[
                  {
                    required: true,
                    message: "Please enter the recipient name",
                  },
                ]}
              >
                <Input placeholder="Recipient Name" />
              </Form.Item>
              <Form.Item
                initialValue={0}
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Please enter the amount to transfer",
                  },
                ]}
              >
                <InputNumber placeholder="Amount" min={0} addonAfter={"$"} />
              </Form.Item>
              <Form.Item name={"sending_account"}>
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
