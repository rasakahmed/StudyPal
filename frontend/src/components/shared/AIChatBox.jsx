import { useState } from 'react';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { aiService } from '../../services/aiService';

export default function AIChatBox() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'What are we studying today?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    const next = [...messages, { role: 'user', content: input.trim() }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const reply = await aiService.chat(next);
      setMessages([...next, { role: 'assistant', content: reply.content }]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'AI request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card flex h-[calc(100vh-11rem)] flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto pr-2">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm ${message.role === 'user' ? 'ml-auto bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
            {message.content}
          </div>
        ))}
        {loading && <div className="rounded-2xl bg-gray-100 px-4 py-3 text-sm dark:bg-gray-800">Thinking...</div>}
      </div>
      <form onSubmit={send} className="mt-4 flex gap-3">
        <input className="input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask for help, a plan, or a summary" />
        <button className="btn-primary" aria-label="Send message"><Send size={18} /></button>
      </form>
    </section>
  );
}
