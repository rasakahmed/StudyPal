import { NavLink } from 'react-router-dom';
import { BarChart3, Bot, CalendarDays, CheckSquare, HeartPulse, NotebookText, Wallet, X, GraduationCap } from 'lucide-react';

const items = [
  { to: '/', label: 'Dashboard', icon: BarChart3 },
  
  { to: '/notes', label: 'Notes', icon: NotebookText },
  
  
  { to: '/habits', label: 'Health', icon: HeartPulse },
  { to: '/assistant', label: 'AI Assistant', icon: Bot }
];

export default function Sidebar({ open, onClose }) {
  const base = 'fixed inset-y-0 left-0 z-40 w-72 border-r border-gray-200 bg-white px-4 py-5 transition dark:border-gray-800 dark:bg-gray-900 lg:translate-x-0';
  return (
    <>
      <aside className={`${base} ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xl font-bold text-primary-700 dark:text-primary-100">
            <span className="rounded-2xl bg-primary-600 p-2 text-white"><GraduationCap size={22} /></span>
            StudyPal
          </div>
          <button className="rounded-xl p-2 lg:hidden" onClick={onClose} aria-label="Close sidebar"><X /></button>
        </div>
        <nav className="mt-8 space-y-1">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      {open && <button className="fixed inset-0 z-30 bg-gray-950/40 lg:hidden" onClick={onClose} aria-label="Close overlay" />}
    </>
  );
}
