import { Chart as ChartJS, ArcElement,  Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {useUserBankingInfo} from "../context/UserBankingContext.tsx";
import {Card, Empty, Typography} from "antd";
ChartJS.register(ArcElement, Legend);
const FinancialChart = () =>{
    const {accounts} = useUserBankingInfo()
    const data = {
        datasets: [
        {
            data: accounts.map((account)=>account.balance),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
            ]
    }
    return(
        <Card style={{height:"100%"}}>
            <Typography.Text style={{ fontSize: "2rem" }} italic>
                Account Summary
            </Typography.Text>
            {accounts.every((account)=>account.balance == 0) ?  <Empty/>: <Doughnut width={"50%"} data={data}/>}
        </Card>
    )
}

export default FinancialChart