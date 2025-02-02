import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import logo from "../../../assets/logos/logo.png";

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
          <img src={logo} alt="logo" className="w-16 md:w-20" />
          <h1 className="text-2xl font-bold">WorkFlow</h1>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <a
            href="https://facebook.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
            aria-label="Facebook"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={24} />
          </a>
          <a
            href="https://github.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
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
