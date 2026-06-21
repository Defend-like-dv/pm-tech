import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  const { id } = request.query;

  if (!id) {
    return response.status(400).json({ error: "Missing article id parameter" });
  }

  // Fallback check
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return response.status(200).json({ fallback: true });
  }

  try {
    // Increment the key views:[id] in Redis
    const newViews = await kv.incr(`views:${id}`);
    
    // Baselines offsets to return correct totals
    const baselines = { maps: 0, blinkit: 0, fifa: 0 };
    const baseOffset = baselines[id] || 0;

    return response.status(200).json({ 
      id, 
      views: newViews + baseOffset 
    });
  } catch (error) {
    console.error("KV view increment error:", error);
    return response.status(500).json({ error: error.message });
  }
}
