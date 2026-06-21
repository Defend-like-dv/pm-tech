import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  // If the KV database environment variables are not configured, return fallback mock stats
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return response.status(200).json({
      fallback: true,
      maps: { views: 0, likes: 0 },
      blinkit: { views: 0, likes: 0 },
      fifa: { views: 0, likes: 0 }
    });
  }

  try {
    // Fetch raw keys from Redis KV
    const [mapsViews, mapsLikes, blinkitViews, blinkitLikes, fifaViews, fifaLikes] = await Promise.all([
      kv.get('views:maps'),
      kv.get('likes:maps'),
      kv.get('views:blinkit'),
      kv.get('likes:blinkit'),
      kv.get('views:fifa'),
      kv.get('likes:fifa')
    ]);

    // Return populated results including initial baseline values
    return response.status(200).json({
      maps: { views: parseInt(mapsViews) || 0, likes: parseInt(mapsLikes) || 0 },
      blinkit: { views: parseInt(blinkitViews) || 0, likes: parseInt(blinkitLikes) || 0 },
      fifa: { views: parseInt(fifaViews) || 0, likes: parseInt(fifaLikes) || 0 }
    });
  } catch (error) {
    console.error("KV Error:", error);
    return response.status(500).json({ error: error.message });
  }
}
