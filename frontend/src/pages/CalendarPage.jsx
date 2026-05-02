import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';
import Loader from '../components/ui/Loader.jsx';
import { useAsync } from '../hooks/useAsync';
import { calendarService } from '../services/calendarService';

const initial = { title: '', description: '', date: '', category: 'event' };

export default function CalendarPage() {
  const [form, setForm] = useState(initial);
  const { data: events, setData: setEvents, loading } = useAsync(() => calendarService.list(), []);

  const create = async (event) => {
    event.preventDefault();
    const created = await calendarService.create(form);
    setEvents([created, ...(events || [])]);
    setForm(initial);
    toast.success('Event added');
  };

  if (loading || !events) return <Loader />;

  return (
    <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
      <section className="card h-fit">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <form onSubmit={create} className="mt-5 space-y-3">
          <input className="input" placeholder="Event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <textarea className="input min-h-24" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className="input" type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="event">Event</option><option value="deadline">Deadline</option><option value="assignment">Assignment</option><option value="study">Study session</option>
          </select>
          <button className="btn-primary w-full"><Plus size={18} /> Add event</button>
        </form>
      </section>
      <section className="card overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
          events={events.map((event) => ({ id: String(event.id), title: event.title, start: event.date, className: `calendar-${event.category}` }))}
          height="auto"
        />
      </section>
    </div>
  );
}
