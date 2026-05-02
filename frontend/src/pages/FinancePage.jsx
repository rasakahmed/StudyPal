import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from 'chart.js';
import toast from 'react-hot-toast';
import { Plus, Trash2 } from 'lucide-react';
import Loader from '../components/ui/Loader.jsx';
import { useAsync } from '../hooks/useAsync';
import { financeService } from '../services/financeService';
import { money, todayIso } from '../utils/formatters';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const initial = { amount: '', category: 'Food', date: todayIso() };

export default function FinancePage() {
  const [form, setForm] = useState(initial);
  const { data, setData, loading, refetch } = useAsync(async () => {
    const [expenses, analytics] = await Promise.all([financeService.list(), financeService.analytics()]);
    return { expenses, analytics };
  }, []);

  const create = async (event) => {
    event.preventDefault();
    await financeService.create(form);
    setForm(initial);
    toast.success('Expense tracked');
    refetch();
  };

  const remove = async (id) => {
    await financeService.remove(id);
    setData({ ...data, expenses: data.expenses.filter((expense) => expense.id !== id) });
  };

  if (loading || !data) return <Loader />;
  const total = data.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const chartData = {
    labels: data.analytics.monthly.map((row) => `M${row.month}`),
    datasets: [{ data: data.analytics.monthly.map((row) => Number(row.total)), backgroundColor: '#4f46e5', borderRadius: 10 }]
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
      <section className="card h-fit">
        <h1 className="text-2xl font-bold">Finance</h1>
        <p className="mt-2 text-4xl font-bold">{money(total)}</p>
        <p className="text-sm text-gray-500">Tracked spending</p>
        <form onSubmit={create} className="mt-6 space-y-3">
          <input className="input" type="number" step="0.01" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
          <input className="input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <input className="input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <button className="btn-primary w-full"><Plus size={18} /> Add expense</button>
        </form>
      </section>
      <section className="space-y-6">
        <div className="card h-72">
          <h2 className="text-lg font-bold">Monthly spending</h2>
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
        </div>
        <div className="card">
          <h2 className="text-lg font-bold">Recent expenses</h2>
          <div className="mt-4 space-y-3">
            {data.expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between rounded-2xl bg-gray-50 p-3 dark:bg-gray-800">
                <span className="font-medium">{expense.category}</span>
                <div className="flex items-center gap-3">
                  <span>{money(expense.amount)}</span>
                  <button className="text-gray-400 hover:text-red-600" onClick={() => remove(expense.id)} aria-label="Delete expense"><Trash2 size={17} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
