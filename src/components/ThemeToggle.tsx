import { useTheme } from "../hooks/useTheme";
import { PiSun, PiMoon } from "react-icons/pi";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <PiMoon size={24} /> : <PiSun size={24} />}
    </button>
  );
};

export default ThemeToggle;
