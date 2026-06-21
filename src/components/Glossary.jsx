import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // --- GLOSSARY DATA ---
  const glossaryItems = [
    { term: "React", category: "tech", def: "A popular frontend library for building highly interactive user interfaces.", pmContext: "Helps developers create reusable UI components and manage single-page application states smoothly." },
    { term: "Django", category: "tech", def: "A high-level Python backend web framework designed for rapid development and clean database structure.", pmContext: "Great for data-centric and secure applications; comes with a built-in admin dashboard out of the box." },
    { term: "REST API", category: "tech", def: "An architectural style for APIs that uses standard HTTP requests (GET, POST, PUT, DELETE) to transfer JSON data.", pmContext: "The standard way modern websites talk to backends or integrations (like Stripe or Google Maps)." },
    { term: "GraphQL", category: "tech", def: "A query language for APIs that lets the client request only the specific fields they need, instead of getting everything.", pmContext: "Prevents over-fetching data, leading to faster mobile loads, but requires more complex backend setup than REST." },
    
    { term: "Hamburger Menu", category: "design", def: "A three-line button in headers that toggles a hidden navigation menu on mobile viewports.", pmContext: "Saves screen real estate on mobile but hides navigation links, which can decrease feature discoverability." },
    { term: "Padding", category: "design", def: "The inner space between a component's content and its border.", pmContext: "Controls internal breathing room. Adjusting padding changes the size of the clickable element." },
    { term: "Margin", category: "design", def: "The outer space surrounding an element, separating it from adjacent components.", pmContext: "Controls layouts and positioning. Does not increase clickable element size." },
    { term: "REM Units", category: "design", def: "Relative font sizing unit calculated based on the browser's root font size (usually 16px).", pmContext: "Ensures responsiveness and text legibility accessibility when users change browser settings." },
    { term: "Design System", category: "design", def: "A collection of reusable components, tokens (colors, sizes), and rules used to build cohesive user interfaces.", pmContext: "Accelerates design/development handoff and maintains brand consistency across different product platforms." },

    { term: "Redis", category: "databases", def: "A super-fast, in-memory key-value database commonly used as a cache.", pmContext: "Speeds up loading times but is limited by RAM size and volatile. Never store billing details exclusively on Redis." },
    { term: "SQL Database (RDBMS)", category: "databases", def: "A relational database that stores data in structured tables (like Excel sheets) linked by keys.", pmContext: "Perfect for financial and structured data where consistency is non-negotiable. Harder to scale horizontally." },
    { term: "NoSQL Database", category: "databases", def: "A database that stores data in flexible, schema-less documents (like JSON files).", pmContext: "Allows fast write speeds and dynamic catalogues, but joins across multiple collections are slow." },

    { term: "CI/CD Pipeline", category: "agile", def: "Continuous Integration & Continuous Delivery. Automates building, testing, and deploying code changes.", pmContext: "Allows engineers to release changes safely several times a day. If a build fails, CI/CD blocks it from going to production." },
    { term: "Velocity", category: "agile", def: "The average number of story points completed by a scrum team during a sprint.", pmContext: "Used for long-term planning, not for measuring productivity. It varies heavily between teams." },
    { term: "Technical Debt", category: "agile", def: "The implied future rework cost caused by choosing an easy, short-term code solution today.", pmContext: "Like credit card interest: if you don't dedicate sprints to pay it down, the codebase gets slow and features take longer to build." },
    { term: "Staging Environment", category: "agile", def: "A duplicate copy of the production website used for testing features with real data before release.", pmContext: "Where QA and PMs do final reviews. Prevents crashes on the live production site." },
  ];

  const filteredGlossary = glossaryItems.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.def.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'left' }}>
      
      {/* Editorial Header */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', marginBottom: '8px' }}>Glossary</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.5' }}>
          Browse essential tech, databases, and design terminology organized by vertical.
        </p>
      </div>

      {/* --- GLOSSARY DICTIONARY (SEARCH & FEED) --- */}
      <div>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', marginBottom: '20px' }}>
          <BookOpen size={18} />
          Bite-Sized Dictionary Index
        </h3>

        {/* Search and filter row */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          flexWrap: 'wrap', 
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '20px',
          marginBottom: '28px'
        }}>
          {/* Search bar */}
          <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search terms (e.g. padding, cache, API)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '99px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '0.88rem'
              }}
            />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['all', 'tech', 'design', 'databases', 'agile'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn ${selectedCategory === cat ? 'btn-active' : ''}`}
                style={{ fontSize: '0.75rem', padding: '6px 12px', textTransform: 'capitalize' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary Results List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {filteredGlossary.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', padding: '40px 0', textAlign: 'center', fontSize: '0.9rem' }}>
              No terms found. Try searching for "API", "Padding", or "Database".
            </div>
          ) : (
            filteredGlossary.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  paddingBottom: '24px', 
                  borderBottom: '1px solid var(--border-color)',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <h4 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-primary)' }}>{item.term}</h4>
                  <span className="badge badge-outline" style={{ fontSize: '0.6rem', textTransform: 'uppercase' }}>
                    {item.category}
                  </span>
                </div>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                  {item.def}
                </p>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <strong style={{ color: 'var(--primary)' }}>PM Context:</strong> {item.pmContext}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
