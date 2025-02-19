import { FiFacebook, FiGithub, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer
      data-aos="fade-in"
      data-aos-anchor-placement="center-bottom"
      data-aos-duration="1000"
      className="bg-gray-900 text-white py-8"
    >
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="container mx-auto flex flex-col md:flex-row justify-between items-center"
      >
        {/* Logo Section */}
        <div className="mb-4 md:mb-0 flex items-center gap-2">
          <h1 className="text-xl lg:text-2xl font-bold text-primaryColor">
            WorkFlow
          </h1>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com/ar.alamin34"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
            aria-label="Facebook"
          >
            <FiFacebook size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/alamin34/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={24} />
          </a>
          <a
            href="https://github.com/alaminislam34"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
            aria-label="GitHub"
          >
            <FiGithub size={24} />
          </a>
        </div>
      </div>
      {/* Footer Bottom Text */}
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="mt-8 text-center text-sm text-gray-500"
      >
        © {new Date().getFullYear()} Al Amin. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
