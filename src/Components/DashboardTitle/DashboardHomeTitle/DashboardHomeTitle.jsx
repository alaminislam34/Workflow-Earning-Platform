import { useContext, useEffect } from "react";
import { AuthContext } from "../../../Auth/AuthContext";
import Aos from "aos";

const DashboardHomeTitle = () => {
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    Aos.init({
      once: true,
      offset: 200,
      duration: 2000,
      delay: 300,
    });
  }, [currentUser]);
  return (
    <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
      <h1 className={`text-xl lg:text-2xl text-center font-bold py-3 md:py-4 `}>
        {` Hi ${currentUser?.name} ! Welcome to your ${currentUser?.role} Dashboard.`}
      </h1>
    </div>
  );
};

export default DashboardHomeTitle;
