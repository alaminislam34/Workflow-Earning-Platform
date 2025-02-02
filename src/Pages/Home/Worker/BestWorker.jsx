import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaCoins } from "react-icons/fa";
import axiosInstance from "../../../Axios/useAxiosSecure";
import { useEffect } from "react";
import Aos from "aos";

const BestWorker = () => {
  const { data } = useQuery({
    queryKey: ["workers"],
    queryFn: async () => {
      const role = "Worker";
      const res = await axiosInstance.get(`/allUsers?role=${role}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  useEffect(() => {
    Aos.init({
      once: true,
      duration: 2000,
      delay: 300,
      offset: 300,
    });
  }, [data]);
  // Sort and get top 6 workers by coins
  const topWorkers = data?.sort((a, b) => b.coins - a.coins);

  return (
    <div className="p-4">
      <div>
        <SectionTitle
          Title={"Best Workers"}
          description={
            "Our best Workers are highly skilled professionals ranked by coins, showcasing their achievements, contributions, and dedication to excellence."
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {topWorkers?.slice(0, 6).map((worker) => (
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
              key={worker._id}
              className="shadow-md p-4 border-t-4 rounded-xl border-primaryColor flex items-center gap-4 bg-white hover:bg-gray-100 hover:shadow-xl duration-500 focus:outline-none"
            >
              <img
                src={worker?.photo}
                alt={`Profile of ${worker.name || "Unknown Worker"}`}
                className="w-16 h-16 rounded-full border-2 border-primaryColor object-cover"
              />
              <div className="flex flex-col justify-start text-left">
                <h2 className="text-lg font-semibold text-gray-800">
                  {worker.name || "Unknown Worker"}
                </h2>
                <p className="text-sm md:text-base text-primaryColor flex justify-start items-center text-left gap-2">
                  Coins:{" "}
                  <span
                    className="font-bold"
                    title={`Coins available: ${worker.coins || 0}`}
                  >
                    {worker.coins || 0}
                  </span>{" "}
                  <FaCoins />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestWorker;
