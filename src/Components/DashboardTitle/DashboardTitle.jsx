// eslint-disable-next-line react/prop-types
const DashboardTitle = ({ title }) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="center-bottom"
      className="pb-4"
    >
      <h1 className="text-xl lg:text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default DashboardTitle;
