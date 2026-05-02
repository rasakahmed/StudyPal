import AIChatBox from '../components/shared/AIChatBox.jsx';

export default function AIAssistantPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <p className="mt-1 text-gray-500">Ask for study plans, note summaries, coaching, or homework explanations.</p>
      </div>
      <AIChatBox />
    </div>
  );
}
