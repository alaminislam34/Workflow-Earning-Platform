import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import Testimonial from "../Testimonial/Testimonial";
import BestWorker from "../Worker/BestWorker";
import Accordion from "../Accordion/Accordion";
import HowItWork from "../HowItWork/HowItWork";
import { useContext } from "react";
import { AuthContext } from "../../../Auth/AuthContext";
import GetStarted from "../GetStarted/GetStarted";
import Tasks from "../Tasks/Tasks";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <Helmet>
        <title>WorkFlow Home</title>
      </Helmet>
      <Banner />
      <div className="max-w-7xl mx-auto w-11/12">
        <br />
        <BestWorker />
        <br />
        <Tasks />
        <br />
        <Testimonial />

        <Accordion />
        <br />
        <br />
        <br />
        <HowItWork />
        <br />
        {currentUser ? "" : <GetStarted />}
        <br />
        <br />
      </div>
    </div>
  );
};

export default Home;
