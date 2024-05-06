import { Flex, Form, Image } from "antd";
import {
  LoginButton,
  LoginCard,
  LoginInput,
  LoginText,
} from "../styles/renderComponents.ts";
import useFetch from "../hooks/useFetch.ts";
import { ApiUrl } from "../../settings.ts";
import { useUserBankingInfo } from "../context/UserBankingContext.tsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  const { post, get } = useFetch();
  const { updateUser, user } = useUserBankingInfo();
  const navigate = useNavigate();
  const loginUser = (values: { username: string; password: string }) => {
    post(ApiUrl + "login/", {
      data: { username: values.username, password: values.password },
    })
      .then(() => get(ApiUrl + "me/").then((response) => updateUser(response)))
      .then(() => navigate("/clientarea/"));
  };

  console.log(user);
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
          <Form.Item name={"username"}>
            <LoginText>Username</LoginText>
            <Form.Item name={"username"} noStyle>
              <LoginInput />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <LoginText>Password</LoginText>
            <Form.Item name={"password"} noStyle>
              <LoginInput />
            </Form.Item>
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
