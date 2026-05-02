import { useState } from 'react';
import toast from 'react-hot-toast';
import { Check, Plus, Trash2 } from 'lucide-react';
import EmptyState from '../components/ui/EmptyState.jsx';
import Loader from '../components/ui/Loader.jsx';
import { useAsync } from '../hooks/useAsync';
import { tasksService } from '../services/tasksService';
import { shortDate } from '../utils/formatters';

const initial = { title: '', description: '', dueDate: '', priority: 'medium', category: 'Study' };

export default function TasksPage() {
  const [tab, setTab] = useState('pending');
  const [form, setForm] = useState(initial);
  const { data: tasks, setData: setTasks, loading } = useAsync(() => tasksService.list(), []);

  const create = async (event) => {
    event.preventDefault();
    const task = await tasksService.create(form);
    setTasks([task, ...(tasks || [])]);
    setForm(initial);
    toast.success('Task added');
  };

  const toggle = async (task) => {
    const updated = await tasksService.update(task.id, { completed: !task.completed });
    setTasks(tasks.map((item) => (item.id === task.id ? updated : item)));
  };

  const remove = async (id) => {
    await tasksService.remove(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  if (loading || !tasks) return <Loader />;
  const visible = tasks.filter((task) => (tab === 'completed' ? task.completed : !task.completed));

  return (
    <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
      <section className="card">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <form onSubmit={create} className="mt-5 space-y-3">
          <input className="input" placeholder="Task title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <textarea className="input min-h-24" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className="input" type="datetime-local" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <select className="input" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
              <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
            </select>
            <input className="input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <button className="btn-primary w-full"><Plus size={18} /> Add task</button>
        </form>
      </section>
      <section className="card">
        <div className="flex gap-2">
          {['pending', 'completed'].map((item) => <button key={item} className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize ${tab === item ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`} onClick={() => setTab(item)}>{item}</button>)}
        </div>
        <div className="mt-5 space-y-3">
          {visible.length === 0 && <EmptyState title="No tasks in this view" />}
          {visible.map((task) => (
            <article key={task.id} className="flex items-start gap-3 rounded-2xl border border-gray-100 p-4 dark:border-gray-800">
              <button onClick={() => toggle(task)} className={`mt-1 rounded-lg border p-1 ${task.completed ? 'bg-primary-600 text-white' : 'border-gray-300'}`} aria-label="Toggle complete"><Check size={16} /></button>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{task.title}</h3>
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs capitalize dark:bg-gray-800">{task.priority}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                <p className="mt-2 text-xs text-gray-400">{task.category} · {shortDate(task.dueDate)}</p>
              </div>
              <button onClick={() => remove(task.id)} className="rounded-xl p-2 text-gray-400 hover:text-red-600" aria-label="Delete task"><Trash2 size={18} /></button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
