import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  const { id, action } = request.query;

  if (!id || !action) {
    return response.status(400).json({ error: "Missing id or action parameter" });
  }

  // Fallback check
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return response.status(200).json({ fallback: true });
  }

  try {
    let newLikes;
    
    if (action === 'like') {
      newLikes = await kv.incr(`likes:${id}`);
    } else if (action === 'unlike') {
      newLikes = await kv.decr(`likes:${id}`);
    } else {
      return response.status(400).json({ error: "Invalid action parameter" });
    }

    const baselines = { maps: 0, blinkit: 0, fifa: 0 };
    const baseOffset = baselines[id] || 0;

    return response.status(200).json({ 
      id, 
      likes: newLikes + baseOffset 
    });
  } catch (error) {
    console.error("KV like increment/decrement error:", error);
    return response.status(500).json({ error: error.message });
  }
}
