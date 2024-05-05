import { Button, Col, Form, Input, Row } from "antd";
import { EditableText, LoginCard } from "../styles/renderComponents.ts";
import { UserOutlined } from "@ant-design/icons";

const Login = () => {
  const [form] = Form.useForm();
  return (
    <LoginCard>
      <Row>
        <Col span={10}>
          <EditableText size={2}>
            <UserOutlined /> Welcome to <br /> online-banking
          </EditableText>
        </Col>
        <Col span={13}>
          <Form form={form}>
            <Form.Item required label={"Username"} name={"username"}>
              <Input required />
            </Form.Item>
            <Form.Item required label={"Password"} name={"password"}>
              <Input />
            </Form.Item>
            <Button htmlType={"submit"} type={"primary"}>
              Log in
            </Button>
          </Form>
        </Col>
      </Row>
    </LoginCard>
  );
};

export default Login;
