import React, { useState } from 'react';
import { Database, AlertOctagon } from 'lucide-react';
import { techStacks } from '../data/techstacks';

export default function TechStacks() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedStackId, setSelectedStackId] = useState(null);
  const [dbType, setDbType] = useState('sql');

  // Find selected stack details
  const selectedStack = techStacks.find(c => c.id === selectedStackId);

  // Calculate counts for categories
  const getCount = (cat) => {
    if (cat === 'all') return techStacks.length;
    return techStacks.filter(c => c.category === cat).length;
  };

  // Filter components list
  const filteredComponents = techStacks.filter(c => {
    if (activeCategory === 'all') return true;
    return c.category === activeCategory;
  });

  if (selectedStack) {
    return (
      <div className="fade-in article-container" style={{ textAlign: 'left' }}>
        {/* Back Button */}
        <button 
          onClick={() => setSelectedStackId(null)} 
          className="back-button"
          style={{ marginBottom: '24px' }}
        >
          ← Back to Tech Stacks
        </button>

        {/* Editorial Headers */}
        <h1 className="article-title-main" style={{ marginBottom: '8px' }}>
          {selectedStack.name}
        </h1>
        <p className="article-subtitle-main" style={{ marginBottom: '16px' }}>
          Understanding the role, benefits, and core physical limitations of {selectedStack.name} in modern architectures.
        </p>

        {/* Meta Row */}
        <div className="article-header-meta" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <span className="badge badge-outline" style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>
            {selectedStack.category}
          </span>
          <span>•</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>3 min read</span>
        </div>

        {/* Quick Facts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '32px'
        }} className="footer-grid">
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
            <strong style={{ color: 'var(--text-primary)', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>What it is:</strong>
            <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: '1.4' }}>{selectedStack.what}</span>
          </div>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px' }}>
            <strong style={{ color: 'var(--text-primary)', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Why it is used:</strong>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.4' }}>{selectedStack.why}</span>
          </div>
        </div>

        {/* Bottleneck Constraint Alert */}
        <div style={{ 
          background: 'rgba(201, 42, 42, 0.05)', 
          borderLeft: '4px solid var(--error)', 
          padding: '16px', 
          borderRadius: '0 8px 8px 0',
          fontSize: '0.9rem',
          marginBottom: '32px'
        }}>
          <strong style={{ color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', textTransform: 'uppercase', fontSize: '0.75rem' }}>
            <AlertOctagon size={14} />
            Physical Limitation (Bottleneck)
          </strong>
          <span style={{ color: 'var(--text-primary)', lineHeight: '1.4' }}>{selectedStack.limit}</span>
        </div>

        {/* Article Body Paragraphs */}
        <div className="article-body" style={{ marginBottom: '40px' }}>
          {selectedStack.paragraphs && selectedStack.paragraphs.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>

        {/* Embed Database Visualizer Widget (only inside SQL/postgres or NoSQL/mongo detail pages) */}
        {(selectedStack.id === 'postgres' || selectedStack.id === 'mongo') && (
          <div className="fade-in inline-widget" style={{ marginTop: '24px', padding: '24px', borderRadius: '12px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.15rem', marginTop: 0 }}>
              <Database size={18} />
              Interactive Relational SQL vs NoSQL Document Schema Switcher
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 0, marginBottom: '20px' }}>
              Toggle between the database types below to see how customer users and invoice records are stored in PostgreSQL SQL tables vs MongoDB NoSQL JSON documents.
            </p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button 
                onClick={() => setDbType('sql')}
                className={`btn ${dbType === 'sql' ? 'btn-active' : ''}`}
                style={{ flex: 1, padding: '8px' }}
              >
                PostgreSQL (SQL Tables)
              </button>
              <button 
                onClick={() => setDbType('nosql')}
                className={`btn ${dbType === 'nosql' ? 'btn-active' : ''}`}
                style={{ flex: 1, padding: '8px' }}
              >
                MongoDB (NoSQL Document)
              </button>
            </div>

            {dbType === 'sql' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '6px' }}>Users Table</div>
                    <table style={{ width: '100%', fontSize: '0.72rem', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                          <th>id</th>
                          <th>name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Jane Doe</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--warning)', marginBottom: '6px' }}>Billing Table</div>
                    <table style={{ width: '100%', fontSize: '0.72rem', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                          <th>id</th>
                          <th>user_id</th>
                          <th>amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>101</td>
                          <td style={{ color: 'var(--primary)', fontWeight: 'bold' }}>1</td>
                          <td>$45.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'var(--bg-card)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <strong>SQL Join Model:</strong> Relational tables keep records clean and separate. Data is connected on-the-fly using relationships.
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <pre style={{ 
                  margin: 0, 
                  padding: '12px', 
                  background: 'var(--bg-card)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-primary)',
                  overflowX: 'auto'
                }}>
{`{
  "_id": 1,
  "name": "Jane Doe",
  "invoices": [
    { "invoice_id": 101, "amount": 45.00 }
  ]
}`}
                </pre>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'var(--bg-card)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <strong>NoSQL Document Model:</strong> Invoices are nested directly inside the user document. Queries are fast because there are no tables to join, but querying all invoices globally is slow.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Editorial Header */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', marginBottom: '8px' }}>Tech Stacks Decoded</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.5' }}>
          Explore the components of modern architectures. Click a card to read the complete educational guide.
        </p>
      </div>

      {/* Pill Filters with counts */}
      <div style={{ 
        display: 'flex', 
        gap: '6px', 
        borderBottom: '1px solid var(--border-color)', 
        paddingBottom: '16px',
        flexWrap: 'wrap'
      }}>
        {['all', 'frontend', 'backend', 'database', 'communication'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`btn ${activeCategory === cat ? 'btn-active' : ''}`}
            style={{ fontSize: '0.75rem', padding: '6px 14px', textTransform: 'capitalize' }}
          >
            {cat === 'communication' ? 'Communication' : cat} ({getCount(cat)})
          </button>
        ))}
      </div>

      {/* Grid of Tech Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {filteredComponents.map((comp) => (
          <div 
            key={comp.id}
            onClick={() => setSelectedStackId(comp.id)}
            style={{
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '24px',
              background: 'var(--bg-card)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            className="article-card"
          >
            <div>
              {/* Card Meta Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>{comp.name}</h3>
                <span className="badge badge-outline" style={{ fontSize: '0.62rem', textTransform: 'uppercase' }}>
                  {comp.category}
                </span>
              </div>

              {/* Description */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.45', marginTop: 0, marginBottom: '16px' }}>
                {comp.what}
              </p>
            </div>

            {/* Read Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {comp.paragraphs.length} sections
              </span>
              <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem' }}>
                Read Guide →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
