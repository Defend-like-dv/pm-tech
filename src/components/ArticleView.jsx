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
              When you plug a destination into Google Maps, the app displays an Estimated Time of Arrival (ETA) that adjusts in real-time with sub-minute accuracy. Rather than simply dividing distance by the speed limit, Google Maps operates a highly distributed infrastructure that orchestrates live crowdsourced telemetry, historical velocity tables, graph routing networks, and deep neural network models in parallel.
            </p>

            <h2>1. System Architecture Flow</h2>
            <p>
              To process billions of updates, Google Maps splits operations into telemetry stream ingestion, database cache retrieval, machine learning predictions, and graph pathfinding. The high-level pipeline behaves as follows:
            </p>
            <pre style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '8px', 
              padding: '16px', 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.72rem', 
              color: 'var(--text-primary)',
              lineHeight: '1.35',
              overflowX: 'auto',
              marginBottom: '24px'
            }}>
{`[User Devices (GPS Telemetry)]
          │ (Periodical HTTP POST requests)
          ▼
   [API Gateway] ──(Ingestion Buffer)──► [Apache Kafka]
                                                │
                                                ▼
 [Historical Cache (BigTable)] ◄──────── [Apache Flink]
          │ (Pre-calculated            (Real-Time Stream
          │  Velocity Baselines)        Velocity Processor)
          ▼
 [Predictive GNN Model Server] ◄──────── (Live Speeds & Jams)
          │ (Machine Learning yields dynamic edge weights
          │  by blending historical + live traffic layers)
          ▼
  [Routing Engine (C++ / A*)]
          │ (Calculates least-cost path on road segment graph)
          ▼
  [Estimated Time of Arrival (ETA)] ──► [Returned to Client App]`}
            </pre>

            <h2>2. Dijkstra, A*, and Contraction Hierarchies</h2>
            <p>
              At its foundation, a map is represented as a mathematical directed graph, where intersections are <strong>nodes</strong> and road segments are <strong>edges</strong>. Standard pathfinding uses <strong>Dijkstra's algorithm</strong> to find the shortest path by evaluating the edge weights (travel times) of all neighboring nodes.
            </p>
            <p>
              To run this globally, Google uses optimized algorithms like <strong>A* (A-Star)</strong>, which adds a heuristic distance estimator (e.g., straight-line distance to the target) to search only in the direction of the destination. Additionally, they use <strong>Contraction Hierarchies</strong>—a pre-computation technique that identifies major highway intersections ("shortcuts") and bypasses local streets entirely during long-range route calculations, reducing query time from seconds to milliseconds.
            </p>

            <h2>3. Historical Velocity Tables & Live Telemetry</h2>
            <p>
              Edge weights are dynamic. Google indexes historical velocity tables for every road segment. For example, a highway segment that averages 90km/h on a Sunday at 8 AM might average 12km/h on a Monday at 8:30 AM due to office commuters. If you schedule a trip for tomorrow, the engine utilizes this historical table as a baseline.
            </p>

            {/* Embedded Interactive Widget */}
            <div className="inline-widget" style={{ padding: '24px', borderRadius: '12px', margin: '24px 0' }}>
              <h4 style={{ margin: '0 0 8px 0' }}>Interactive ETA Simulator</h4>
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

            <h2>4. Predictive Traffic Modeling via GNNs</h2>
            <p>
              To combine historical profiles with real-time reports, Google partnered with DeepMind to implement <strong>Graph Neural Networks (GNNs)</strong>. Unlike traditional feedforward models, GNNs model the connectivity of the road grid directly. The graph structure allows the network to learn spatial dependencies—for example, how a bottleneck on a freeway exit ramp backlogs traffic onto intersecting local streets 3 kilometers away. This GNN model outputs dynamic edge weight predictions that are injected straight into the A* router.
            </p>

            <h2>5. Core Technology Stack</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '24px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '8px 0' }}>Component</th>
                  <th style={{ padding: '8px 0' }}>Technologies Used</th>
                  <th style={{ padding: '8px 0' }}>Architectural Role</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Routing Engine</td>
                  <td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)' }}>C++</td>
                  <td style={{ padding: '8px 0', color: 'var(--text-secondary)' }}>Executes low-level, high-speed A* graph traversals.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Telemetry Ingestion</td>
                  <td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)' }}>Apache Kafka, Flink</td>
                  <td style={{ padding: '8px 0', color: 'var(--text-secondary)' }}>Ingests millions of concurrent GPS pings and aggregates speeds.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Storage layer</td>
                  <td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)' }}>Google BigTable</td>
                  <td style={{ padding: '8px 0', color: 'var(--text-secondary)' }}>Low-latency storage for time-indexed road segment velocity tables.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Predictive ML</td>
                  <td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)' }}>TensorFlow, Python</td>
                  <td style={{ padding: '8px 0', color: 'var(--text-secondary)' }}>Trains and executes GNNs to output predicted segment edge costs.</td>
                </tr>
              </tbody>
            </table>

            <h2>6. References & Citations</h2>
            <ul style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>
                Google AI Blog (2020): <a href="https://blog.google/products/maps/google-maps-101-how-ai-helps-predict-traffic-and-routes/" target="_blank" rel="noreferrer">Using Deep Learning to Inform ETAs in Google Maps</a>.
              </li>
              <li>
                DeepMind Research (2020): <a href="https://deepmind.google/discover/blog/traffic-prediction-with-advanced-graph-neural-networks/" target="_blank" rel="noreferrer">Traffic prediction with Advanced Graph Neural Networks</a>.
              </li>
              <li>
                ScienceDirect: <a href="https://www.sciencedirect.com/topics/computer-science/contraction-hierarchy" target="_blank" rel="noreferrer">Contraction Hierarchies in Road Networks and Shortest Path Computations</a>.
              </li>
            </ul>
          </>
        )}

        {/* --- BLINKIT CONTENT --- */}
        {article.id === 'blinkit' && (
          <>
            <p>
              Blinkit's 10-minute grocery delivery SLA is not a consequence of riders speeding through traffic. Operating a high-speed logistics service requires a hyper-local topology of dark stores, predictive inventory caching, automated shelf picking paths, and geospatial dispatch matching.
            </p>

            <h2>1. System Architecture Flow</h2>
            <p>
              From the instant a user clicks "Order" to the delivery partner arriving at the doorstep, data flows across decoupled microservices coordinated in real-time:
            </p>
            <pre style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '8px', 
              padding: '16px', 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.72rem', 
              color: 'var(--text-primary)',
              lineHeight: '1.35',
              overflowX: 'auto',
              marginBottom: '24px'
            }}>
{` [Customer App] 
        │ (Order Request JSON)
        ▼
  [Order Manager Service] ◄───(Inventory Check)───► [Redis Cache (MFC Stock)]
        │ (Confirms Stock)
        ▼
 [Dispatch Engine (H3 Grid)] ──(Finds nearest idle rider in H3 Hexagon cell)
        │
        ├──────────────────────────┐ (Triggers picking route)
        ▼                          ▼
 [Rider Match & Lock]     [Dark Store Picker App]
        │                          │ (Runs Traveling Salesperson algorithm
        │                          │  for shortest shelf route; packs in <90s)
        ▼                          ▼
 [Delivery Partner] ◄────(Handover)───── [MFC Dispatch Table]
        │ (Optimized route, no right turns)
        ▼
 [Customer Doorstep] (Completed in <10 Minutes)`}
            </pre>

            <h2>2. The Dark Store Topology</h2>
            <p>
              A traditional e-commerce warehouse is located outside city limits, spanning huge square footage. Blinkit replaces this with a "Dark Store" or Micro-Fulfillment Center (MFC)—a small 2,000 sq ft warehouse tucked directly inside residential neighborhoods. 
            </p>
            <p>
              Blinkit maps cities into small grids. Each MFC serves a strict radius of just 1.5 to 2.5 kilometers. By limiting the physical distance a rider has to travel to under 2km, the transit phase of delivery is compressed to a predictable 5 to 7 minutes without exceeding normal traffic speeds.
            </p>

            <h2>3. Shelving & Picking Optimization (Traveling Salesperson Algo)</h2>
            <p>
              To pack orders in under 90 seconds, dark store inventory is organized purely for speed. There are no retail displays. Fast-moving items (milk, bread) are placed nearest to the dispatch table. 
            </p>
            <p>
              When an order lands, the picker's handheld app compiles a list sorted by a <strong>Traveling Salesperson (TSP) heuristic algorithm</strong>. The algorithm calculates the shortest walking path through the store aisles to grab all items, reducing picking path travel time to under 60 seconds.
            </p>

            {/* Embedded Interactive Widget */}
            <div className="inline-widget" style={{ padding: '24px', borderRadius: '12px', margin: '24px 0' }}>
              <h4 style={{ margin: '0 0 8px 0' }}>Blinkit Delivery Time Calculator</h4>
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

            <h2>4. Geospatial Dispatching via Hexagonal Hierarchies</h2>
            <p>
              Matching riders to stores cannot use standard database searches because querying coordinate points in a circle is too slow. Instead, Blinkit indexes the city map using <strong>hexagonal geospatial cells (such as Uber's H3 library)</strong>.
            </p>
            <p>
              Every dark store and delivery partner's coordinates are mapped to a specific H3 hexagon ID. When an order is placed, the dispatch engine instantly identifies active riders inside the store's H3 hexagon cell (or adjacent cells) without running complex distance math, pre-matching a rider before the package is even bagged.
            </p>

            <h2>5. Core Technology Stack</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '24px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '8px 0' }}>Component</th>
                  <th style={{ padding: '8px 0' }}>Technologies Used</th>
                  <th style={{ padding: '8px 0' }}>Architectural Role</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Dispatch Engine</td>
                  <td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)' }}>Go, Node.js</td>
                  <td style={{ padding: '8px 0', color: 'var(--text-secondary)' }}>Handles high-concurrency connections and rider matching loops.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Geospatial Index</td>
                  <td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)' }}>Uber H3, Google S2</td>
                  <td style={{ padding: '8px 0', color: 'var(--text-secondary)' }}>Maps coordinate nodes into discrete cells for quick lookups.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Inventory Cache</td>
                  <td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)' }}>Redis</td>
                  <td style={{ padding: '8px 0', color: 'var(--text-secondary)' }}>Keeps sub-millisecond dark store stock metrics to prevent out-of-stock orders.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Mobile Apps</td>
                  <td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)' }}>React Native</td>
                  <td style={{ padding: '8px 0', color: 'var(--text-secondary)' }}>Powers picker, user, and rider clients from a single codebase.</td>
                </tr>
              </tbody>
            </table>

            <h2>6. References & Citations</h2>
            <ul style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>
                Blinkit Tech Blog: <a href="https://blinkit.com/blog" target="_blank" rel="noreferrer">Scaling hyper-local logistics and real-time inventory systems</a>.
              </li>
              <li>
                Uber Engineering (2018): <a href="https://www.uber.com/en-IN/blog/h3/" target="_blank" rel="noreferrer">H3: Uber's Hexagonal Hierarchical Spatial Index</a>.
              </li>
              <li>
                Medium Logistics: <a href="https://medium.com/tag/logistics" target="_blank" rel="noreferrer">Heuristic Solutions to the Traveling Salesperson Problem in Micro-Fulfillment Centers</a>.
              </li>
            </ul>
          </>
        )}

        {/* --- FIFA STREAMING CONTENT --- */}
        {article.id === 'fifa' && (
          <>
            <p>
              When 50 million sports fans stream a live World Cup football match simultaneously, the sudden surge in traffic is enough to crash standard web infrastructure. Traditional client-server models (where clients request data and the server responds) saturate bandwidth when millions connect. Scalable streaming bypasses the central server by utilizing video chunking chunk protocols, Anycast routing, and Content Delivery Network (CDN) edge caching.
            </p>

            <h2>1. System Architecture Flow</h2>
            <p>
              To broadcast video globally without buffering, the live feed is split, encoded, distributed to edge networks, and dynamically requested by players:
            </p>
            <pre style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '8px', 
              padding: '16px', 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.72rem', 
              color: 'var(--text-primary)',
              lineHeight: '1.35',
              overflowX: 'auto',
              marginBottom: '24px'
            }}>
{` [Live Camera Broadcast Feed] 
             │ (Raw HD RTMP Uplink)
             ▼
    [AWS Elemental Transcoder]
             │ (Encodes into multi-bitrate HLS: 1080p, 720p, 480p)
             ▼
   [Origin Shield Media Server] (Stores master.m3u8 manifest & .ts segments)
             │
             ▼
    [Anycast Routing DNS] (Maps request physical routing to nearest CDN node)
             │
             ├────────────────────────┬────────────────────────┐
             ▼                        ▼                        ▼
     [CDN Edge Cache]         [CDN Edge Cache]         [CDN Edge Cache]
     (Caches .ts chunks)      (Caches .ts chunks)      (Caches .ts chunks)
             │
             ▼
   [Client Media Player] (ExoPlayer / HLS.js adaptive download loop)`}
            </pre>

            <h2>2. Video Chunking (HLS / DASH Protocols)</h2>
            <p>
              Instead of streaming a single continuous 2-hour video file, the live video feed is captured at the stadium, immediately compressed, and sliced into tiny, individual files called "chunks" (usually 2 to 6 seconds long). 
            </p>
            <p>
              These chunks are created at different quality profiles (e.g. 1080p, 720p, 480p). The video player on your phone doesn't request a "stream"; it sequentially downloads these tiny chunk files one by one over standard web requests (HTTP), which are easy for servers to cache and deliver.
            </p>

            {/* Embedded Interactive Widget */}
            <div className="inline-widget" style={{ padding: '24px', borderRadius: '12px', margin: '24px 0' }}>
              <h4 style={{ margin: '0 0 8px 0' }}>Adaptive Bitrate Player Simulator</h4>
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

            <h2>3. Content Delivery Networks (CDNs) & Anycast Routing</h2>
            <p>
              To distribute the load, video chunks are pushed to a <strong>Content Delivery Network (CDN)</strong>—a global network of edge servers situated close to internet service providers (ISPs). 
            </p>
            <p>
              CDNs use <strong>Anycast routing</strong> to direct user requests. Multiple edge servers share the exact same IP address. Routers on the internet automatically send requests down the physically shortest path. Thus, when millions of users request a video chunk simultaneously, their requests are naturally load-balanced across thousands of close edge caches, offloading stress from the origin server.
            </p>

            <h2>4. Core Technology Stack</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '24px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '8px 0' }}>Component</th>
                  <th style={{ padding: '8px 0' }}>Technologies Used</th>
                  <th style={{ padding: '8px 0' }}>Architectural Role</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Transcoding</td>
                  <td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)' }}>AWS Elemental MediaLive</td>
                  <td style={{ padding: '8px 0', color: 'var(--text-secondary)' }}>Compresses live broadcast feed and slices it into multi-bitrate streams.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Streaming Protocol</td>
                  <td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)' }}>HLS, MPEG-DASH</td>
                  <td style={{ padding: '8px 0', color: 'var(--text-secondary)' }}>Industry-standard HTTP delivery protocols for chunked video media.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Edge Caching CDN</td>
                  <td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)' }}>Akamai, AWS CloudFront</td>
                  <td style={{ padding: '8px 0', color: 'var(--text-secondary)' }}>Distributes video files to edge nodes close to the user's ISP.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Client Video Player</td>
                  <td style={{ padding: '8px 0', fontFamily: 'var(--font-mono)' }}>HLS.js, ExoPlayer</td>
                  <td style={{ padding: '8px 0', color: 'var(--text-secondary)' }}>Monitors network download speed and executes Adaptive Bitrate shifting.</td>
                </tr>
              </tbody>
            </table>

            <h2>5. References & Citations</h2>
            <ul style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>
                Apple / IETF (2017): <a href="https://datatracker.ietf.org/doc/html/rfc8216" target="_blank" rel="noreferrer">RFC 8216 - HTTP Live Streaming specification</a>.
              </li>
              <li>
                Netflix Technology Blog: <a href="https://netflixtechblog.com/" target="_blank" rel="noreferrer">Open Connect: Building Netflix's content delivery network</a>.
              </li>
              <li>
                AWS Whitepapers: <a href="https://aws.amazon.com/whitepapers/" target="_blank" rel="noreferrer">Live Streaming Architecture on AWS and Elemental transcoding pipelines</a>.
              </li>
            </ul>
          </>
        )}

      </div>
    </div>
  );
}
