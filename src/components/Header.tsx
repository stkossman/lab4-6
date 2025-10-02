import { PiGithubLogo, PiLinkedinLogo } from "react-icons/pi";
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  return (
    <header className="flex justify-end items-center gap-4 p-4">
        <a
          href="https://github.com/stkossman"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
          aria-label="GitHub Profile"
        >
          <PiGithubLogo size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/andriistavskyi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
          aria-label="LinkedIn Profile"
        >
          <PiLinkedinLogo size={24} />
        </a>
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" /> {/* Divider */}
        <ThemeToggle />
      </header>
  );
};

export default Header;
