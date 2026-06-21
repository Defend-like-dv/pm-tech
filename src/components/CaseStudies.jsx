import React, { useState } from 'react';
import { Map, Clock, Navigation, Shield, Wifi, Globe, Server, CheckCircle, ChevronRight, RefreshCw } from 'lucide-react';

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState('maps');

  // --- GOOGLE MAPS STATE ---
  const [trafficDensity, setTrafficDensity] = useState(50); // 0-100%
  const [weatherCondition, setWeatherCondition] = useState('clear'); // clear, rain, snow
  
  const calculateMapsEta = () => {
    let baseTimeMin = 15; // 15 mins for 10km route
    let trafficDelay = (trafficDensity / 100) * 20; // up to 20 mins traffic delay
    let weatherDelay = weatherCondition === 'rain' ? 5 : weatherCondition === 'snow' ? 12 : 0;
    return Math.round(baseTimeMin + trafficDelay + weatherDelay);
  };

  // --- BLINKIT STATE ---
  const [storeDistance, setStoreDistance] = useState(1.2); // km (0.5 to 5)
  const [pickerEfficiency, setPickerEfficiency] = useState(90); // 0-100%
  const [trafficLevel, setTrafficLevel] = useState('medium'); // low, medium, heavy

  const calculateBlinkitTime = () => {
    let pickTime = Math.max(1, (100 - pickerEfficiency) / 10 + 1.5); // 1.5 to 11.5 mins
    let travelSpeedKmh = trafficLevel === 'low' ? 25 : trafficLevel === 'medium' ? 18 : 10;
    let travelTime = (storeDistance / travelSpeedKmh) * 60; // mins
    let total = pickTime + travelTime + 1; // 1 min buffer for order assignment
    return total.toFixed(1);
  };

  // --- FIFA WORLD CUP STREAMING STATE ---
  const [bandwidth, setBandwidth] = useState(8); // Mbps (1 to 25)
  
  const getStreamingResolution = () => {
    if (bandwidth >= 15) return { label: '4K Ultra HD', resolution: '2160p', bitrate: '15 Mbps', badge: 'badge-success' };
    if (bandwidth >= 6) return { label: 'Full HD', resolution: '1080p', bitrate: '6 Mbps', badge: 'badge-success' };
    if (bandwidth >= 3) return { label: 'HD', resolution: '720p', bitrate: '3 Mbps', badge: 'badge-cyan' };
    if (bandwidth >= 1.5) return { label: 'Standard Definition', resolution: '480p', bitrate: '1.5 Mbps', badge: 'badge-warning' };
    return { label: 'Low Quality (Buffering risk)', resolution: '240p', bitrate: '0.5 Mbps', badge: 'badge-error' };
  };

  const streamInfo = getStreamingResolution();

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'left' }}>
        <h1 style={{ marginBottom: '8px' }}>Real-World System Architecture Case Studies</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Deconstruct the engineering behind massive systems. Click a scenario to explore how it scales under the hood.
        </p>
      </div>

      {/* Case Selector Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        borderBottom: '1px solid var(--border-color)', 
        paddingBottom: '12px' 
      }}>
        <button 
          className={`btn ${selectedCase === 'maps' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setSelectedCase('maps')}
        >
          <Map size={18} />
          Google Maps (ETA Calculations)
        </button>
        <button 
          className={`btn ${selectedCase === 'blinkit' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setSelectedCase('blinkit')}
        >
          <Clock size={18} />
          Blinkit (10-Min Delivery Pipeline)
        </button>
        <button 
          className={`btn ${selectedCase === 'fifa' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setSelectedCase('fifa')}
        >
          <Globe size={18} />
          FIFA Live Streaming (Global Scale CDN)
        </button>
      </div>

      {/* --- GOOGLE MAPS CASE STUDY --- */}
      {selectedCase === 'maps' && (
        <div className="fade-in grid-2">
          {/* Tech Breakdown Walkthrough */}
          <div className="card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ color: 'var(--primary)' }}>How Google Maps Calculates Your ETA</h3>
            <p style={{ margin: 0, fontSize: '0.88rem' }}>
              Maps doesn't just divide distance by speed limits. It uses four layers of data:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>1</div>
                <div>
                  <strong style={{ color: '#fff' }}>Dijkstra & A* Routing:</strong> Algorithms segment roads into a mesh. They search thousands of nodes to find the mathematically shortest paths.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>2</div>
                <div>
                  <strong style={{ color: '#fff' }}>Historical Aggregates:</strong> Google stores historical speeds for every road segment. For example, a highway segment that is 80km/h on Sunday at 8 AM might average 15km/h on Monday at 8:30 AM.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>3</div>
                <div>
                  <strong style={{ color: '#fff' }}>Live GPS Ping Aggregation (Crowdsourcing):</strong> When your phone is navigation mode, it continuously sends telemetry pings back to Google. If 100 devices are moving at 8km/h on a road segment, Google's server flags real-time traffic.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>4</div>
                <div>
                  <strong style={{ color: '#fff' }}>Machine Learning Adjustments:</strong> Deep learning models analyze weather conditions, road construction database links, and live traffic patterns to adjust predictions.
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Calculator Map */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ textAlign: 'left' }}>Simulated ETA Engine</h3>
            
            {/* Interactive sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              <div className="slider-container">
                <div className="slider-label">
                  <span>Live Traffic Density</span>
                  <span className="slider-value" style={{ color: 'var(--primary)' }}>{trafficDensity}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" step="5"
                  value={trafficDensity} onChange={(e) => setTrafficDensity(Number(e.target.value))}
                  className="custom-slider"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Weather Conditions</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['clear', 'rain', 'snow'].map((w) => (
                    <button 
                      key={w}
                      onClick={() => setWeatherCondition(w)}
                      className="btn"
                      style={{
                        flex: 1,
                        fontSize: '0.8rem',
                        padding: '8px',
                        backgroundColor: weatherCondition === w ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255,255,255,0.03)',
                        borderColor: weatherCondition === w ? 'var(--primary)' : 'var(--border-color)',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        color: weatherCondition === w ? '#fff' : 'var(--text-secondary)'
                      }}
                    >
                      {w.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Output Display */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '24px',
              textAlign: 'left',
              marginTop: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>Calculated ETA for 10km route</div>
                  <h2 style={{ fontSize: '2.5rem', margin: '4px 0 0 0', color: 'var(--secondary)' }}>
                    {calculateMapsEta()} mins
                  </h2>
                </div>
                <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '12px', borderRadius: '12px', color: 'var(--secondary)' }}>
                  <Navigation size={32} />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- BLINKIT 10-MIN DELIVERY CASE STUDY --- */}
      {selectedCase === 'blinkit' && (
        <div className="fade-in grid-2">
          {/* Tech Breakdown Walkthrough */}
          <div className="card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ color: 'var(--primary)' }}>The 10-Minute Dark Store Operations</h3>
            <p style={{ margin: 0, fontSize: '0.88rem' }}>
              How does Blinkit deliver groceries in 10 minutes? It relies on precise warehouse optimization and order routing, not rider speeding:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>01</div>
                <div>
                  <strong style={{ color: '#fff' }}>Dark Store (Micro-Fulfillment Centers) Topology:</strong> Blinkit rents small spaces (1500-2500 sq ft) in every neighborhood, serving a radius of just 1.5 to 2.5 km.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>02</div>
                <div>
                  <strong style={{ color: '#fff' }}>Path-Optimized Picking (under 2 mins):</strong> Items are stocked not for aesthetic appeal, but for retrieval speed. The picker app utilizes a routing algorithm to lead the worker through the shortest path across aisles to bag items.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>03</div>
                <div>
                  <strong style={{ color: '#fff' }}>Predictive Rider Dispatch:</strong> The order routing engine matches and assigns a delivery partner before the order picking is completed, ensuring zero idle wait time at the storefront exit.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>04</div>
                <div>
                  <strong style={{ color: '#fff' }}>Route Batching:</strong> Orders to neighboring houses are aggregated. Riders follow routes designed by algorithms that prioritize left turns (which avoid long traffic signal delays).
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Blinkit Engine */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ textAlign: 'left' }}>Blinkit Delivery Speed Predictor</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              
              <div className="slider-container">
                <div className="slider-label">
                  <span>Customer Distance (km)</span>
                  <span className="slider-value" style={{ color: 'var(--secondary)' }}>{storeDistance} km</span>
                </div>
                <input 
                  type="range" min="0.5" max="4.0" step="0.1"
                  value={storeDistance} onChange={(e) => setStoreDistance(Number(e.target.value))}
                  className="custom-slider"
                />
              </div>

              <div className="slider-container">
                <div className="slider-label">
                  <span>Dark Store Picker Efficiency</span>
                  <span className="slider-value" style={{ color: 'var(--primary)' }}>{pickerEfficiency}%</span>
                </div>
                <input 
                  type="range" min="20" max="100" step="5"
                  value={pickerEfficiency} onChange={(e) => setPickerEfficiency(Number(e.target.value))}
                  className="custom-slider"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--text-secondary)' }}>Traffic Surcharge / Level</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['low', 'medium', 'heavy'].map((t) => (
                    <button 
                      key={t}
                      onClick={() => setTrafficLevel(t)}
                      className="btn"
                      style={{
                        flex: 1,
                        fontSize: '0.8rem',
                        padding: '8px',
                        backgroundColor: trafficLevel === t ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.03)',
                        borderColor: trafficLevel === t ? 'var(--success)' : 'var(--border-color)',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        color: trafficLevel === t ? '#fff' : 'var(--text-secondary)'
                      }}
                    >
                      {t.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculated Delivery Time Output */}
            {(() => {
              const deliveryTime = Number(calculateBlinkitTime());
              const success = deliveryTime <= 10;
              return (
                <div style={{ 
                  background: success ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                  border: `1px solid ${success ? 'var(--success)' : 'var(--error)'}`,
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'left',
                  marginTop: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>Projected Delivery SLA Time</div>
                      <h2 style={{ fontSize: '2.5rem', margin: '4px 0 0 0', color: success ? 'var(--success)' : 'var(--error)' }}>
                        {deliveryTime} mins
                      </h2>
                    </div>
                    <div style={{ background: success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', padding: '12px', borderRadius: '12px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 'bold' }}>
                        {success ? '✅ Within 10m SLA' : '❌ SLA Violated'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}

          </div>
        </div>
      )}

      {/* --- FIFA LIVE STREAMING CASE STUDY --- */}
      {selectedCase === 'fifa' && (
        <div className="fade-in grid-2">
          {/* Tech Breakdown Walkthrough */}
          <div className="card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ color: 'var(--primary)' }}>Adaptive Bitrate & CDN Caching</h3>
            <p style={{ margin: 0, fontSize: '0.88rem' }}>
              How does a live streaming player deliver to 50M concurrent viewers without crashing the host servers?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>1</div>
                <div>
                  <strong style={{ color: '#fff' }}>HLS / DASH Transcoding:</strong> The live video is captured and immediately transcoded (compressed) into multiple resolution layers (1080p, 720p, 480p) and sliced into short files (2-6 second chunks).
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>2</div>
                <div>
                  <strong style={{ color: '#fff' }}>Adaptive Bitrate Streaming (ABR):</strong> The user's device requests segments sequentially. If bandwidth is strong, it downloads the next 1080p chunk. If bandwidth drops, it requests the next 480p chunk. This shifts quality dynamically to prevent buffering.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>3</div>
                <div>
                  <strong style={{ color: '#fff' }}>CDN Edge Distribution:</strong> Instead of hitting the host server, user requests are routed to local Content Delivery Network (CDN) edge servers (Akamai, Cloudflare) physically close to them. The edge server caches the chunk locally to serve hundreds of thousands of nearby users instantly.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>4</div>
                <div>
                  <strong style={{ color: '#fff' }}>Anycast Routing:</strong> IP address queries automatically resolve to the closest server geographically, reducing latency and load balancing massive traffic spikes.
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Player Bitrate Simulator */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ textAlign: 'left' }}>Adaptive Bitrate Player Simulator</h3>

            <div className="slider-container" style={{ textAlign: 'left' }}>
              <div className="slider-label">
                <span>Simulated Network Connection Speed</span>
                <span className="slider-value" style={{ color: 'var(--primary)' }}>{bandwidth} Mbps</span>
              </div>
              <input 
                type="range" min="0.5" max="25" step="0.5"
                value={bandwidth} onChange={(e) => setBandwidth(Number(e.target.value))}
                className="custom-slider"
              />
            </div>

            {/* Video Player Mockup */}
            <div style={{
              background: '#000',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              height: '180px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {/* Blur simulation representing resolution */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'url("https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80")', // stadium background
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: bandwidth >= 15 ? 'none' : bandwidth >= 6 ? 'blur(1px)' : bandwidth >= 3 ? 'blur(3px)' : bandwidth >= 1.5 ? 'blur(6px)' : 'blur(12px)',
                transition: 'filter 0.3s ease',
                opacity: 0.6
              }} />

              {/* Status overlays */}
              <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className={`badge ${streamInfo.badge}`} style={{ fontSize: '0.8rem', padding: '6px 12px', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                  Active Stream: {streamInfo.label} ({streamInfo.resolution})
                </span>
                <div style={{ fontSize: '0.75rem', color: '#fff', opacity: 0.8, fontFamily: 'var(--font-mono)' }}>
                  Bandwidth Required: {streamInfo.bitrate}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong>Observation:</strong> Changing the speed slider shifts the blur level instantly. In a real streaming app, this is how **HLS (HTTP Live Streaming)** operates—altering segment resolutions transparently to avoid player freezes.
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
