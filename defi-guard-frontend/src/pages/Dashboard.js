import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  Bar,
  Line,
  Doughnut
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/dashboard.css";

ChartJS.register(
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);

  const user = {
    name: "Kanak Agarwal",
    wallet: "2350 XLM",
    policies: 3,
  };

  const investmentsData = {
    labels: ["Health", "Vehicle", "Travel"],
    datasets: [
      {
        label: "Investments (XLM)",
        data: [800, 1200, 600],
        backgroundColor: ["#43cea2", "#185a9d", "#00c6ff"],
      },
    ],
  };

  const walletGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Wallet Balance",
        data: [1200, 1400, 1600, 1800, 2000, 2350],
        fill: false,
        borderColor: "#43cea2",
        tension: 0.3,
      },
    ],
  };

  const claimsData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        data: [5, 2, 1],
        backgroundColor: ["#43cea2", "#ffb400", "#ff5858"],
      },
    ],
  };

  return (
    <div className={`dashboard-container ${theme}`}>
      <div className="dashboard-header">
        <h2>Welcome, {user.name}</h2>
        <p>Wallet Balance: {user.wallet}</p>
        <p>Active Policies: {user.policies}</p>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h3>Investment Overview</h3>
          <Bar data={investmentsData} />
        </div>

        <div className="chart-card">
          <h3>Wallet Growth</h3>
          <Line data={walletGrowthData} />
        </div>

        <div className="chart-card">
          <h3>Claims Summary</h3>
          <Doughnut data={claimsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
