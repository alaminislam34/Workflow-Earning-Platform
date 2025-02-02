import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import signup from "../../../assets/images/signup.jpg";
import apply from "../../../assets/images/apply.jpg";
import complete from "../../../assets/images/complete.jpg";
import paid from "../../../assets/images/getPaid.jpg";
import TaskSection from "./TaskSection";

const HowItWork = () => {
  return (
    <div>
      <div>
        <SectionTitle
          Title={"How It Works"}
          description={
            " Our easy steps to get paid. All you need is an internet connected  device to get started."
          }
        />
        <br />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          className="border-t-4 border-primaryColor rounded-lg shadow-lg overflow-hidden flex flex-col gap-4 pb-4"
        >
          <img
            className="aspect-video object-cover bg-center bg-cover"
            src={signup}
            alt=""
          />
          <div className="p-4 space-y-2 md:space-y-3">
            <h3 className="uppercase text-lg md:text-xl font-semibold">
              {" "}
              1. Sign Up{" "}
            </h3>
            <p className="text-gray-500 text-sm md:text-base">
              Register directly or with your Google account
            </p>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          className="border-t-4 border-primaryColor rounded-lg shadow-lg overflow-hidden flex flex-col gap-4 pb-4"
        >
          <img
            className="aspect-video object-cover bg-center bg-cover"
            src={apply}
            alt=""
          />
          <div className="p-4 space-y-2 md:space-y-3">
            <h3 className="uppercase text-lg md:text-xl font-semibold">
              {" "}
              1. Apply for jobs{" "}
            </h3>
            <p className="text-gray-500 text-sm md:text-base">
              Jobs are diverse and readily available
            </p>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          className="border-t-4 border-primaryColor rounded-lg shadow-lg overflow-hidden flex flex-col gap-4 pb-4"
        >
          <img
            className="aspect-video object-cover bg-center bg-cover"
            src={complete}
            alt=""
          />
          <div className="p-4 space-y-2 md:space-y-3">
            <h3 className="uppercase text-lg md:text-xl font-semibold">
              {" "}
              1. Complete Tasks{" "}
            </h3>
            <p className="text-gray-500 text-sm md:text-base">
              Work on tasks in the jobs you’ve unlocked
            </p>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          className="border-t-4 border-primaryColor rounded-lg shadow-lg overflow-hidden flex flex-col gap-4 pb-4"
        >
          <img
            className="aspect-video object-cover bg-center bg-cover"
            src={paid}
            alt=""
          />
          <div className="p-4 space-y-2 md:space-y-3">
            <h3 className="uppercase text-lg md:text-xl font-semibold">
              {" "}
              1. get paid{" "}
            </h3>
            <p className="text-gray-500 text-sm md:text-base">
              Payment via Nagad, Bikash or Rocket
            </p>
          </div>
        </div>
      </div>
      <div className="py-4 md:py-6 lg:py-8">
        <TaskSection />
      </div>
    </div>
  );
};

export default HowItWork;
