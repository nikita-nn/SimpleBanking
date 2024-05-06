import { Flex, Form, Image } from "antd";
import {
  LoginButton,
  LoginCard,
  LoginInput,
  LoginText,
} from "../styles/renderComponents.ts";

const Login = () => {
  const [form] = Form.useForm();
  return (
    <Flex
      vertical
      align={"center"}
      justify={"center"}
      gap={"large"}
      style={{ height: "100%" }}
    >
      <Image src={"/logo.svg"} width={"25%"} preview={false} />
      <LoginCard>
        <Form form={form} onFinish={(values) => console.log(values)}>
          <Form.Item name={"username"}>
            <LoginText>Username</LoginText>
            <LoginInput />
          </Form.Item>
          <Form.Item name={"password"}>
            <LoginText>Password</LoginText>
            <LoginInput type={"password"} />
          </Form.Item>
          <LoginButton htmlType={"submit"} type={"primary"}>
            Log me in
          </LoginButton>
        </Form>
      </LoginCard>
    </Flex>
  );
};

export default Login;
