import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/MainLayout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Reigster";
import Home from "../Pages/Home/Home/Home";
import Dashboard from "../Layout/Dashboard/Dashboard";
import ManageUsers from "../Pages/Admin/ManageUsers/ManageUsers";
import ManageTasks from "../Pages/Admin/ManageTask/ManageTasks";
import AddNewTasks from "../Pages/Buyer/AddTasks/AddNewTasks";
import MyTasks from "../Pages/Buyer/MyTasks/MyTasks";
import PaymentHistory from "../Pages/Buyer/PaymentHistory/PaymentHistory";
import PurchaseCoin from "../Pages/Buyer/PurchaseCoin/PurchaseCoin";
import MySubmissions from "../Pages/Worker/MySubmissions/MySubmissions";
import TaskList from "../Pages/Worker/TaskList/TaskList";
import WithDrawals from "../Pages/Worker/WithDrawals/WithDrawals";
import AdminRoutes from "./AdminRoutes/AdminRoutes";
import BuyerRoutes from "./BuyerRoutes/BuyerRoutes";
import WorkerRoutes from "./WorkerRoutes/WorkerRoutes";
import TaskDetails from "../Pages/Worker/TaskList/TaskDetails";
import axiosInstance from "../Axios/useAxiosSecure";
import AdminHome from "../Pages/Admin/Home/AdminHome";
import BuyerHome from "../Pages/Buyer/Home/BuyerHome";
import WorkerHome from "../Pages/Worker/WorkerHome/WorkerHome";
import PaymentStripe from "../Pages/Buyer/PurchaseCoin/Payment/PaymentStripe";
import PageLoader from "../Pages/PageLoader/PageLoader";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import ProfileInfo from "../Pages/Worker/Profile/ProfileInfo";

export const router = createBrowserRouter([
  // main layout
  // ===============================================================================
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      // Page not found component
      // ===============================================================================
      {
        path: "/*",
        element: <PageNotFound />,
      },
    ],
  },
  // Dashboard
  // ===============================================================================
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      // Admin routes
      // ===============================================================================
      {
        path: "Admin",
        element: (
          <AdminRoutes>
            <AdminHome />
          </AdminRoutes>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoutes>
            <ManageUsers />
          </AdminRoutes>
        ),
      },
      {
        path: "manageTasks",
        element: (
          <AdminRoutes>
            <ManageTasks />
          </AdminRoutes>
        ),
      },

      // Buyer routes
      // ===============================================================================
      {
        path: "Buyer",
        element: (
          <BuyerRoutes>
            <BuyerHome />
          </BuyerRoutes>
        ),
      },
      {
        path: "addTask",
        element: (
          <BuyerRoutes>
            <AddNewTasks />
          </BuyerRoutes>
        ),
      },
      {
        path: "myTask",
        element: (
          <BuyerRoutes>
            <MyTasks />
          </BuyerRoutes>
        ),
      },
      {
        path: "payment",
        element: (
          <BuyerRoutes>
            <PaymentHistory />
          </BuyerRoutes>
        ),
      },
      {
        path: "purchase",
        element: (
          <BuyerRoutes>
            <PurchaseCoin />
          </BuyerRoutes>
        ),
      },
      {
        path: "paymentStripe",
        element: <PaymentStripe />,
      },

      // Worker routes
      // ===============================================================================
      {
        path: "Worker",
        element: (
          <WorkerRoutes>
            <WorkerHome />
          </WorkerRoutes>
        ),
      },
      {
        path: "mySubmissions",
        element: (
          <WorkerRoutes>
            <MySubmissions />
          </WorkerRoutes>
        ),
      },
      {
        path: "taskList",
        element: (
          <WorkerRoutes>
            <TaskList />
          </WorkerRoutes>
        ),
      },
      {
        path: "taskDetails/:id",
        element: (
          <WorkerRoutes>
            <TaskDetails />
          </WorkerRoutes>
        ),
        loader: ({ params }) => axiosInstance(`/tasks/${params.id}`),
      },
      {
        path: "withDrawal",
        element: (
          <WorkerRoutes>
            <WithDrawals />
          </WorkerRoutes>
        ),
      },
      {
        path: "profileInfo",
        element: <ProfileInfo />,
      },
      {
        path: "/dashboard",
        element: (
          <BuyerRoutes>
            <BuyerHome />
          </BuyerRoutes>
        ),
      },
    ],
  },
  // loading components
  // ===============================================================================
  {
    path: "/loading",
    element: <PageLoader />,
  },
]);
