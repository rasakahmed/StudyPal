import { X } from 'lucide-react';

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 p-4">
      <section className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-soft dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
          <button className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose} aria-label="Close modal"><X size={18} /></button>
        </div>
        <div className="mt-4">{children}</div>
      </section>
    </div>
  );
}
