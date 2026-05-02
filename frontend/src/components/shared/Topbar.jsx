import { LogOut, Menu, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function Topbar({ onMenu }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-gray-800 dark:bg-gray-900/90 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center gap-4">
        <button className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden" onClick={onMenu} aria-label="Open sidebar"><Menu /></button>
        <div className="hidden flex-1 items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-gray-500 dark:border-gray-800 dark:bg-gray-950 md:flex">
          <Search size={18} />
          <span className="text-sm">Search notes, tasks, deadlines</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <button className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-800" onClick={logout} aria-label="Log out"><LogOut size={20} /></button>
        </div>
      </div>
    </header>
  );
}
