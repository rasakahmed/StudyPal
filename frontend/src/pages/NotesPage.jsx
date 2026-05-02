import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import toast from 'react-hot-toast';
import { Bot, FilePlus, Save, Sparkles, Trash2 } from 'lucide-react';
import Loader from '../components/ui/Loader.jsx';
import { useAsync } from '../hooks/useAsync';
import { notesService } from '../services/notesService';

export default function NotesPage() {
  const { data: notes, setData: setNotes, loading } = useAsync(() => notesService.list(), []);
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState('');
  const [aiOutput, setAiOutput] = useState('');

  useEffect(() => {
    if (notes?.length && !active) setActive(notes[0]);
  }, [notes, active]);

  const create = async () => {
    const note = await notesService.create({ title: 'Untitled note', content: '', tags: [] });
    setNotes([note, ...(notes || [])]);
    setActive(note);
  };

  const save = async () => {
    const updated = await notesService.update(active.id, active);
    setNotes(notes.map((note) => (note.id === updated.id ? updated : note)));
    toast.success('Note saved');
  };

  const remove = async () => {
    await notesService.remove(active.id);
    const next = notes.filter((note) => note.id !== active.id);
    setNotes(next);
    setActive(next[0] || null);
  };

  const runAi = async (kind) => {
    const result = kind === 'summary' ? await notesService.summarize(active.content) : await notesService.flashcards(active.content);
    setAiOutput(result.content);
  };

  if (loading || !notes) return <Loader />;
  const filtered = notes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="grid gap-6 xl:grid-cols-[21rem_1fr]">
      <aside className="card h-fit">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Notes</h1>
          <button className="btn-secondary px-3" onClick={create} aria-label="Create note"><FilePlus size={18} /></button>
        </div>
        <input className="input mt-4" placeholder="Search notes" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="mt-4 space-y-2">
          {filtered.map((note) => (
            <button key={note.id} onClick={() => setActive(note)} className={`w-full rounded-2xl p-3 text-left text-sm transition ${active?.id === note.id ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-100' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <span className="font-semibold">{note.title}</span>
              <span className="mt-1 block text-xs text-gray-500">{(note.tags || []).join(', ') || 'No tags'}</span>
            </button>
          ))}
        </div>
      </aside>
      <section className="card min-h-[calc(100vh-9rem)]">
        {!active ? <p className="text-gray-500">Create a note to start writing.</p> : (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <input className="input max-w-xl text-lg font-bold" value={active.title} onChange={(e) => setActive({ ...active, title: e.target.value })} />
              <button className="btn-primary" onClick={save}><Save size={18} /> Save</button>
              <button className="btn-secondary" onClick={() => runAi('summary')}><Sparkles size={18} /> AI Summary</button>
              <button className="btn-secondary" onClick={() => runAi('flashcards')}><Bot size={18} /> Flashcards</button>
              <button className="btn-secondary text-red-600" onClick={remove}><Trash2 size={18} /> Delete</button>
            </div>
            <ReactQuill theme="snow" value={active.content} onChange={(content) => setActive({ ...active, content })} className="bg-white dark:bg-gray-950" />
            {aiOutput && <div className="rounded-2xl bg-gray-50 p-4 text-sm leading-6 dark:bg-gray-800 whitespace-pre-wrap">{aiOutput}</div>}
          </div>
        )}
      </section>
    </div>
  );
}
