import { useState } from "react";

const blogs = [
  {
    title: "How to Start Earning from Micro-Tasks",
    content:
      "Micro-tasking is a great way to earn money online. Learn how to create an account, find tasks, and maximize your earnings.",
  },
  {
    title: "5 Mistakes to Avoid as a New Worker",
    content:
      "Many beginners make common mistakes that reduce their earnings. Avoid these pitfalls and work efficiently!",
  },
  {
    title: "Understanding Ratings and How They Affect Your Earnings",
    content:
      "Your rating determines your job opportunities. Learn how to maintain a high rating and get better-paying tasks.",
  },
  {
    title: "Best Payment Methods for Quick Withdrawals",
    content:
      "Find out the fastest and most reliable ways to withdraw your earnings from micro-task platforms.",
  },
];

const BlogPage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Micro-Task Blog
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {blogs.map((blog, index) => (
            <button
              key={index}
              onClick={() => setSelectedBlog(blog)}
              className="block w-full text-left p-4 cursor-pointer border rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              <h3 className=" font-semibold">{blog.title}</h3>
            </button>
          ))}
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-md min-h-[250px]">
          {selectedBlog ? (
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {selectedBlog.title}
              </h3>
              <p className="text-gray-600">{selectedBlog.content}</p>
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              Click on a blog title to read the details.
            </p>
          )}
        </div>
      </div>

      {/* Related Articles Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>How to Increase Your Earnings with Smart Strategies</li>
          <li>Top 10 Micro-Task Websites You Should Join</li>
          <li>Time Management Tips for Micro-Task Workers</li>
        </ul>
      </div>

      {/* Newsletter Subscription */}
      <div className="mt-8 p-6 bg-gray-100 rounded-lg text-center">
        <h3 className="text-lg font-semibold">Subscribe to Our Newsletter</h3>
        <p className="text-gray-600 mb-4">
          Get the latest updates and tips on micro-tasking.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
