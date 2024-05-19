import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Empty } from "antd";
import { BaseCard, EditableText } from "../styles/renderComponents.ts";
import { useAccounts } from "../context/AccountsContext.tsx";
ChartJS.register(ArcElement, Legend);
const FinancialChart = () => {
  const { accounts } = useAccounts();
  const data = {
    labels: accounts.map((account) => account.name),
    datasets: [
      {
        data: accounts.map((account) => account.balance),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(12, 205, 86)",
          "rgb(255, 105, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <BaseCard>
      <EditableText size={2} italic>
        Financial chart
      </EditableText>
      {accounts.every((account) => account.balance == 0) ? (
        <Empty />
      ) : (
        <Doughnut width={"50%"} data={data} />
      )}
    </BaseCard>
  );
};

export default FinancialChart;
