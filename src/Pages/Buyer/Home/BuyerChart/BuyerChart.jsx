/* eslint-disable react/prop-types */

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const BuyerChart = ({ totalTasks, completeTask, userCoins, totalPayments }) => {
  // Data for bar chart (Workers & Buyers)
  const barChartData = [
    {
      name: "TotalTask",
      value: totalTasks,
    },
    {
      name: "completeTask",
      value: completeTask,
    },
  ];

  // Data for pie chart (Coins & Payments)
  const pieChartData = [
    {
      name: "MyCoins",
      value: userCoins,
    },
    { name: "Total Payments", value: totalPayments },
  ];

  // Colors for Pie Chart
  const COLORS = ["#FFD700", "#FF4500"];

  return (
    <div className="">
      <section
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className=""
      >
        {/* Workers and Buyers Chart */}
        <div className="lg:p-6 rounded-lg shadow-lg mb-8 flex flex-col md:flex-row justify-around items-center">
          <div>
            <h2 className="text-base lg:text-lg font-medium mb-4 text-center">
              Workers and Buyers Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={barChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis className="text-xs" dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* <Bar dataKey="value" fill="#82ca9d" barSize={50} /> */}
                <Bar dataKey="value" fill="#82ca9d" barSize={50} />
                {/* Bar for Buyers */}
                {/* <Bar dataKey="value" fill="#8884d8" barSize={50} /> */}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="">
            <h2 className="text-base lg:text-lg font-medium mb-4 text-center">
              Coins and Payments Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Coins and Payments Chart */}
      </section>
    </div>
  );
};

export default BuyerChart;
