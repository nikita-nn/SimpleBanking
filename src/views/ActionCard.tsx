import {
  BaseCard,
  EditableText,
  StyledLink,
} from "../styles/renderComponents.ts";
import { Flex } from "antd";
import { PaperClipOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { useUserBankingInfo } from "../context/UserBankingContext.tsx";
import { getCookie } from "../hooks/useFetch.ts";
import { ApiUrl } from "../../settings.ts";

const ActionCard = () => {
  const { logoutUser } = useUserBankingInfo();

  const downloadStatement = async () => {
    try {
      const response = await fetch(ApiUrl + "transactions/generate_statement", {
        method: "GET",
        credentials: "include",
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transaction_statement.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("There was an error downloading the statement:", error);
    }
  };

  return (
    <BaseCard>
      <Flex vertical gap={"middle"}>
        <EditableText size={2} italic>
          I want to...
        </EditableText>
        <Flex
          vertical
          gap={"middle"}
          align={"start"}
          style={{ marginLeft: "-1.25rem" }}
        >
          <StyledLink type={"link"} onClick={downloadStatement}>
            <PaperClipOutlined /> Get a statement
          </StyledLink>
          <StyledLink onClick={logoutUser} type={"link"}>
            <UserDeleteOutlined /> Log Out
          </StyledLink>
        </Flex>
      </Flex>
    </BaseCard>
  );
};

export default ActionCard;
