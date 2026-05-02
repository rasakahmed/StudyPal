const OpenAI = require('openai');

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

module.exports = {
  openai,
  model: process.env.OPENAI_MODEL || 'gpt-4o-mini'
};