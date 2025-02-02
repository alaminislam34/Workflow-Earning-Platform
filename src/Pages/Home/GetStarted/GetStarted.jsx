import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      className="w-full flex justify-center items-center"
    >
      <button
        onClick={() => navigate("/login")}
        className="btn btn-md text-white lg:btn-lg bg-btnColor hover:bg-primaryColor"
      >
        Get Started Today
      </button>
    </div>
  );
};

export default GetStarted;
