// @ts-nocheck
import express, { Request, Response } from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/stream', async (req: Request, res: Response) => {
  const { message } = req.body as { message: string };
  const promptQuery = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: message }
  ];

  const client = new OpenAI({ apiKey: 'OPEN_AI_KEY' });

  try {
    const stream = await client.chat.completions.create({
      model: 'MODEL_NAME',
      stream: true,
      stream_options: {
        include_usage: true
      },
      messages: promptQuery
    });

    for await (const chunk of stream) {
      const delta = chunk.choices?.[0]?.delta?.content || '';
      if (delta) {
        res.write(delta);
      }
    }
    res.end();
  } catch (error) {
    console.error('Error during streaming:', error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
