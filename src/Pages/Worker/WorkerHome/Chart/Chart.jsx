/* eslint-disable react/prop-types */
import { useContext } from "react";
import { FaCoins } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { RiFileList2Fill } from "react-icons/ri";
import {
  // BarChart,
  // Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer,
  // Cell,
  AreaChart,
  Area, // Import Cell
} from "recharts";
import { AuthContext } from "../../../../Auth/AuthContext";

const DashboardStats = ({
  approvedSubmissions,
  totalSubmissions,
  totalPending,
  totalEarning,
}) => {
  const { currentUser } = useContext(AuthContext);
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      className="space-y-8"
    >
      {/* Data Display Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 m-4 md:m-6">
        {/* Data Cards */}
        <div className="bg-blue-100 p-4 rounded shadow text-center relative">
          <h3 className="text-sm font-medium flex items-start gap-2 justify-start">
            <RiFileList2Fill />
            Total Submissions
          </h3>
          <p className="text-base lg:text-lg text-left font-semibold">
            {totalSubmissions}
          </p>
        </div>
        {/* Data Cards */}
        <div className="bg-yellow-100 p-4 rounded shadow text-center relative">
          <h3 className="text-sm font-medium flex items-start gap-2 justify-start">
            <MdPendingActions />
            Total Pending
          </h3>
          <p className="text-base lg:text-lg text-left font-semibold">
            {totalPending}
          </p>
        </div>
        {/* Data Cards */}
        <div className="bg-green-100 p-4 rounded shadow text-center relative">
          <h3 className="text-sm font-medium flex items-start gap-2 justify-start">
            <FaCoins />
            Total Earnings
          </h3>
          <p className="text-base lg:text-lg text-left font-semibold">
            ${totalEarning}
          </p>
        </div>
        {/* Data Cards */}
        <div className="bg-green-100 p-4 rounded shadow text-center relative">
          <h3 className="text-sm font-medium flex items-start gap-2 justify-start">
            <FaCoins />
            Total Coins
          </h3>
          <p className="text-base lg:text-lg text-left font-semibold">
            ${currentUser?.coins}
          </p>
        </div>
      </div>

      {/* chart */}
      <div className="text-xs bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 text-center">
          Statistics Overview Chart
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={approvedSubmissions ? approvedSubmissions : []}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="current_date" tickFormatter={formatDate} />
            <YAxis />
            <Tooltip labelFormatter={formatDate} />
            <Area
              type="monotone"
              dataKey="payable_amount"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Section */}
      {/* <div className="bg-white p-6 rounded shadow-lg">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" barSize={50}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
};

export default DashboardStats;
