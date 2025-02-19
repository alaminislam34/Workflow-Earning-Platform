import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Help = () => {
  const faqs = [
    {
      question: "How do I complete a task?",
      answer:
        "Go to the tasks section, select a task, follow the instructions, and submit your work. Ensure you meet all the requirements to get approved.",
    },
    {
      question: "How do I withdraw my earnings?",
      answer:
        "Navigate to the earnings page, check your balance, and request a withdrawal through your preferred payment method.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach us via the Contact Us page, email support@example.com, or through our live chat feature.",
    },
    {
      question: "How does the rating system work?",
      answer:
        "Workers receive ratings based on task completion accuracy. Higher ratings increase job opportunities and rewards.",
    },
    {
      question: "What happens if my task submission is rejected?",
      answer:
        "If your submission is rejected, review the feedback, make necessary corrections, and resubmit if allowed. Multiple rejections may affect your reputation.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Help Center !</h2>

      {/* FAQ Section */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-lg p-2 border border-base-300">
            <button
              className="w-full flex justify-between text-sm lg:text-base items-center font-medium "
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-xs lg:text-sm text-gray-400">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Video Guide */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Quick Video Guide</h3>
        <iframe
          className="w-full h-[300px] rounded-lg mt-2"
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
          title="How to use the platform"
          allowFullScreen
        ></iframe>
      </div>

      {/* Getting Started Guide */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Getting Started</h3>
        <ul className="mt-2 list-disc list-inside ">
          <li>
            Create an account and complete your profile to increase job
            opportunities.
          </li>
          <li>
            Browse available tasks, read the instructions carefully, and start
            working.
          </li>
          <li>
            Ensure quality work to maintain a high rating and increase your
            earnings.
          </li>
          <li>Withdraw earnings once you reach the minimum payout limit.</li>
        </ul>
      </div>

      {/* Contact Support */}
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold">Need More Help?</h3>
        <p className="">Contact our support team for further assistance.</p>
        <button className="mt-3 bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-primaryColor cursor-pointer transition">
          Chat with Support
        </button>
      </div>
    </div>
  );
};

export default Help;
