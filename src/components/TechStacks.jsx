import React, { useState } from 'react';
import { Cpu, Server, Database, HardDrive, AlertOctagon } from 'lucide-react';

export default function TechStacks() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [dbType, setDbType] = useState('sql');

  // --- TECH COMPONENTS DATA ---
  const components = [
    {
      id: "react",
      name: "React.js",
      category: "frontend",
      what: "A client-side JavaScript library used to build interactive user interfaces running in the browser.",
      why: "Updates elements on the screen dynamically using a Virtual DOM without reloading the entire page.",
      limit: "Large JavaScript bundle sizes slow down the initial load time, causing blank page lag on slow networks."
    },
    {
      id: "html-css",
      name: "HTML & CSS",
      category: "frontend",
      what: "The structural skeleton (HTML) and style layout sheet (CSS) of web pages.",
      why: "Standardized blocks that browsers know how to draw; defines responsive layouts (Grid, Flexbox).",
      limit: "Static by nature. Building dynamic interfaces requires JavaScript to manage screen states."
    },
    {
      id: "rendering",
      name: "CSR vs SSR Rendering",
      category: "frontend",
      what: "Client-Side Rendering (browser runs JS to compile HTML) vs Server-Side Rendering (server compiles fully populated HTML first).",
      why: "CSR creates fluid screen transitions without full page refreshes. SSR delivers instant initial load times and strong SEO indexing.",
      limit: "CSR causes slow initial blank screens while loading bundles. SSR increases server CPU costs under high traffic spikes."
    },
    {
      id: "nodejs",
      name: "Node.js",
      category: "backend",
      what: "A runtime environment that allows developers to run JavaScript on the backend server.",
      why: "Enables unified team codebases (JS on front & back) and handles thousands of concurrent simple requests.",
      limit: "Single-threaded model. CPU-heavy math tasks (video compression, reports) block the server thread for all users."
    },
    {
      id: "django",
      name: "Python Django",
      category: "backend",
      what: "A high-level Python framework designed for rapid development with a built-in ORM database mapper.",
      why: "Highly secure and comes with 'batteries included' (built-in user auth, admin panel, tables).",
      limit: "Heavy memory footprint. Running Django servers is more expensive and has slower execution than compiled code."
    },
    {
      id: "postgres",
      name: "PostgreSQL",
      category: "database",
      what: "A relational SQL database storing data in linked, highly structured tables.",
      why: "Guarantees transactional security (ACID). Perfect for billing ledger records.",
      limit: "Very difficult to scale writes horizontally across multiple servers because transactions require row locking."
    },
    {
      id: "mongo",
      name: "MongoDB",
      category: "database",
      what: "A non-relational NoSQL database storing data in flexible, schema-less JSON documents.",
      why: "Allows developers to add data fields instantly without running database migrations.",
      limit: "Joining data across collections is extremely slow. If your feature has complex relations, it will lag."
    },
    {
      id: "redis",
      name: "Redis Cache",
      category: "database",
      what: "An in-memory key-value database commonly placed in front of primary databases.",
      why: "All data sits in server RAM, cutting database read/write speeds to under 1 millisecond.",
      limit: "Limited by RAM size capacity, which is expensive. Volatile - all cache is lost if the server restarts."
    },
    {
      id: "rest",
      name: "REST APIs",
      category: "communication",
      what: "An API architectural style using standard URLs to transfer JSON data over HTTP requests.",
      why: "Decouples frontend from backend, allowing both teams to work and scale separately.",
      limit: "Over-fetching data. Requesting a user profile returns all columns, even if you only need the username."
    },
    {
      id: "graphql",
      name: "GraphQL",
      category: "communication",
      what: "A query language for APIs that lets the browser request only the specific fields it needs.",
      why: "Saves mobile network data, preventing over-fetching. Frontends query complex objects in one request.",
      limit: "Complex caching setup on the backend. Malicious clients can write deeply nested queries that crash servers."
    },
    {
      id: "webhooks",
      name: "Webhooks",
      category: "communication",
      what: "Server-to-server push notifications triggered by real-time database events.",
      why: "Sends active alerts (e.g. Stripe notifies your app when a credit card payment succeeds) without polling.",
      limit: "Delivery failures. If your receiver server goes offline, webhook alerts can be lost unless retry loops are set."
    }
  ];

  // Calculate counts for categories
  const getCount = (cat) => {
    if (cat === 'all') return components.length;
    return components.filter(c => c.category === cat).length;
  };

  // Filter components list
  const filteredComponents = components.filter(c => {
    if (activeCategory === 'all') return true;
    return c.category === activeCategory;
  });

  return (
    <div className="fade-in" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Editorial Header */}
      <div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', marginBottom: '8px' }}>Tech Stacks Decoded</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.5' }}>
          Explore the components of modern architectures. Filter by vertical to see definitions, benefits, and constraints.
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
            style={{
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '24px',
              background: 'var(--bg-card)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 6px rgba(0,0,0,0.01)',
              transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
            }}
          >
            <div>
              {/* Card Meta Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>{comp.name}</h3>
                <span className="badge badge-outline" style={{ fontSize: '0.62rem', textTransform: 'uppercase' }}>
                  {comp.category}
                </span>
              </div>

              {/* What and Why */}
              <div style={{ fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>What it is:</strong>
                  <span style={{ color: 'var(--text-primary)', lineHeight: '1.4' }}>{comp.what}</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>Why it is used:</strong>
                  <span style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>{comp.why}</span>
                </div>
              </div>
            </div>

            {/* Bottleneck Constraint */}
            <div style={{ 
              background: 'rgba(201, 42, 42, 0.05)', 
              borderLeft: '3px solid var(--error)', 
              padding: '12px', 
              borderRadius: '0 6px 6px 0',
              fontSize: '0.82rem',
              marginTop: 'auto'
            }}>
              <strong style={{ color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px', textTransform: 'uppercase', fontSize: '0.68rem' }}>
                <AlertOctagon size={12} />
                Physical Limitation (Bottleneck)
              </strong>
              <span style={{ color: 'var(--text-primary)', lineHeight: '1.4' }}>{comp.limit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive DB Visualizer (rendered only when All or Database is filtered) */}
      {(activeCategory === 'all' || activeCategory === 'database') && (
        <div className="fade-in inline-widget" style={{ margin: '16px 0 0 0' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.15rem' }}>
            <Database size={18} />
            Relational SQL vs NoSQL Document Schema Switcher
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 0, marginBottom: '20px' }}>
            Toggle between the database types below to see how customer users and invoice records are stored in SQL tables vs NoSQL JSON documents.
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
