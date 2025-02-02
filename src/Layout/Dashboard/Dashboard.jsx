import { useContext, useEffect } from "react";
import DashboardNavbar from "../../Pages/Shared/DashboardNavbar/DashboardNavbar";
import Footer from "../../Pages/Shared/Footer/Footer";
import { AuthContext } from "../../Auth/AuthContext";
import AdminSidebar from "../../Pages/Admin/Sidebar/AdminSidebar";
import WorkerSidebar from "../../Pages/Worker/Sidebar/WorkerSidebar";
import BuyerSidebar from "../../Pages/Buyer/Sidebar/BuyerSidebar";
import { Outlet } from "react-router-dom";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Aos from "aos";

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
      <DashboardNavbar />
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh] mt-[66px] md:mt-[78px]">
        <div
          data-aos="fade-right"
          data-aos-anchor-placement="center-bottom"
          className={`p-2 bg-primaryColor hidden lg:block lg:col-span-2 text-sm md:text-base`}
        >
          <ul className=" bg-primaryColor h-full text-base-content flex flex-col justify-between pt-4">
            <div>
              <div>{currentUser?.role === "Worker" && <WorkerSidebar />}</div>
              <div>{currentUser?.role === "Admin" && <AdminSidebar />}</div>
              <div>{currentUser?.role === "Buyer" && <BuyerSidebar />}</div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-row gap-6  text-xl mb-4 *:cursor-pointer">
                <FaFacebook className="text-gray-300 hover:text-white" />
                <FaWhatsapp className="text-gray-300 hover:text-white" />
                <FaInstagram className="text-gray-300 hover:text-white" />
              </div>
            </div>
          </ul>
        </div>
        <div className="lg:col-span-10 p-4  bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50">
          <Outlet />
          <br />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
