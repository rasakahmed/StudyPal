import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="rounded-xl border border-gray-200 p-2 text-gray-600 hover:text-primary-700 dark:border-gray-700 dark:text-gray-200" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}
