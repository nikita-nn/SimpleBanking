import { Button, Card, Layout, Typography } from "antd";
import styled from "styled-components";

const StyledMainLayout = styled(Layout)`
  width: 75%;
  margin: 20px auto;
  padding: 3rem;
  border-radius: 1rem;
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
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  align-content: space-between;
`;

const AccountStyles = styled.div`
  height: 4.25rem;
  border-radius: 0.25rem 0.5rem 0.5rem 0.25rem;
  border: 0.1rem solid #d9d9d9;
  border-left: 0.35rem solid #1677ff;
  transition: background-color 0.3s;
  padding: 0.25rem 0.25rem 0.25rem 0.7rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(225, 225, 225, 0.5);
  }
`;

const LoginCard = styled(Card)`
  width: 50%;
  padding: 3rem;
  border-radius: 2.5rem;
  position: relative;
  top: 25%;
  left: 25%;
`;

export {
  LoginCard,
  StyledMainLayout,
  TransferButton,
  TransactionStyles,
  EditableText,
  AccountStyles,
};
