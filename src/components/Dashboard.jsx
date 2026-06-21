import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Terminal, 
  Cpu, 
  Layout, 
  Sliders, 
  FileText, 
  Award, 
  Zap, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function Dashboard({ setActiveTab }) {
  const [tip, setTip] = useState('');
  
  const devTips = [
    {
      title: "API Status Code Rule of Thumb",
      content: "1xx: Info, 2xx: Success (200 OK), 3xx: Redirects, 4xx: Client Error (404 Not Found), 5xx: Server Error (500 Server Broke). If the API fails with 401, check authentication. If it's 500, check the developer logs."
    },
    {
      title: "What is Git Merge vs Rebase?",
      content: "Merge creates a new commit joining two histories together (preserves exact history branches). Rebase reapplies commits on top of another base tip, creating a flat, clean linear history. Developers argue about this daily!"
    },
    {
      title: "Redis is RAM, not Disk",
      content: "Redis stores data in-memory (RAM) making it blazing fast (< 1ms). However, RAM is expensive and volatile. Never use Redis as a primary source of truth for critical persistent data like user financial balances."
    },
    {
      title: "CSS Spacing Tip: Padding vs Margin",
      content: "Padding is space inside the border (box content breathing room). Margin is space outside the border (clearing space between elements). Adjusting margins moves other elements away; padding sizes the element itself."
    },
    {
      title: "The Kano Model Delighter Trap",
      content: "Delighters (unexpected features) eventually become basic needs. What was a delighter in 2010 (e.g., pulling down to refresh) is now expected. Keep iterating, or your product will feel outdated."
    }
  ];

  useEffect(() => {
    // Select a tip based on the day or random
    const randomIndex = Math.floor(Math.random() * devTips.length);
    setTip(devTips[randomIndex]);
  }, []);

  const stats = [
    { name: 'Product Toolkits', count: '3 Tools Active', icon: Sliders, color: '#a855f7', tab: 'toolkits' },
    { name: 'Design Sandbox', count: '4 Elements Visualized', icon: Layout, color: '#06b6d4', tab: 'design' },
    { name: 'Tech Stacks & Limits', count: '5 Stacks & Components', icon: Cpu, color: '#ec4899', tab: 'techstacks' },
    { name: 'Case Studies', count: '3 Real-world Walkthroughs', icon: Terminal, color: '#10b981', tab: 'casestudies' }
  ];

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Welcome Banner */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
        borderColor: 'rgba(168, 85, 247, 0.25)',
        padding: '40px',
        borderRadius: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span className="badge badge-violet">PM-Tech Workspace</span>
              <span className="badge badge-cyan">v1.0.0</span>
            </div>
            <h1 style={{ fontSize: '2.8rem', marginBottom: '12px', textAlign: 'left' }}>
              Master the Tech Side of Product
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '650px', textAlign: 'left', margin: '0' }}>
              Welcome, Product Leader! Engineering, design, and metrics shouldn't feel like a black box. Use this dashboard to interact with real codebase architectures, design tokens, and framework calculations.
            </p>
          </div>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            padding: '24px', 
            borderRadius: '16px', 
            border: '1px solid rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(8px)',
            maxWidth: '350px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)', fontWeight: '600', marginBottom: '8px' }}>
              <Zap size={18} />
              <span>Dev Tip of the Day</span>
            </div>
            {tip && (
              <>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: '#fff' }}>{tip.title}</h4>
                <p style={{ fontSize: '0.88rem', margin: '0', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{tip.content}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid-2">
        {/* Left Side: Navigation Quick Starts */}
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={22} style={{ color: 'var(--primary)' }} />
            Explore Learning Modules
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div 
                  key={idx} 
                  className="card" 
                  onClick={() => setActiveTab(stat.tab)}
                  style={{ 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ 
                      padding: '12px', 
                      borderRadius: '12px', 
                      backgroundColor: `${stat.color}15`, 
                      color: stat.color,
                      border: `1px solid ${stat.color}30`
                    }}>
                      <IconComp size={24} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>{stat.name}</h3>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{stat.count}</p>
                    </div>
                  </div>
                  <ArrowRight size={18} style={{ color: 'var(--text-muted)' }} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Quick Translator Preview & Metrics Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={22} style={{ color: 'var(--secondary)' }} />
              Key PM Technical Skills
            </h2>
            <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ margin: '0', fontSize: '0.95rem' }}>
                Engineering teams appreciate PMs who understand system trade-offs. Focus on building these three fluencies:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', textAlign: 'left' }}>
                  <div style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>01</div>
                  <div>
                    <strong style={{ color: '#fff' }}>Latency vs Complexity:</strong> Why adding Redis makes the site fast but introduces cache synchronization bugs.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', textAlign: 'left' }}>
                  <div style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>02</div>
                  <div>
                    <strong style={{ color: '#fff' }}>Relational vs Scalable DBs:</strong> Choosing SQL for ACID transactions (billing) vs NoSQL for flexible catalogs.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', textAlign: 'left' }}>
                  <div style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>03</div>
                  <div>
                    <strong style={{ color: '#fff' }}>UI/Layout Boundaries:</strong> Speaking in pixels/rems and margins/paddings to ensure design handoffs are clean.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ 
            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)',
            borderColor: 'rgba(236, 72, 153, 0.15)',
            textAlign: 'left'
          }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem', color: '#fff', marginBottom: '8px' }}>
              <Award size={20} style={{ color: 'var(--accent)' }} />
              Ready to challenge yourself?
            </h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Explore the glossary, build a simulated RICE feature sheet, inspect actual tech stacks, and step through Google Maps architecture.
            </p>
            <button className="btn btn-primary" onClick={() => setActiveTab('glossary')} style={{ width: '100%' }}>
              Browse Jargon Dictionary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
