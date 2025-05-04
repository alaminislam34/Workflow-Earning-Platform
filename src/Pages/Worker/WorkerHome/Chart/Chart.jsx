/* eslint-disable react/prop-types */
import { useContext, useState, useMemo } from "react";
import { AuthContext } from "../../../../Auth/AuthContext";
import { BadgeCheck, HandCoins, ListChecks, ListTodo } from "lucide-react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { format, parseISO } from "date-fns";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler
);

const DashboardStats = ({
  approvedSubmissions,
  totalSubmissions,
  totalPending,
  totalEarning,
}) => {
  const { theme } = useContext(AuthContext);

  // State for selected month
  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), "yyyy-MM")
  );

  // Filter submissions based on selected month
  const filteredSubmissions = useMemo(() => {
    return approvedSubmissions?.filter((item) => {
      const itemDate = parseISO(item.current_date);
      const itemMonth = format(itemDate, "yyyy-MM");
      return itemMonth === selectedMonth;
    });
  }, [approvedSubmissions, selectedMonth]);

  const stats = [
    {
      label: "Total Submissions",
      value: totalSubmissions,
      icon: <ListChecks />,
    },
    {
      label: "Total Pending",
      value: totalPending,
      icon: <ListTodo />,
    },
    {
      label: "Total Earning",
      value: totalEarning,
      icon: <HandCoins />,
    },
    {
      label: "Approved Submissions",
      value: approvedSubmissions?.length || 0,
      icon: <BadgeCheck />,
    },
  ];

  const chartData = {
    labels: filteredSubmissions?.map((item) => item.current_date),
    datasets: [
      {
        label: "Payable Amount",
        data: filteredSubmissions?.map((item) => item.payable_amount),
        fill: true,
        backgroundColor: "rgba(130, 202, 157, 0.2)",
        borderColor: "#82ca9d",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: theme === "light" ? "#000" : "#fff",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `৳ ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "PPpp",
        },
        ticks: {
          color: theme === "light" ? "#000" : "#fff",
        },
        title: {
          display: true,
          text: "Date",
          color: theme === "light" ? "#000" : "#fff",
        },
      },
      y: {
        ticks: {
          color: theme === "light" ? "#000" : "#fff",
        },
        title: {
          display: true,
          text: "Payable Amount (৳)",
          color: theme === "light" ? "#000" : "#fff",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      className="space-y-8"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 m-4 md:m-6">
        {stats.map(({ label, value, icon }, i) => (
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            data-aos-delay={i * 100}
            key={i}
            className={`p-4 rounded-2xl shadow text-center relative group ${
              theme === "light"
                ? "bg-white border border-primaryColor"
                : "bg-gray-800 text-white"
            }`}
          >
            <div className="flex items-center justify-center pb-2">
              <h3 className="flex items-center justify-center group-hover:bg-primaryColor duration-300 group-hover:text-white w-10 h-10 rounded-full border border-primaryColor text-primaryColor">
                {icon}
              </h3>
            </div>
            <p className="flex flex-row gap-2 items-center justify-center">
              {label} {value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="text-xs p-6 rounded shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <h2 className="text-xl lg:text-2xl font-bold text-center md:text-left mb-4 md:mb-0">
            Statistics Overview Chart
          </h2>

          {/* Month Selector */}
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-primaryColor rounded-md p-2 focus:outline-none focus:ring focus:border-primaryColor"
          />
        </div>

        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DashboardStats;
