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
      return "Good Afternoon";
    } else if (hour >= 17 && hour < 20) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };

  const [greeting, setGreeting] = useState(getGreeting());
  const [message, setMessage] = useState("");

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

    // Dynamic messages based on time & user status
    const messages = [
      "Keep up the great work and earn more!",
      "New high-paying tasks are available!",
      "Consistency leads to success. Stay motivated!",
      "Your last task was approved! Keep going!",
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  }, [currentUser]);

  return (
    <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
      <p className="text-base font-semibold mt-4">
        <span>{greeting}</span>, <span>{currentUser?.name}!!</span>
      </p>
      <p className="text-sm text-gray-400 mt-2">{message}</p>
    </div>
  );
};

export default DashboardHomeTitle;
