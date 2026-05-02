import { useState } from 'react';
import toast from 'react-hot-toast';
import { Droplets, Dumbbell, Moon, Save, Timer } from 'lucide-react';
import DashboardCard from '../components/ui/DashboardCard.jsx';
import Loader from '../components/ui/Loader.jsx';
import { useAsync } from '../hooks/useAsync';
import { habitService } from '../services/habitService';
import { todayIso } from '../utils/formatters';

export default function HabitsPage() {
  const { data: habits, setData: setHabits, loading } = useAsync(() => habitService.list(), []);
  const [form, setForm] = useState({ date: todayIso(), waterIntake: 6, sleepHours: 7, studyHours: 3, workout: false });

  const save = async (event) => {
    event.preventDefault();
    const habit = await habitService.upsert(form);
    setHabits([habit, ...(habits || []).filter((item) => item.id !== habit.id)]);
    toast.success('Habit entry saved');
  };

  if (loading || !habits) return <Loader />;
  const latest = habits[0] || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Health & Habits</h1>
        <p className="mt-1 text-gray-500">Small daily inputs, visible weekly progress.</p>
      </div>
      <section className="grid gap-4 md:grid-cols-4">
        <DashboardCard title="Water" value={latest.waterIntake || 0} icon={Droplets} />
        <DashboardCard title="Sleep" value={`${latest.sleepHours || 0}h`} icon={Moon} tone="purple" />
        <DashboardCard title="Study" value={`${latest.studyHours || 0}h`} icon={Timer} tone="green" />
        <DashboardCard title="Streak" value={latest.streak || 0} icon={Dumbbell} tone="amber" />
      </section>
      <section className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
        <form onSubmit={save} className="card h-fit space-y-3">
          <h2 className="text-xl font-bold">Today</h2>
          <input className="input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input className="input" type="number" placeholder="Water glasses" value={form.waterIntake} onChange={(e) => setForm({ ...form, waterIntake: e.target.value })} />
          <input className="input" type="number" step="0.5" placeholder="Sleep hours" value={form.sleepHours} onChange={(e) => setForm({ ...form, sleepHours: e.target.value })} />
          <input className="input" type="number" step="0.5" placeholder="Study hours" value={form.studyHours} onChange={(e) => setForm({ ...form, studyHours: e.target.value })} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.workout} onChange={(e) => setForm({ ...form, workout: e.target.checked })} /> Workout completed</label>
          <button className="btn-primary w-full"><Save size={18} /> Save habits</button>
        </form>
        <div className="card">
          <h2 className="text-xl font-bold">Weekly progress</h2>
          <div className="mt-5 space-y-4">
            {habits.slice(0, 7).map((habit) => (
              <div key={habit.id}>
                <div className="mb-1 flex justify-between text-sm"><span>{habit.date}</span><span>{habit.studyHours} study hours</span></div>
                <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-800"><div className="h-3 rounded-full bg-primary-600" style={{ width: `${Math.min(Number(habit.studyHours) * 12.5, 100)}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
