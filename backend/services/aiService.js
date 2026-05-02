const MarkdownIt = require('markdown-it');
const { openai, model } = require('../config/openai');

const md = new MarkdownIt({ html: false, linkify: true, breaks: true });

const fallback = (label) => ({
  content: `${label} is unavailable because OPENAI_API_KEY is not configured. Add your key in backend/.env to enable live AI responses.`,
  provider: 'local-fallback'
});

const runPrompt = async (messages, label = 'AI') => {
  if (!openai) return fallback(label);

  const completion = await openai.chat.completions.create({
    model,
    messages,
    temperature: 0.4
  });

  return {
    content: completion.choices[0]?.message?.content || '',
    provider: 'openai'
  };
};

const renderMarkdown = (content) => md.render(content || '');

module.exports = { runPrompt, renderMarkdown };