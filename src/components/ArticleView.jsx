import React, { useState, useEffect } from 'react';
import { Clock, Eye, Database, Navigation, ThumbsUp } from 'lucide-react';
import { articles } from '../data/articles';

export default function ArticleView({ articleId, onBack }) {
  const article = articles.find((a) => a.id === articleId);

  if (!article) {
    return (
      <div style={{ textAlign: 'left', padding: '40px 0' }}>
        <button onClick={onBack} className="back-button">← Back to Articles</button>
        <h2>Article not found</h2>
      </div>
    );
  }

  // --- STATE FOR WIDGETS ---
  // Maps Widget
  const [trafficDensity, setTrafficDensity] = useState(40);
  const [weatherCondition, setWeatherCondition] = useState('clear');
  // Blinkit Widget
  const [storeDistance, setStoreDistance] = useState(1.2);
  const [pickerEfficiency, setPickerEfficiency] = useState(90);
  const [trafficLevel, setTrafficLevel] = useState('medium');
  // FIFA Widget
  const [bandwidth, setBandwidth] = useState(8);
  // Database Widget
  const [dbType, setDbType] = useState('sql');

  // --- VIEWS & LIKES SIMULATION STATE ---
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Initial baselines for mock counts
    const baselines = {
      maps: { views: 0, likes: 0 },
      blinkit: { views: 0, likes: 0 },
      fifa: { views: 0, likes: 0 }
    };

    const base = baselines[articleId] || { views: 0, likes: 0 };
    
    // Set immediate defaults so the user sees a number instantly
    setViews(base.views);
    setLikes(base.likes);
    
    const hasLiked = localStorage.getItem(`pmtech_liked_${articleId}`) === 'true';
    setIsLiked(hasLiked);

    // Call live API view increment
    fetch(`/api/view?id=${articleId}`)
      .then(res => res.json())
      .then(data => {
        if (data.fallback) {
          // LocalStorage fallback
          const storedViews = localStorage.getItem(`pmtech_views_${articleId}`);
          let currentViews = storedViews ? parseInt(storedViews) : base.views;
          currentViews += 1;
          localStorage.setItem(`pmtech_views_${articleId}`, currentViews);
          setViews(currentViews);

          const storedLikes = localStorage.getItem(`pmtech_likes_${articleId}`);
          setLikes(storedLikes ? parseInt(storedLikes) : base.likes);
        } else if (data.views) {
          setViews(data.views);
          // Also fetch likes from metrics
          fetch(`/api/metrics`)
            .then(res => res.json())
            .then(metrics => {
              if (metrics[articleId]) {
                setLikes(metrics[articleId].likes);
              }
            });
        }
      })
      .catch(() => {
        // Safe fallback in case of request block
        const storedViews = localStorage.getItem(`pmtech_views_${articleId}`);
        let currentViews = storedViews ? parseInt(storedViews) : base.views;
        currentViews += 1;
        localStorage.setItem(`pmtech_views_${articleId}`, currentViews);
        setViews(currentViews);

        const storedLikes = localStorage.getItem(`pmtech_likes_${articleId}`);
        setLikes(storedLikes ? parseInt(storedLikes) : base.likes);
      });
  }, [articleId]);

  const handleLike = () => {
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);

    // Optimistically update counts in UI
    setLikes(prev => nextLiked ? prev + 1 : prev - 1);

    const actionType = nextLiked ? 'like' : 'unlike';

    fetch(`/api/like?id=${articleId}&action=${actionType}`)
      .then(res => res.json())
      .then(data => {
        if (data.fallback) {
          // LocalStorage fallback
          const baselines = { maps: 0, blinkit: 0, fifa: 0 };
          const baseLikes = baselines[articleId] || 0;
          const storedLikes = localStorage.getItem(`pmtech_likes_${articleId}`);
          let currentLikes = storedLikes ? parseInt(storedLikes) : baseLikes;
          
          if (nextLiked) {
            currentLikes += 1;
          } else {
            currentLikes = Math.max(0, currentLikes - 1);
          }
          localStorage.setItem(`pmtech_likes_${articleId}`, currentLikes);
          setLikes(currentLikes);
          localStorage.setItem(`pmtech_liked_${articleId}`, nextLiked ? 'true' : 'false');
        } else if (data.likes) {
          setLikes(data.likes);
          localStorage.setItem(`pmtech_liked_${articleId}`, nextLiked ? 'true' : 'false');
        }
      })
      .catch(() => {
        // Fallback
        const baselines = { maps: 0, blinkit: 0, fifa: 0 };
        const baseLikes = baselines[articleId] || 0;
        const storedLikes = localStorage.getItem(`pmtech_likes_${articleId}`);
        let currentLikes = storedLikes ? parseInt(storedLikes) : baseLikes;
        
        if (nextLiked) {
          currentLikes += 1;
        } else {
          currentLikes = Math.max(0, currentLikes - 1);
        }
        localStorage.setItem(`pmtech_likes_${articleId}`, currentLikes);
        setLikes(currentLikes);
        localStorage.setItem(`pmtech_liked_${articleId}`, nextLiked ? 'true' : 'false');
      });
  };

  // --- CALCULATION HANDLERS ---
  const calculateMapsEta = () => {
    let baseTimeMin = 15; 
    let trafficDelay = (trafficDensity / 100) * 20; 
    let weatherDelay = weatherCondition === 'rain' ? 5 : weatherCondition === 'snow' ? 12 : 0;
    return Math.round(baseTimeMin + trafficDelay + weatherDelay);
  };

  const calculateBlinkitTime = () => {
    let pickTime = Math.max(1, (100 - pickerEfficiency) / 10 + 1.5); 
    let travelSpeedKmh = trafficLevel === 'low' ? 25 : trafficLevel === 'medium' ? 18 : 10;
    let travelTime = (storeDistance / travelSpeedKmh) * 60; 
    let total = pickTime + travelTime + 1; 
    return total.toFixed(1);
  };

  const getStreamingResolution = () => {
    if (bandwidth >= 15) return { label: '4K Ultra HD', resolution: '2160p', bitrate: '15 Mbps', badge: 'rgba(26, 137, 23, 0.1)', color: 'var(--primary)' };
    if (bandwidth >= 6) return { label: 'Full HD', resolution: '1080p', bitrate: '6 Mbps', badge: 'rgba(26, 137, 23, 0.1)', color: 'var(--primary)' };
    if (bandwidth >= 3) return { label: 'HD', resolution: '720p', bitrate: '3 Mbps', badge: 'rgba(0, 0, 0, 0.05)', color: 'var(--text-primary)' };
    if (bandwidth >= 1.5) return { label: 'SD Quality', resolution: '480p', bitrate: '1.5 Mbps', badge: 'rgba(223, 115, 0, 0.1)', color: 'var(--warning)' };
    return { label: 'Low (Buffering)', resolution: '240p', bitrate: '0.5 Mbps', badge: 'rgba(201, 42, 42, 0.1)', color: 'var(--error)' };
  };

  const streamInfo = getStreamingResolution();

  return (
    <div className="fade-in article-container" style={{ textAlign: 'left' }}>
      
      {/* Editorial Navigation Back */}
      <button onClick={onBack} className="back-button">
        ← Back to Articles
      </button>

      {/* Main Title Headers */}
      <h1 className="article-title-main">{article.title}</h1>
      <p className="article-subtitle-main">{article.subtitle}</p>

      {/* Author & Meta Row with Views & Likes */}
      <div className="article-header-meta" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div>
            By <span className="article-author">{article.author}</span> • {article.date}
          </div>
          <span>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Dynamic Views & Likes display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <Eye size={15} />
            <span>{views.toLocaleString()} views</span>
          </div>

          <button 
            onClick={handleLike}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: isLiked ? 'var(--primary)' : 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontWeight: isLiked ? '600' : '400',
              padding: '4px 8px',
              borderRadius: '99px',
              backgroundColor: isLiked ? 'rgba(26, 137, 23, 0.08)' : 'transparent',
              transition: 'all 0.15s ease',
              outline: 'none'
            }}
          >
            <ThumbsUp size={15} style={{ fill: isLiked ? 'var(--primary)' : 'none' }} />
            <span>{likes.toLocaleString()} likes</span>
          </button>
        </div>
      </div>

      {/* --- RENDER ARTICLE BODY --- */}
      <div className="article-body">
        
        {/* --- GOOGLE MAPS CONTENT --- */}
        {article.id === 'maps' && (
          <>
            <p>
              When you open Google Maps and plug in a destination, the system gives you an Estimated Time of Arrival (ETA) that seems almost psychic. Often, it predicts travel times down to the single minute, adjusting dynamically as you drive. How does this system coordinate millions of dynamic variables in real-time?
            </p>
            <p>
              The architecture of modern routing platforms does not simply divide total distance by static speed limits. Instead, it aggregates historical time tables, live crowdsourced telemetry, and machine learning models to calculate an optimal path mesh.
            </p>

            <h2>1. Dijkstra and A* Pathfinding Algorithms</h2>
            <p>
              Under the hood, a map is represented as a mathematical graph—a network of nodes (intersections) and edges (road segments). To find the path from A to B, the backend runs pathfinding algorithms like <strong>Dijkstra</strong> or its optimized cousin <strong>A* (A-Star)</strong>.
            </p>
            <p>
              These algorithms assign a "cost" (weight) to every road segment. At midnight, a highway segment's cost is low (you can drive the speed limit). During peak rush hour, the weight of that same segment spikes, forcing the algorithm to search for alternative nodes (side streets) to find the path of least resistance.
            </p>

            <h2>2. Historical Velocity Tables</h2>
            <p>
              To estimate what traffic will look like in the future, the system references historical databases. Google stores speed profiles for every road segment. For example, a highway segment that is 90km/h on a Sunday at 8 AM might average 12km/h on a Monday at 8:30 AM due to office commuters. If you schedule a trip for tomorrow, the engine utilizes this historical table as a baseline.
            </p>

            {/* Embedded Interactive Widget */}
            <div className="inline-widget">
              <h4>Interactive ETA Simulator</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 0, marginBottom: '20px' }}>
                Adjust the live traffic density and weather conditions below to see how Google Maps adjusts path weights and updates travel times in real-time.
              </p>

              <div className="grid-2">
                <div>
                  <div className="slider-container">
                    <div className="slider-label">
                      <span>Traffic Density</span>
                      <span className="slider-value">{trafficDensity}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" step="5"
                      value={trafficDensity} onChange={(e) => setTrafficDensity(Number(e.target.value))}
                      className="custom-slider"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Weather Condition</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {['clear', 'rain', 'snow'].map((w) => (
                        <button 
                          key={w}
                          onClick={() => setWeatherCondition(w)}
                          className={`btn ${weatherCondition === w ? 'btn-active' : ''}`}
                          style={{ flex: 1, padding: '6px' }}
                        >
                          {w.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ 
                  background: 'var(--bg-card)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '8px', 
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>Live ETA (10km Route)</div>
                  <h3 style={{ fontSize: '2.2rem', margin: '4px 0', color: 'var(--primary)' }}>{calculateMapsEta()} mins</h3>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Navigation size={12} />
                    <span>Calculated via A* Cost Weights</span>
                  </div>
                </div>
              </div>
            </div>

            <h2>3. Live GPS Crowdsourcing</h2>
            <p>
              The most critical dataset is live telemetry. When your phone is navigation mode, it periodically pings anonymized location and velocity telemetry back to Google. If 100 devices on a highway segment drop from 100km/h to 10km/h within 5 minutes, Google's system automatically flags a traffic jam, repaints the road segment red, and recalculates the routes of all drivers heading toward that segment.
            </p>
            <h2>4. Machine Learning Speed Predictions</h2>
            <p>
              Finally, predictive models combine all three layers. A machine learning model doesn't just look at the traffic ahead; it looks at traffic *trends*. It calculates whether traffic is clearing or worsening based on time of day, calendar events, weather alerts, and road closures, outputting the final, high-fidelity ETA.
            </p>
          </>
        )}

        {/* --- BLINKIT CONTENT --- */}
        {article.id === 'blinkit' && (
          <>
            <p>
              To deliver groceries in under 10 minutes, standard business wisdom suggests riders must speed through traffic. In reality, delivery partners driving recklessly would create high accident rates, insurance surcharges, and negative public branding. 
            </p>
            <p>
              Blinkit's 10-minute SLA (Service Level Agreement) is not achieved by riders driving faster; it is solved through **hyper-local real estate topology, micro-warehouse pathfinding, and predictive order batching**.
            </p>

            <h2>1. The Dark Store Topology</h2>
            <p>
              A traditional warehouse is located outside city limits, spanning huge square footage. A "Dark Store" is a small micro-fulfillment center (MFC), usually 1,500 to 2,500 square feet, tucked directly inside residential neighborhoods.
            </p>
            <p>
              Blinkit maps cities into small grids. Each dark store serves a strict radius of just 1.5 to 2.5 kilometers. By limiting the physical distance a rider has to travel to under 2km, the transit phase of delivery is compressed to a predictable 5 to 7 minutes without exceeding normal traffic speeds.
            </p>

            <h2>2. Optimized Picking Paths (Under 2 Minutes)</h2>
            <p>
              When you order groceries, the clock starts. Inside the dark store, items are organized purely for speed. There are no retail displays. Fast-moving items (milk, bread) are placed nearest to the dispatch table.
            </p>
            <p>
              The picker (the warehouse employee) receives a packing checklist on a handheld device. The picker app runs an internal routing algorithm that maps the absolute shortest path across the dark store aisles to collect the items, reducing picker travel time to under 90 seconds.
            </p>

            {/* Embedded Interactive Widget */}
            <div className="inline-widget">
              <h4>Blinkit Delivery Time Calculator</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 0, marginBottom: '20px' }}>
                Adjust customer distance and dark store packing efficiency to see how they impact delivery SLA guidelines.
              </p>

              <div className="grid-2">
                <div>
                  <div className="slider-container">
                    <div className="slider-label">
                      <span>Customer Distance</span>
                      <span className="slider-value">{storeDistance} km</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="3.5" step="0.1"
                      value={storeDistance} onChange={(e) => setStoreDistance(Number(e.target.value))}
                      className="custom-slider"
                    />
                  </div>

                  <div className="slider-container" style={{ marginTop: '12px' }}>
                    <div className="slider-label">
                      <span>Picker Efficiency</span>
                      <span className="slider-value">{pickerEfficiency}%</span>
                    </div>
                    <input 
                      type="range" min="30" max="100" step="5"
                      value={pickerEfficiency} onChange={(e) => setPickerEfficiency(Number(e.target.value))}
                      className="custom-slider"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Traffic Conditions</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {['low', 'medium', 'heavy'].map((t) => (
                        <button 
                          key={t}
                          onClick={() => setTrafficLevel(t)}
                          className={`btn ${trafficLevel === t ? 'btn-active' : ''}`}
                          style={{ flex: 1, padding: '6px' }}
                        >
                          {t.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ 
                  background: 'var(--bg-card)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '16px', 
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>Delivery SLA Time</div>
                  {(() => {
                    const time = Number(calculateBlinkitTime());
                    const success = time <= 10;
                    return (
                      <>
                        <h3 style={{ fontSize: '2.2rem', margin: '4px 0', color: success ? 'var(--primary)' : 'var(--error)' }}>
                          {time} mins
                        </h3>
                        <span className="badge badge-outline" style={{ fontSize: '0.7rem', color: success ? 'var(--primary)' : 'var(--error)', borderColor: success ? 'var(--primary)' : 'var(--error)' }}>
                          {success ? '✅ Within 10m SLA' : '❌ SLA Violated'}
                        </span>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            <h2>3. Predictive Rider Matching</h2>
            <p>
              In traditional delivery apps, a rider is assigned after the restaurant packs the meal. For a 10-minute delivery, this creates too much idle downtime. Blinkit's backend system tracks the locations of active riders. As soon as you place your order, the dispatch engine predicts when the package will be bagged and pre-assigns the nearest rider. The rider is pulling up to the warehouse gate just as the bag is sealed.
            </p>
            <h2>4. Route and Left-Turn Optimization</h2>
            <p>
              The navigation system on the rider's application utilizes customized maps. The system calculates routes that prioritize left turns (which do not require waiting for traffic light signals in right-hand driving traffic layouts) and avoids high-congestion traffic crossings. This ensures a consistent, smooth transit flow.
            </p>
          </>
        )}

        {/* --- FIFA STREAMING CONTENT --- */}
        {article.id === 'fifa' && (
          <>
            <p>
              When 50 million sports fans tune in to watch a World Cup penalty shootout live, the sudden surge in traffic is enough to crash standard web infrastructure. Traditional client-server connections function like a conversation: a client asks the server for video, and the server sends it. If 50 million clients ask at once, the server's network bandwidth saturates and it goes offline.
            </p>
            <p>
              To stream live media globally, developers utilize a combination of **video chunking, content delivery networks (CDNs), and client-side quality shifting**.
            </p>

            <h2>1. Video Chunking (HLS / DASH)</h2>
            <p>
              Instead of streaming a continuous 2-hour video file, the live video feed is captured at the stadium, immediately compressed, and sliced into tiny, individual files called "chunks" (usually 2 to 6 seconds long). 
            </p>
            <p>
              These chunks are created at different quality profiles (e.g. 1080p, 720p, 480p). The video player on your phone doesn't request a "stream"; it sequentially downloads these tiny chunk files one by one over standard web requests (HTTP), which are easy for servers to cache and deliver.
            </p>

            <h2>2. Content Delivery Networks (CDNs)</h2>
            <p>
              Rather than having all 50 million users download chunks from a single central host server, developers deploy a <strong>Content Delivery Network (CDN)</strong>.
            </p>
            <p>
              A CDN is a global network of "edge servers" located close to residential networks. When a video chunk is published, the CDN copies it to thousands of edge servers. When you click play, your device downloads the chunk from the closest edge server (often just a few miles away in your city), avoiding the long trip back to the host database.
            </p>

            {/* Embedded Interactive Widget */}
            <div className="inline-widget">
              <h4>Adaptive Bitrate Player Simulator</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 0, marginBottom: '20px' }}>
                Adjust the network connection slider below. Watch how the player dynamically shifts video resolutions to prevent stream buffering.
              </p>

              <div className="grid-2">
                <div>
                  <div className="slider-container">
                    <div className="slider-label">
                      <span>Network Bandwidth</span>
                      <span className="slider-value">{bandwidth} Mbps</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="20" step="0.5"
                      value={bandwidth} onChange={(e) => setBandwidth(Number(e.target.value))}
                      className="custom-slider"
                    />
                  </div>
                  
                  <div style={{ marginTop: '16px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    <strong>Adaptive Bitrate (ABR) Mechanics:</strong> The player code monitors download speeds. If speeds drop, it requests a lower-resolution chunk (e.g. 480p) to keep the video playing smoothly, rather than stalling to load 1080p.
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Simulated Video Screen */}
                  <div style={{
                    background: '#000',
                    borderRadius: '6px',
                    height: '130px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid var(--border-color)'
                  }}>
                    {/* Simulated blurred video */}
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      backgroundImage: 'url("https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=300&q=80")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: bandwidth >= 15 ? 'none' : bandwidth >= 6 ? 'blur(1px)' : bandwidth >= 3 ? 'blur(3px)' : bandwidth >= 1.5 ? 'blur(5px)' : 'blur(10px)',
                      opacity: 0.5,
                      transition: 'filter 0.2s ease'
                    }} />
                    
                    <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                      <span className="badge" style={{ backgroundColor: streamInfo.badge, color: streamInfo.color, fontWeight: '700' }}>
                        {streamInfo.label} ({streamInfo.resolution})
                      </span>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    Data Rate: {streamInfo.bitrate}
                  </div>
                </div>
              </div>
            </div>

            <h2>3. Anycast Routing</h2>
            <p>
              To ensure users route to the correct edge node, CDNs use <strong>Anycast routing</strong>. Multiple servers globally share the exact same IP address. Routers on the internet automatically send requests down the shortest physical path, naturally load balancing millions of users across nodes.
            </p>
          </>
        )}

      </div>
    </div>
  );
}
