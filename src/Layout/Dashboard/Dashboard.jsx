import { useContext, useEffect } from "react";
import DashboardNavbar from "../../Pages/Shared/DashboardNavbar/DashboardNavbar";
import { AuthContext } from "../../Auth/AuthContext";
import AdminSidebar from "../../Pages/Admin/Sidebar/AdminSidebar";
import WorkerSidebar from "../../Pages/Worker/Sidebar/WorkerSidebar";
import BuyerSidebar from "../../Pages/Buyer/Sidebar/BuyerSidebar";
import { Outlet } from "react-router-dom";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Aos from "aos";
import Footer2 from "../../Pages/Shared/Footer/Footer2";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    Aos.init({
      once: true,
      duration: 2000,
      offset: 300,
      delay: 300,
    });
  }, [currentUser]);

  return (
    <div className="overflow-hidden">
      {/* Navbar */}
      <DashboardNavbar />

      <section className="flex min-h-screen mt-[56px] md:mt-[62.72px]">
        {/* Sidebar (Fixed) */}
        <div
          data-aos="fade-right"
          data-aos-anchor-placement="center-bottom"
          className="p-2 bg-primaryColor hidden lg:flex lg:flex-col w-64 min-h-screen fixed left-0 top-[56px] md:top-[62.72px] text-sm md:text-base"
        >
          <ul className="bg-primaryColor text-base-content flex flex-col justify-between flex-1 pt-4">
            <div>
              {currentUser?.role === "Worker" && <WorkerSidebar />}
              {currentUser?.role === "Admin" && <AdminSidebar />}
              {currentUser?.role === "Buyer" && <BuyerSidebar />}
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-row gap-6 text-xl mb-4 *:cursor-pointer">
                <FaFacebook className="text-gray-300 hover:text-white" />
                <FaWhatsapp className="text-gray-300 hover:text-white" />
                <FaInstagram className="text-gray-300 hover:text-white" />
              </div>
            </div>
          </ul>
        </div>

        {/* Content (Scrollable) */}
        <div className="lg:ml-64 flex-1 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 overflow-y-auto min-h-screen">
          <Outlet />
          <Footer2 />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
