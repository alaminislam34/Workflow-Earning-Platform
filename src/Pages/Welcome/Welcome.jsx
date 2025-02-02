import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const WelcomeModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the modal
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      setIsVisible(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-earn relative bg-cover rounded-lg shadow-lg max-w-2xl h-[300px] overflow-hidden md:h-[350px] w-full flex justify-center items-center text-white">
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 btn btn-sm btn-circle "
        >
          <IoClose />
        </button>
        <div className="w-full h-full bg-black/60 p-6 md:p-8 lg:p-10 text-center flex justify-center items-center flex-col">
          <h2
            style={{
              textShadow: `
    2px 2px 2px rgba(0, 0, 0, 0.6), 
    4px 4px 6px rgba(0, 0, 0, 0.5), 
    6px 6px 8px rgba(0, 0, 0, 0.4), 
    8px 8px 10px rgba(0, 0, 0, 0.3)
  `,
            }}
            className="text-xl md:text-2xl lg:text-3xl font-bold mb-4"
          >
            <span>
              Welcome to <span className="text-primaryColor">WorkFlow</span>{" "}
              Earning Platform!
            </span>
          </h2>
          <p className=" mb-6">
            Ready to make a real difference? Join our community today by signing
            up and start contributing to a great cause!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
