export default function DashboardCard({ title, value, icon: Icon, children, tone = 'indigo' }) {
  const tones = {
    indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200',
    purple: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-200',
    green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200'
  };
  return (
    <section className="card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {value !== undefined && <p className="mt-2 text-3xl font-bold">{value}</p>}
        </div>
        {Icon && <span className={`rounded-2xl p-3 ${tones[tone]}`}><Icon size={22} /></span>}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </section>
  );
}
