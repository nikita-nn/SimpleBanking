import { Button, Card, Image, Input, Layout, Typography } from "antd";
import styled from "styled-components";

const StyledMainLayout = styled(Layout)`
  width: 85%;
  height: 100%;
  margin: 6% auto;
  padding: 3rem;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  position: relative;
`;

const LoginInput = styled(Input)`
  border-radius: 1rem;
  padding-top: 2vh;
  padding-bottom: 0.5vh;
  padding-left: 1.5vh;
  z-index: 1;
`;

const LoginText = styled(Typography)`
  position: absolute;
  z-index: 2;
  left: 4%;
  top: 6%;
  color: gray;
`;

const LoginButton = styled(Button)`
  width: 100%;
  height: 4vh;
  border-radius: 1rem;
  font-size: 1rem;
`;
const StyledLogo = styled(Image)`
  position: absolute;
  top: 1vh;
  left: 25%;
`;

const EditableText = styled(Typography.Text)<{ size: number; color?: string }>`
  font-size: ${(props) => props.size}rem;
  color: ${(props) => props.color};
`;

const TransferButton = styled(Button)`
  border-radius: 0.75rem;
  width: 47%;
`;

const TransactionStyles = styled.div`
  font-size: 1.25rem;
  display: flex;
  gap: 1vh;
  align-items: center;
  justify-content: space-between;
  align-content: space-between;
`;

const AccountStyles = styled.div`
  height: fit-content;
  border-radius: 0.4vh 0.8vh 0.8vh 0.4vh;
  border: 0.1rem solid #d9d9d9;
  border-left: 0.5vh solid #1677ff;
  transition: background-color 0.3s;
  padding: 0.35vh 0.35vh 0.35vh 0.65rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(225, 225, 225, 0.5);
  }
`;

const LoginCard = styled(Card)`
  width: 30%;
  padding: 2.5rem;
  border-radius: 2.5rem;
`;

export {
  LoginText,
  LoginButton,
  LoginInput,
  StyledLogo,
  LoginCard,
  StyledMainLayout,
  TransferButton,
  TransactionStyles,
  EditableText,
  AccountStyles,
};
