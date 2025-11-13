import axios from 'axios';

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const MODEL_NAME = process.env.OLLAMA_MODEL || 'llama3';

class OllamaService {
  async generateResponse(prompt, context = '') {
    try {
      const systemPrompt = `You are EduAdvisor AI, a helpful career guidance counselor for students in Jammu & Kashmir, India. 
      You provide practical advice about education, careers, colleges, and courses available in the region.
      Be friendly, supportive, and give specific, actionable advice.
      ${context ? `Context: ${context}` : ''}`;

      const fullPrompt = `${systemPrompt}\n\nUser: ${prompt}\nAssistant:`;

      const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
        model: MODEL_NAME,
        prompt: fullPrompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 500
        }
      });

      return response.data.response;
    } catch (error) {
      console.error('Ollama API Error:', error.message);
      throw new Error('Failed to generate AI response');
    }
  }

  async isHealthy() {
    try {
      const response = await axios.get(`${OLLAMA_URL}/api/tags`);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}

export default new OllamaService();