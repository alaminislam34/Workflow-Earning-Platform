import { useContext, useEffect } from "react";
import DashboardNavbar from "../../Pages/Shared/DashboardNavbar/DashboardNavbar";
import { AuthContext } from "../../Auth/AuthContext";
// import AdminSidebar from "../../Pages/Admin/Sidebar/AdminSidebar";
// import WorkerSidebar from "../../Pages/Worker/Sidebar/WorkerSidebar";
// import BuyerSidebar from "../../Pages/Buyer/Sidebar/BuyerSidebar";
import { Outlet } from "react-router-dom";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Aos from "aos";
import Footer2 from "../../Pages/Shared/Footer/Footer2";
import Sidebar from "../../Components/DashboardSidebar/Sidebar";

const Dashboard = () => {
  const { currentUser, navOpen } = useContext(AuthContext);
  console.log(currentUser);
  useEffect(() => {
    Aos.init({
      once: true,
      duration: 2000,
      offset: 300,
      delay: 300,
    });
  }, [currentUser]);

  return (
    <div className="">
      <section className="min-h-screen h-full">
        {/* Sidebar (Fixed) */}
        <div
          className={`p-2 duration-500 bg-white shadow-md hidden lg:flex lg:flex-col ${
            navOpen ? "w-56" : "w-16"
          } min-h-screen fixed left-0 text-sm md:text-base z-50`}
        >
          <ul className="bg-white text-black flex flex-col justify-between flex-1 pt-4">
            <div>
              <Sidebar />
            </div>
            <div className="flex justify-center">
              <div
                className={`text-gray-500 *:hover:text-gray-800 ${
                  navOpen ? "flex-row" : "flex-col"
                } flex gap-6 text-xl mb-4 *:cursor-pointer`}
              >
                <FaFacebook />
                <FaWhatsapp />
                <FaInstagram />
              </div>
            </div>
          </ul>
        </div>

        {/* Content (Scrollable) */}
        <div
          className={`duration-500 ${
            navOpen ? "lg:ml-56" : "lg:ml-16"
          } flex-1 flex justify-between flex-col bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 `}
        >
          {/* Navbar */}
          <nav className="sticky right-0 top-1 z-20">
            <DashboardNavbar />
          </nav>
          <section className="z-0 w-11/12 px-4 py-6 lg:w-full min-h-[80vh] mx-auto">
            <Outlet />
          </section>
          <Footer2 />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
