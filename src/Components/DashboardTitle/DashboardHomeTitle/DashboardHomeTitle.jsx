import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Auth/AuthContext";
import Aos from "aos";

const DashboardHomeTitle = () => {
  const { currentUser } = useContext(AuthContext);
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon ";
    } else if (hour >= 17 && hour < 20) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };

  const [greeting, setGreeting] = useState(getGreeting());
  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Aos.init({
      once: true,
      offset: 200,
      duration: 2000,
      delay: 300,
    });
  }, [currentUser]);
  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      className=""
    >
      <p className="text-base font-semibold mt-4">
        <span> {greeting} </span>, <span> {currentUser?.name}!!</span>
      </p>
    </div>
  );
};

export default DashboardHomeTitle;
