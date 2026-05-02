const { runPrompt } = require('../services/aiService');

exports.chat = async (req, res, next) => {
  try {
    const history = Array.isArray(req.body.messages) ? req.body.messages : [];
    const result = await runPrompt([
      { role: 'system', content: 'You are StudyPal, a concise student productivity coach. Help with studying, planning, summaries, and homework explanations without doing academic dishonesty.' },
      ...history.slice(-12)
    ], 'AI chat');
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.productivity = async (req, res, next) => {
  try {
    const result = await runPrompt([
      { role: 'system', content: 'Give practical productivity suggestions for a student dashboard using tasks, deadlines, habits, and expenses.' },
      { role: 'user', content: JSON.stringify(req.body.context || {}) }
    ], 'Productivity suggestions');
    res.json(result);
  } catch (error) {
    next(error);
  }
};
