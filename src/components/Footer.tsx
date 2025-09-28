import { PiGithubLogo, PiLinkedinLogo } from "react-icons/pi";

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center gap-6 py-6 bg-transparent">
      <a
        href="https://github.com/stkossman"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
      >
        <PiGithubLogo size={28} />
      </a>
      <a
        href="https://www.linkedin.com/in/andriistavskyi"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
      >
        <PiLinkedinLogo size={28} />
      </a>
    </footer>
  );
};

export default Footer;
