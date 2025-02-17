import { Outlet } from "react-router-dom";
import Footer from "../../Pages/Shared/Footer/Footer";
import Header from "../../Pages/Shared/Navbar/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import PageLoader from "../../Pages/PageLoader/PageLoader";
import { IoCaretUpOutline } from "react-icons/io5";
import WelcomeModal from "../../Pages/Welcome/Welcome";

const Main = () => {
  const { loading } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleScrollY = () => {
      if (window.scrollY > 150) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", handleScrollY);
    return () => window.removeEventListener("scroll", handleScrollY);
  }, []);
  return (
    <div className="overflow-hidden">
      <WelcomeModal />
      {loading ? (
        <PageLoader />
      ) : (
        <div>
          <Header />
          <div className="min-h-[80vh] mt-[56px] lg:mt-[62.72px] ">
            <Outlet />
          </div>
          <Footer />

          <div
            className={`fixed duration-[1.5s] ease-out animate-bounce z-20 right-6 md:right-8 lg:right-12 ${
              show ? "top-[89vh]" : "-top-40"
            }`}
          >
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-xl cursor-pointer md:text-2xl lg:text-3xl p-2 bg-btnColor text-white rounded-full border"
            >
              <IoCaretUpOutline />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
