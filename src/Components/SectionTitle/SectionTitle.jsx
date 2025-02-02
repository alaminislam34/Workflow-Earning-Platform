// eslint-disable-next-line react/prop-types
const SectionTitle = ({ Title, description }) => {
  return (
    <div>
      <div className="flex justify-center items-center flex-col gap-3 md:gap-4 my-4 md:my-6 text-center">
        <h2
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          data-aos-duration="1200"
          className="text-2xl md:text-3xl lg:text-4xl font-semibold font-jersey"
        >
          {Title}
        </h2>
        <p
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          data-aos-duration="1200"
          className="w-11/12 md:w-10/12 lg:w-8/12 mx-auto text-gray-500"
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default SectionTitle;
