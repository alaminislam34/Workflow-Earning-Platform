import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const NavigateHome = ({ path, currentPage }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-sm py-4 text-center text-gray-600">
        <button onClick={() => navigate(path)} className="hover:underline">
          Home
        </button>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-700 font-semibold">{currentPage}</span>
      </h1>
    </div>
  );
};

export default NavigateHome;
