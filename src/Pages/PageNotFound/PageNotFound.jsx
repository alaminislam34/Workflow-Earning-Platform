import { Link } from "react-router-dom";
import { motion } from "motion/react";

const PageNotFound = () => {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <div className="text-center space-y-4">
        <motion.div
          style={{
            fontFamily: ["Jersey 15", "serif"],
            boxShadow: `
    4px 4px 15px rgba(0, 0, 0, 0.4), 
    -4px -4px 15px rgba(255, 255, 255, 0.8), 
    2px 2px 20px rgba(0, 0, 0, 0.3)
  `,
            textShadow: `
    2px 2px 2px rgba(0, 0, 0, 0.6), 
    4px 4px 6px rgba(0, 0, 0, 0.5), 
    6px 6px 8px rgba(0, 0, 0, 0.4), 
    8px 8px 10px rgba(0, 0, 0, 0.3)
  `,
          }}
          className="bg-gradient-to-tr from-btnColor/10 via-btnColor/30 to-primaryColor/20 backdrop-blur-lg p-6 rounded-3xl font-righteous flex flow-row gap-4 justify-center items-center text-8xl md:text-[120px] lg:text-[150px]"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <p className="-rotate-[30deg] -translate-x-1">4</p>

          <p className="">O</p>

          <p className="rotate-[30deg] translate-x-1">4</p>
        </motion.div>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold font-righteous">
          Page Not Found
        </h1>
        <div>
          <Link
            to="/"
            className="text-white bg-btnColor rounded-lg hover:bg-primaryColor duration-300 hover:scale-105 inline-block text-sm"
          >
            Go To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
