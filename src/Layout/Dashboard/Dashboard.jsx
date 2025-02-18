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
    <div className="">
      <section className="flex min-h-screen">
        {/* Sidebar (Fixed) */}
        <div
          data-aos="fade-right"
          data-aos-anchor-placement="center-bottom"
          className="p-2 bg-white hidden lg:flex lg:flex-col w-64 min-h-screen fixed left-0 text-sm md:text-base"
        >
          <ul className="bg-white text-black flex flex-col justify-between flex-1 pt-4">
            <div>
              {currentUser?.role === "Worker" && <WorkerSidebar />}
              {currentUser?.role === "Admin" && <AdminSidebar />}
              {currentUser?.role === "Buyer" && <BuyerSidebar />}
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-row gap-6 text-xl mb-4 *:cursor-pointer">
                <FaFacebook className="" />
                <FaWhatsapp className="" />
                <FaInstagram className="" />
              </div>
            </div>
          </ul>
        </div>

        {/* Content (Scrollable) */}
        <div className="lg:ml-64 flex-1 flex justify-between flex-col bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 min-h-screen">
          {/* Navbar */}
          <nav className="sticky right-0 top-2 z-50 w-full">
            <DashboardNavbar />
          </nav>
          <section>
            <Outlet />
          </section>
          <Footer2 />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
