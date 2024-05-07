import { Flex, Form, Image } from "antd";
import {
  LoginButton,
  LoginCard,
  LoginInput,
  LoginText,
} from "../styles/renderComponents.ts";
import { useNavigate } from "react-router-dom";
import { useUserBankingInfo } from "../context/UserBankingContext.tsx";
import { useEffect } from "react";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user, loginUser } = useUserBankingInfo();

  useEffect(() => {
    if (user) {
      navigate("/clientarea");
    }
  }, [user, navigate]);

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
        <Form form={form} onFinish={(values) => loginUser(values)}>
          <Form.Item>
            <LoginText>Username</LoginText>
            <Form.Item name={"username"} noStyle>
              <LoginInput />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Form.Item name={"password"} noStyle>
              <LoginInput />
            </Form.Item>
            <LoginText>Password</LoginText>
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
