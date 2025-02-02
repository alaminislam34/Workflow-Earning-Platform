import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import review from "../../../assets/images/review.jpg";
import social from "../../../assets/images/social.jpg";
import dataEntry from "../../../assets/images/dataEntry.jpg";
import appTest from "../../../assets/images/appText.jpg";

const TaskSection = () => {
  const tasks = [
    {
      id: 1,
      title: "Product Review Writing",
      description:
        "Product review writing involves creating honest, detailed, and engaging reviews for various products such as electronics, or apps. ",
      example: "Describe the product quality and what you liked most.",
      image: review,
    },
    {
      id: 2,
      title: "Social Media Engagement",
      description:
        "Interacting with posts by liking, sharing, commenting, following, or tagging on social media platforms to boost visibility and engagement.",
      example: "React to content on Facebook or Instagram.",
      image: social,
    },
    {
      id: 3,
      title: "Data Entry or Form Filling",
      description:
        "Entering data or filling forms with accurate information, such as names, emails, or survey details, to ensure organized records.",
      example: "Type names or copy-paste data as instructed.",
      image: dataEntry,
    },
    {
      id: 4,
      title: "App and Website Testing",
      description:
        "Finding and reporting bugs on websites or apps. Sharing feedback about usability or design.Installing apps and completing specific actions.",
      example: "Type names or copy-paste data as instructed.",
      image: appTest,
    },
  ];

  return (
    <div className="">
      <SectionTitle
        Title={"Many Types of Jobs"}
        description={
          "Explore a wide variety of job types, including surveys, reviews, data entry, and more, tailored to your skills and interests."
        }
      />
      <br />

      <div className="grid gap-4 md:gap-8 lg:gap-12 md:grid-cols-2 lg:grid-cols-4">
        {tasks.map((task) => (
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            key={task.id}
            className="border-t-4 border-primaryColor shadow-lg rounded-lg overflow-hidden "
          >
            <img
              className="aspect-video object-cover bg-center bg-cover"
              src={task.image}
              alt=""
            />
            <div className="p-4 space-y-2 md:space-y-3">
              <h3 className="uppercase text-lg md:text-xl font-semibold">
                {" "}
                {task.title}
              </h3>
              <p className="text-gray-500 text-sm md:text-base">
                {task.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskSection;
