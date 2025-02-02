/* eslint-disable react/prop-types */
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

const DashboardStats = ({
  approvedSubmissions,
  totalSubmissions,
  totalPending,
  totalEarning,
}) => {
  // Data for the chart
  // const chartData = [
  //   { name: "Submissions", value: totalSubmissions, color: "#5ca678" },
  //   { name: "Pending", value: totalPending, color: "#ff9933" },
  //   { name: "Earnings ($)", value: totalEarning, color: "#ffc107" },
  // ];
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 m-4 md:m-6">
        <div className="bg-blue-100 p-4 rounded shadow text-center relative">
          <h3 className="text-lg font-semibold hidden lg:block">
            Total Submissions
          </h3>
          <p className="absolute -top-5 -left-2 text-2xl md:text-4xl h-16 w-16 flex justify-center items-center bg-primaryColor/30 backdrop-blur-xl shadow-2xl rounded-full">
            <RiFileList2Fill />
          </p>
          <p className="text-xl md:text-2xl font-bold">{totalSubmissions}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center relative">
          <h3 className="text-lg font-semibold hidden lg:block">
            Total Pending
          </h3>
          <p className="text-xl md:text-2xl font-bold">{totalPending}</p>
          <p className="absolute -top-5 -left-2 text-2xl md:text-4xl h-16 w-16 flex justify-center items-center bg-primaryColor/30 backdrop-blur-xl shadow-2xl rounded-full">
            <MdPendingActions />
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center relative">
          <h3 className="text-lg font-semibold hidden lg:block">
            Total Earnings
          </h3>
          <p className="text-xl md:text-2xl font-bold">${totalEarning}</p>
          <p className="absolute -top-5 -left-2 text-2xl md:text-4xl h-16 w-16 flex justify-center items-center bg-primaryColor/30 backdrop-blur-xl shadow-2xl rounded-full">
            <FaCoins />
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
