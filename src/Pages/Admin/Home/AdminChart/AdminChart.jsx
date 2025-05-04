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
import { AuthContext } from "../../../../Auth/AuthContext";
import { useContext } from "react";
import { Coins, Users } from "lucide-react";

const AdminChart = ({ stats, totalPayments }) => {
  const { theme } = useContext(AuthContext);
  // Data for bar chart (Workers & Buyers)
  const barChartData = [
    {
      name: "Workers",
      value: stats?.filter((user) => user.role === "Worker").length,
    },
    {
      name: "Buyers",
      value: stats?.filter((user) => user.role === "Buyer").length,
    },
  ];

  // Data for pie chart (Coins & Payments)
  const pieChartData = [
    {
      name: "Available Coins",
      value: stats?.reduce((sum, user) => sum + (user.coins || 0), 0),
    },
    { name: "Total Payments", value: totalPayments },
  ];
  const stat = [
    {
      label: "Total Users",
      value: stats?.filter((user) => user.role === "Worker").length,
      icon: <Users size={20} />,
    },
    {
      label: "Total Worker",
      value: stats?.filter((user) => user.role === "Worker").length,
      icon: <Users size={20} />,
    },
    {
      label: "Total Buyer",
      value: stats?.filter((user) => user.role === "Buyer").length,
      icon: <Users size={20} />,
    },
    {
      label: "Total Coins",
      value: stats?.reduce((sum, user) => sum + (user.coins || 0), 0),
      icon: <Coins size={20} />,
    },
  ];

  // Colors for Pie Chart
  const COLORS = ["#FFD700", "#FF4500"];

  return (
    <div className="md:p-6">
      {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stat?.map(({ label, value, icon }, i) => (
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
      <section className="">
        {/* Workers and Buyers Chart */}
        <div
          data-aos="fade-up"
          data-aos-delay="1000"
          data-aos-anchor-placement="center-bottom"
          className=" md:p-6 rounded-lg shadow-lg mb-8 flex flex-col md:flex-row justify-around items-center"
        >
          <div>
            <h2 className="text-xl font-bold  mb-4 text-center">
              Workers and Buyers Overview
            </h2>
            <ResponsiveContainer
              width="100%"
              height={300}
              className="text-xs md:text-sm flex justify-center items-center"
            >
              <BarChart
                data={barChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
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
            <h2 className="text-xl font-bold  mb-4 text-center">
              Coins and Payments Overview
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart className="text-xs md:text-sm">
                <Pie
                  className="text-xs md:text-sm"
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

export default AdminChart;
