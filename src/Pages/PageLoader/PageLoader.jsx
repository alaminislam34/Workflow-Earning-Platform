import { Oval } from "react-loader-spinner";

const PageLoader = () => {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#ff6f00"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default PageLoader;
