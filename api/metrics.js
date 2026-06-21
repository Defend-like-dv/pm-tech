import { kv } from '@vercel/kv';

const IDS = [
  'maps', 'blinkit', 'fifa',
  'react', 'html-css', 'rendering', 'nodejs', 'django',
  'postgres', 'mongo', 'redis', 'rest', 'graphql', 'webhooks'
];

export default async function handler(request, response) {
  // If the KV database environment variables are not configured, return fallback mock stats
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    const fallback = { fallback: true };
    IDS.forEach(id => {
      fallback[id] = { views: 0, likes: 0 };
    });
    return response.status(200).json(fallback);
  }

  try {
    // Fetch raw keys from Redis KV in parallel
    const promises = IDS.map(id => 
      Promise.all([kv.get(`views:${id}`), kv.get(`likes:${id}`)])
    );
    const results = await Promise.all(promises);

    const responsePayload = {};
    IDS.forEach((id, index) => {
      const [views, likes] = results[index];
      responsePayload[id] = {
        views: parseInt(views) || 0,
        likes: parseInt(likes) || 0
      };
    });

    return response.status(200).json(responsePayload);
  } catch (error) {
    console.error("KV Error:", error);
    return response.status(500).json({ error: error.message });
  }
}
