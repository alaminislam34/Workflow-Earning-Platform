// eslint-disable-next-line react/prop-types
const DashboardTitle = ({ title }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      className="pb-4"
    >
      <h1 className="text-xl md:text-2xl lg:text-4xl text-center font-bold pb-4">
        {title}
      </h1>
    </div>
  );
};

export default DashboardTitle;
