import { Bot, CalendarClock, CheckCircle2, HeartPulse, NotebookText, Plus, Wallet } from 'lucide-react';
import DashboardCard from '../components/ui/DashboardCard.jsx';
import ChartCard from '../components/ui/ChartCard.jsx';
import Loader from '../components/ui/Loader.jsx';
import { useAsync } from '../hooks/useAsync';
import { tasksService } from '../services/tasksService';
import { notesService } from '../services/notesService';
import { calendarService } from '../services/calendarService';
import { financeService } from '../services/financeService';
import { habitService } from '../services/habitService';
import { money, shortDate } from '../utils/formatters';

export default function DashboardPage() {
  const { data, loading } = useAsync(async () => {
    const [tasks, notes, events, expenses, habits] = await Promise.all([
      tasksService.list(),
      notesService.list(),
      calendarService.list(),
      financeService.list(),
      habitService.list()
    ]);
    return { tasks, notes, events, expenses, habits };
  }, []);

  if (loading || !data) return <Loader />;

  const pending = data.tasks.filter((task) => !task.completed);
  const monthlySpend = data.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const chartData = {
    labels: data.habits.slice(0, 7).reverse().map((habit) => shortDate(habit.date)),
    datasets: [{ data: data.habits.slice(0, 7).reverse().map((habit) => Number(habit.studyHours)), borderColor: '#4f46e5', backgroundColor: '#a78bfa', tension: 0.35 }]
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-gray-500">Today’s workload, wellbeing, and money in one place.</p>
        </div>
        <button className="btn-primary"><Plus size={18} /> Quick action</button>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Today Tasks" value={pending.length} icon={CheckCircle2} />
        <DashboardCard title="Upcoming Deadlines" value={data.events.length} icon={CalendarClock} tone="purple" />
        <DashboardCard title="Recent Notes" value={data.notes.length} icon={NotebookText} tone="green" />
        <DashboardCard title="Monthly Spend" value={money(monthlySpend)} icon={Wallet} tone="amber" />
      </section>
      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <ChartCard title="Study Hours" data={chartData} />
        <DashboardCard title="AI Productivity Suggestions" icon={Bot} tone="purple">
          <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">Protect one deep-study block before noon, batch small tasks after classes, and review your most recent note before starting new work.</p>
        </DashboardCard>
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        <DashboardCard title="Upcoming Deadlines">
          <div className="space-y-3">{data.events.slice(0, 4).map((event) => <div key={event.id} className="flex justify-between rounded-xl bg-gray-50 p-3 text-sm dark:bg-gray-800"><span>{event.title}</span><span>{shortDate(event.date)}</span></div>)}</div>
        </DashboardCard>
        <DashboardCard title="Recent Notes">
          <div className="space-y-3">{data.notes.slice(0, 4).map((note) => <div key={note.id} className="rounded-xl bg-gray-50 p-3 text-sm dark:bg-gray-800">{note.title}</div>)}</div>
        </DashboardCard>
        <DashboardCard title="Habit Tracker" icon={HeartPulse} tone="green">
          <p className="text-sm text-gray-500">Current streak</p>
          <p className="mt-2 text-4xl font-bold">{data.habits[0]?.streak || 0} days</p>
        </DashboardCard>
      </section>
    </div>
  );
}
