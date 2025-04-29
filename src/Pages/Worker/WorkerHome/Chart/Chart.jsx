/* eslint-disable react/prop-types */
import { useContext } from "react";
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
import { BadgeCheck, HandCoins, ListChecks, ListTodo } from "lucide-react";

const DashboardStats = ({
  approvedSubmissions,
  totalSubmissions,
  totalPending,
  totalEarning,
}) => {
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
      value: approvedSubmissions?.length,
      icon: <BadgeCheck />,
    },
  ];
  const { theme } = useContext(AuthContext);
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
        {stats.map(({ label, value, icon }, i) => (
          <div
            key={i}
            className={` p-4 rounded-2xl shadow text-center relative group ${
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
              {label}
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* chart */}
      <div className="text-xs p-6 rounded shadow-lg">
        <h2 className="text-xl lg:text-2xl font-bold mb-4 text-center">
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
    </div>
  );
};

export default DashboardStats;
