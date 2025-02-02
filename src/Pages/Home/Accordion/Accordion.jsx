import { FaQuestionCircle } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Accordion = () => {
  return (
    <div>
      <SectionTitle
        Title={"FAQs"}
        description={
          "Find answers to common questions about tasks, earnings, payments, and more in our comprehensive FAQ section for quick assistance."
        }
      />
      <br />
      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col lg:flex-row text-sm md:text-base items-start gap-4 md:gap-6">
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            className="collapse collapse-plus bg-white shadow-lg rounded-lg border-t-4 border-primaryColor"
          >
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title font-medium flex items-center gap-2">
              <FaQuestionCircle className="text-primaryColor" />
              What is the Micro Tasking and Earning Platform?
            </div>
            <div className="collapse-content">
              <p>
                This platform allows users to complete small tasks and earn
                coins, which can be withdrawn as rewards. It also enables buyers
                to create tasks and manage payments, with admin oversight for
                seamless operations.
              </p>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            className="collapse collapse-plus bg-white shadow-lg rounded-lg border-t-4 border-primaryColor"
          >
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-medium flex items-center gap-2">
              <FaQuestionCircle className="text-primaryColor" />
              Who can join the platform?
            </div>
            <div className="collapse-content">
              <p>
                Anyone can join as a Worker, Buyer, or Admin, depending on their
                role and purpose. Workers complete tasks, Buyers create tasks,
                and Admins manage the platform.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row text-sm md:text-base items-start gap-4 md:gap-6">
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            className="collapse collapse-plus bg-white shadow-lg rounded-lg border-t-4 border-primaryColor"
          >
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-medium flex items-center gap-2">
              <FaQuestionCircle className="text-primaryColor" />
              How do Workers earn coins?
            </div>
            <div className="collapse-content">
              <p>
                Workers earn coins by completing tasks created by Buyers. Once a
                task is completed and approved, the Worker receives the
                designated reward in coins.
              </p>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            className="collapse collapse-plus bg-white shadow-lg rounded-lg border-t-4 border-primaryColor"
          >
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-medium flex items-center gap-2">
              <FaQuestionCircle className="text-primaryColor" />
              Can Workers withdraw their earnings?
            </div>
            <div className="collapse-content">
              <p>
                Yes, Workers can request withdrawals once they meet the
                platform`s minimum coin withdrawal threshold.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row text-sm md:text-base items-start gap-4 md:gap-6">
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            className="collapse collapse-plus bg-white shadow-lg rounded-lg border-t-4 border-primaryColor"
          >
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-medium flex items-center gap-2">
              <FaQuestionCircle className="text-primaryColor" />
              How do Buyers create tasks?
            </div>
            <div className="collapse-content">
              <p>
                Buyers can create tasks by providing detailed instructions,
                setting rewards, and specifying requirements. Tasks can then be
                published for Workers to complete.
              </p>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            className="collapse collapse-plus bg-white shadow-lg rounded-lg border-t-4 border-primaryColor"
          >
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-medium flex items-center gap-2">
              <FaQuestionCircle className="text-primaryColor" />
              How does the platform ensure task quality?
            </div>
            <div className="collapse-content">
              <p>
                Buyers review submissions before approving them. They can also
                report issues if tasks are not completed as per instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
