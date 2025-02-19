/* eslint-disable react/prop-types */

import { FaCoins, FaCreditCard, FaDollarSign, FaUsers } from "react-icons/fa";

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

  // Colors for Pie Chart
  const COLORS = ["#FFD700", "#FF4500"];

  return (
    <div className="md:p-6">
      {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-anchor-placement="center-bottom"
          className={`p-6 flex justify-center gap-2 items-center flex-col  text-center rounded-lg shadow-lg ${
            theme === "light" ? "bg-white" : "bg-gray-800 text-white"
          }`}
        >
          <p className="flex items-center gap-2">
            <FaUsers className="text-xl " />
            <span className="text-xs lg:text-sm">Workers</span>
          </p>
          <h2 className="text-2xl font-bold ">
            {stats?.filter((user) => user.role === "Worker").length}
          </h2>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-anchor-placement="center-bottom"
          className={`p-6 flex justify-center items-center flex-col  text-center rounded-lg shadow-lg ${
            theme === "light" ? "bg-white" : "bg-gray-800 text-white"
          }`}
        >
          <p className="flex items-center gap-2">
            <FaCreditCard className="text-xl " />
            <span className="text-xs lg:text-sm">Buyers</span>
          </p>
          <h2 className="text-2xl font-bold ">
            {stats?.filter((user) => user.role === "Buyer").length}
          </h2>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-anchor-placement="center-bottom"
          className={`p-6 flex justify-center items-center flex-col  text-center rounded-lg shadow-lg ${
            theme === "light" ? "bg-white" : "bg-gray-800 text-white"
          }`}
        >
          <p className="flex items-center gap-2">
            <FaCoins className="text-xl " />
            <span className="text-xs lg:text-sm">Coins</span>
          </p>
          <h2 className="text-2xl font-bold  flex items-center gap-2">
            {stats?.reduce((sum, user) => sum + (user.coins || 0), 0)}
          </h2>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="800"
          data-aos-anchor-placement="center-bottom"
          className={`p-6 flex justify-center items-center flex-col  text-center rounded-lg shadow-lg ${
            theme === "light" ? "bg-white" : "bg-gray-800 text-white"
          }`}
        >
          <p className="flex items-center gap-2">
            <FaDollarSign className="text-xl " />
            <span className="text-xs lg:text-sm">Payments</span>
          </p>
          <h2 className="text-2xl font-bold  flex items-center gap-2">
            {totalPayments}
          </h2>
        </div>
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
