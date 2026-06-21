export const articles = [
  {
    id: "maps",
    title: "How Google Maps Estimates Your ETA",
    subtitle: "Behind the math and machine learning that predicts your journey down to the minute.",
    category: "System Design",
    readTime: "4 min read",
    date: "Jun 21, 2026",
    author: "PM-Tech Editorial",
    teaser: "Ever wondered how Google knows there is a traffic jam on your route before you even hit it? Discover Dijkstra's algorithm, historical velocity caches, and live crowdsourced telemetry.",
    summary: "ETA calculations require layers of data: routing meshes, historical time tables, real-time user GPS pings, and machine learning models adjusting for weather and construction events."
  },
  {
    id: "blinkit",
    title: "The Engineering Behind Blinkit's 10-Minute Delivery SLA",
    subtitle: "It's not about riders speeding. It's about dark stores, optimized pick paths, and predictive logistics.",
    category: "Logistics Tech",
    readTime: "5 min read",
    date: "Jun 20, 2026",
    author: "PM-Tech Editorial",
    teaser: "Delivering groceries in under ten minutes seems impossible. The secret lies in a hyper-local topology of dark stores, optimized picking layouts, and dispatch algorithms.",
    summary: "Blinkit maintains short delivery times through 2km dark store radii, aisle pathfinding apps for warehouse pickers, and dispatch matching systems."
  },
  {
    id: "fifa",
    title: "Streaming the World Cup: How to Serve 50 Million Viewers",
    subtitle: "An introduction to video encoding, Content Delivery Networks (CDNs), and Adaptive Bitrate Streaming.",
    category: "Cloud Tech",
    readTime: "4 min read",
    date: "Jun 18, 2026",
    author: "PM-Tech Editorial",
    teaser: "When millions of users stream live sports simultaneously, standard servers crash. Learn how HLS slice compression, edge caches, and connection-aware quality shifting prevent buffering.",
    summary: "Scalable streaming relies on slicing video streams, caching chunks on CDN edge servers close to users, and player client-side adaptive bitrate switching."
  }
];
