import {
  BaseCard,
  EditableText,
  StyledLink,
} from "../styles/renderComponents.ts";
import { Flex } from "antd";
import {
  PaperClipOutlined,
  PlusOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { useUserBankingInfo } from "../context/UserBankingContext.tsx";

const ActionCard = () => {
  const { logoutUser } = useUserBankingInfo();
  return (
    <BaseCard>
      <Flex vertical gap={"middle"}>
        <EditableText size={2} italic>
          I want to...
        </EditableText>
        <StyledLink to={"/"}>
          <PaperClipOutlined /> Get a statement
        </StyledLink>
        <StyledLink onClick={logoutUser} to={"/login"}>
          <UserDeleteOutlined /> Log Out
        </StyledLink>
        <StyledLink onClick={logoutUser} to={"/login"}>
          <PlusOutlined /> Open an account
        </StyledLink>
      </Flex>
    </BaseCard>
  );
};

export default ActionCard;
