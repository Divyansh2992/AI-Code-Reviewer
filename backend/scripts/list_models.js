const OpenAI = require('openai');
require('dotenv').config();

const client = new OpenAI({ apiKey: process.env.GROQ_API_KEY, baseURL: 'https://api.groq.com/openai/v1' });

(async () => {
  try {
    console.log('Listing models...');
    const res = await client.models.list();
    console.log(JSON.stringify(res, null, 2));
  } catch (err) {
    console.error('Error listing models:', err);
  }
})();
