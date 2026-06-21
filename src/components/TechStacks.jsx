import React, { useState, useEffect } from 'react';
import { Database, AlertOctagon, Eye, ThumbsUp } from 'lucide-react';
import { techStacks } from '../data/techstacks';

// --- INTERACTIVE SIMULATIONS FOR TECH STACKS ---

function ReactWidget() {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);
  
  const handleIncrement = () => {
    setCount(prev => prev + 1);
    setLogs(prev => [
      `[Virtual DOM] Diffed: count state changed to ${count + 1}`,
      `[Real DOM] Rendered: updated 1 text node (value: ${count + 1})`,
      ...prev
    ].slice(0, 4));
  };

  return (
    <div className="inline-widget" style={{ marginTop: '24px', padding: '24px', borderRadius: '12px' }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '1.15rem' }}>React State & DOM Diffing Simulator</h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
        Increment the state below. Notice how React calculates changes in the Virtual DOM tree and patches <strong>only</strong> the modified text node in the browser's Real DOM.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px' }} className="footer-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'bold' }}>Component State</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{count}</div>
          <button className="btn btn-active" onClick={handleIncrement} style={{ padding: '8px 16px', width: '100%' }}>
            + Increment State
          </button>
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '130px' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'bold', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>DOM Activity Log</div>
          {logs.length === 0 ? (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: 'auto' }}>Click button to start updates...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
              {logs.map((log, i) => (
                <div key={i} style={{ color: log.includes('Virtual') ? 'var(--warning)' : 'var(--primary)', lineHeight: '1.3' }}>
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HtmlCssWidget() {
  const [useCss, setUseCss] = useState(true);

  return (
    <div className="inline-widget" style={{ marginTop: '24px', padding: '24px', borderRadius: '12px' }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '1.15rem' }}>HTML vs CSS Layout Visualizer</h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
        Toggle CSS styles on and off to understand how HTML defines semantic structural boxes while CSS controls layout structure, positioning, alignment, and responsiveness.
      </p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button className={`btn ${!useCss ? 'btn-active' : ''}`} onClick={() => setUseCss(false)} style={{ flex: 1, padding: '8px' }}>HTML Structure Only</button>
        <button className={`btn ${useCss ? 'btn-active' : ''}`} onClick={() => setUseCss(true)} style={{ flex: 1, padding: '8px' }}>HTML + CSS Layout</button>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        minHeight: '160px',
        display: 'flex',
        flexDirection: useCss ? 'row' : 'column',
        gap: '12px',
        justifyContent: 'center',
        alignItems: useCss ? 'center' : 'stretch',
        transition: 'all 0.3s ease'
      }}>
        {/* Card 1 */}
        <div style={useCss ? {
          background: 'var(--bg-main)',
          border: '1px solid var(--primary)',
          borderRadius: '8px',
          padding: '16px',
          flex: 1,
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(26, 137, 23, 0.04)',
          color: 'var(--text-primary)',
          transition: 'all 0.3s ease'
        } : {
          border: '1px dashed var(--text-muted)',
          padding: '8px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          background: 'transparent'
        }}>
          {useCss ? (
            <>
              <h5 style={{ margin: '0 0 6px 0', color: 'var(--primary)', fontSize: '0.9rem' }}>Feature Box A</h5>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Positioned dynamically using CSS Flexbox properties.</p>
            </>
          ) : (
            <div>&lt;div&gt;Feature Box A&lt;/div&gt;</div>
          )}
        </div>

        {/* Card 2 */}
        <div style={useCss ? {
          background: 'var(--bg-main)',
          border: '1px solid var(--primary)',
          borderRadius: '8px',
          padding: '16px',
          flex: 1,
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(26, 137, 23, 0.04)',
          color: 'var(--text-primary)',
          transition: 'all 0.3s ease'
        } : {
          border: '1px dashed var(--text-muted)',
          padding: '8px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          background: 'transparent'
        }}>
          {useCss ? (
            <>
              <h5 style={{ margin: '0 0 6px 0', color: 'var(--primary)', fontSize: '0.9rem' }}>Feature Box B</h5>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Inherits styled gaps and responsiveness rules.</p>
            </>
          ) : (
            <div>&lt;div&gt;Feature Box B&lt;/div&gt;</div>
          )}
        </div>
      </div>
    </div>
  );
}

function RenderingWidget() {
  const [activeMode, setActiveMode] = useState(null); // 'csr', 'ssr'
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const startSimulation = (mode) => {
    setActiveMode(mode);
    setStep(0);
    setLoading(true);
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      setStep(currentStep);
      if (currentStep >= 3) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 1200);
  };

  const stepsData = {
    csr: [
      { label: "1. Empty HTML shell downloaded", desc: "User sees a completely blank white screen.", color: 'var(--error)' },
      { label: "2. Downloading JavaScript bundle (2.5MB)", desc: "Browser compiles code; page remains blank.", color: 'var(--warning)' },
      { label: "3. JS executes, queries API, builds DOM", desc: "Page loads completely; clickable and active.", color: 'var(--primary)' }
    ],
    ssr: [
      { label: "1. Server builds HTML with database content", desc: "Browser waits for initial document download.", color: 'var(--warning)' },
      { label: "2. Full HTML rendered instantly on arrival", desc: "User reads text immediately, but links aren't active.", color: 'var(--primary)' },
      { label: "3. JavaScript hydrates page controls", desc: "Event listeners attach; fully interactive.", color: 'var(--primary)' }
    ]
  };

  return (
    <div className="inline-widget" style={{ marginTop: '24px', padding: '24px', borderRadius: '12px' }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '1.15rem' }}>CSR vs SSR Loading Timeline</h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
        Run the loading simulation for both rendering types to see how it affects the user's perception of load speed (blank pages vs immediate readable text).
      </p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button className="btn btn-active" onClick={() => startSimulation('csr')} disabled={loading} style={{ flex: 1, padding: '8px' }}>Simulate CSR (Client)</button>
        <button className="btn btn-active" onClick={() => startSimulation('ssr')} disabled={loading} style={{ flex: 1, padding: '8px' }}>Simulate SSR (Server)</button>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {!activeMode ? (
          <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Select rendering type above to start simulation timeline...
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)', textTransform: 'uppercase' }}>
              Simulating {activeMode.toUpperCase()} Loading Timeline {loading ? "⏳" : "✓"}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stepsData[activeMode].map((s, i) => {
                const isPassed = step >= i + 1;
                return (
                  <div key={i} style={{ 
                    opacity: isPassed ? 1 : 0.3,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: isPassed ? s.color : 'var(--text-muted)',
                      marginTop: '5px'
                    }} />
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: isPassed ? '600' : '400', color: 'var(--text-primary)' }}>{s.label}</div>
                      {isPassed && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.desc}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NodeWidget() {
  const [threadStatus, setThreadStatus] = useState('Idle'); // 'Idle', 'Processing Blocking Task...', 'Running DB Asynchronously...'
  const [queue, setQueue] = useState([]);
  const [blockingLogs, setBlockingLogs] = useState([]);

  const addRequest = (type) => {
    if (threadStatus === 'Processing Blocking Task...') {
      // Thread is blocked, request is stuck in queue!
      setQueue(prev => [...prev, type]);
      setBlockingLogs(prev => [`[Thread BLOCKED] Request for ${type} is waiting...`, ...prev]);
      return;
    }

    if (type === 'CPU math') {
      setThreadStatus('Processing Blocking Task...');
      setBlockingLogs(prev => [`[Start] CPU Math Task executing on main thread.`, ...prev]);
      setTimeout(() => {
        setThreadStatus('Idle');
        setBlockingLogs(prev => [`[End] CPU Math completed! Thread released.`, ...prev]);
        // Process any queued requests
        setQueue(q => {
          if (q.length > 0) {
            setBlockingLogs(logs => [`[Event Loop] Processing queued requests: ${q.join(', ')}`, ...logs]);
          }
          return [];
        });
      }, 3500);
    } else {
      setThreadStatus('Running DB Asynchronously...');
      setBlockingLogs(prev => [`[Start] DB Query requested. Pushed to background worker pool.`, ...prev]);
      setTimeout(() => {
        setThreadStatus('Idle');
        setBlockingLogs(prev => [`[Callback] DB result returned to main thread.`, ...prev]);
      }, 1500);
    }
  };

  return (
    <div className="inline-widget" style={{ marginTop: '24px', padding: '24px', borderRadius: '12px' }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '1.15rem' }}>Node.js Event Loop & Blocking Simulator</h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
        Click both buttons. Notice how asynchronous <strong>Database Reads</strong> leave the thread free, but running a <strong>CPU math</strong> operation blocks the single thread, freezing any subsequent requests.
      </p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button className="btn btn-active" onClick={() => addRequest('DB read')} style={{ flex: 1, padding: '8px' }}>Fetch DB (Non-Blocking)</button>
        <button className="btn btn-active" onClick={() => addRequest('CPU math')} style={{ flex: 1, padding: '8px', backgroundColor: 'var(--error)', borderColor: 'var(--error)', color: '#fff' }}>Run Math (Blocking)</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px' }} className="footer-grid">
        <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Main Thread State</div>
          <div style={{ 
            fontSize: '0.9rem', 
            fontWeight: 'bold', 
            color: threadStatus === 'Idle' ? 'var(--primary)' : threadStatus.includes('Blocking') ? 'var(--error)' : 'var(--warning)',
            textAlign: 'center'
          }}>
            {threadStatus}
          </div>
          {queue.length > 0 && (
            <div style={{ fontSize: '0.72rem', color: 'var(--error)' }}>
              Queued Requests: {queue.length}
            </div>
          )}
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '6px', minHeight: '120px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>Thread Logs</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {blockingLogs.length === 0 ? (
              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Send requests above to view events...</span>
            ) : (
              blockingLogs.slice(0, 4).map((log, i) => (
                <div key={i} style={{ color: log.includes('BLOCKED') ? 'var(--error)' : 'var(--text-primary)', lineHeight: '1.2' }}>
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DjangoWidget() {
  const [selectedAction, setSelectedAction] = useState('find_user');

  const queries = {
    find_user: {
      orm: "User.objects.get(id=5)",
      sql: "SELECT * FROM auth_user WHERE id = 5 LIMIT 1;"
    },
    filter_invoices: {
      orm: "Invoice.objects.filter(amount__gt=100, status='paid')",
      sql: "SELECT * FROM billing_invoice WHERE amount > 100 AND status = 'paid';"
    },
    create_user: {
      orm: "User.objects.create(username='john_doe')",
      sql: "INSERT INTO auth_user (username, date_joined) VALUES ('john_doe', NOW()) RETURNING id;"
    }
  };

  return (
    <div className="inline-widget" style={{ marginTop: '24px', padding: '24px', borderRadius: '12px' }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '1.15rem' }}>Django ORM Query Compiler</h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
        Select a query action to see how Django translates clean Python ORM commands into raw SQL queries.
      </p>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {Object.keys(queries).map((action) => (
          <button 
            key={action}
            onClick={() => setSelectedAction(action)}
            className={`btn ${selectedAction === action ? 'btn-active' : ''}`}
            style={{ fontSize: '0.72rem', padding: '6px 12px', flex: 1 }}
          >
            {action === 'find_user' ? 'Find User' : action === 'filter_invoices' ? 'Filter Invoices' : 'Create User'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '4px' }}>Python Django ORM Code</div>
          <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-primary)' }}>
            {queries[selectedAction].orm}
          </pre>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--warning)', marginBottom: '4px' }}>Generated Raw SQL Query</div>
          <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-primary)' }}>
            {queries[selectedAction].sql}
          </pre>
        </div>
      </div>
    </div>
  );
}

function RedisWidget() {
  const [latency, setLatency] = useState(null);
  const [source, setSource] = useState(null); // 'DB', 'Cache'
  const [isCached, setIsCached] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    setLoading(true);
    setLatency(null);
    setSource(null);
    
    const dbTime = 780;
    const redisTime = 4;

    if (!isCached) {
      setTimeout(() => {
        setLatency(dbTime);
        setSource('PostgreSQL (Disk)');
        setIsCached(true);
        setLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setLatency(redisTime);
        setSource('Redis (RAM)');
        setLoading(false);
      }, 200);
    }
  };

  const handleClear = () => {
    setIsCached(false);
    setLatency(null);
    setSource(null);
  };

  return (
    <div className="inline-widget" style={{ marginTop: '24px', padding: '24px', borderRadius: '12px' }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '1.15rem' }}>Redis Cache Latency Simulator</h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
        Fetch data twice. The first request queries the primary database (Cache Miss). The second request pulls instantly from Redis (Cache Hit).
      </p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button className="btn btn-active" onClick={handleFetch} disabled={loading} style={{ flex: 2, padding: '8px' }}>
          {loading ? "Fetching..." : "Fetch Dashboard Data"}
        </button>
        <button className="btn" onClick={handleClear} disabled={loading} style={{ flex: 1, padding: '8px', fontSize: '0.72rem' }}>
          Clear Cache
        </button>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        minHeight: '140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {loading ? (
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Contacting Server...</div>
        ) : latency === null ? (
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Click button to fetch data and measure database latency.
          </div>
        ) : (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Response Speed</div>
            <h3 style={{ fontSize: '2.2rem', margin: 0, color: source.includes('Redis') ? 'var(--primary)' : 'var(--error)' }}>
              {latency} ms
            </h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              Data retrieved from: <strong style={{ color: source.includes('Redis') ? 'var(--primary)' : 'var(--warning)' }}>{source}</strong>
            </div>
            <div style={{ width: '100%', background: 'var(--border-color)', height: '6px', borderRadius: '3px', overflow: 'hidden', marginTop: '8px' }}>
              <div style={{ 
                height: '100%', 
                background: source.includes('Redis') ? 'var(--primary)' : 'var(--error)', 
                width: source.includes('Redis') ? '1%' : '100%',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RestWidget() {
  const [payload, setPayload] = useState(null);

  const fetchRest = () => {
    setPayload({
      id: 123,
      username: "alex_pm",
      email: "alex@company.com",
      created_at: "2024-01-12T10:14:00Z",
      role: "admin",
      permissions: ["read", "write", "delete"],
      last_login_ip: "192.168.1.55",
      preferences: { theme: "dark", lang: "en", notifications: true },
      session_logs: [
        { id: 45, action: "login", time: "2026-06-21T10:00:00Z" }
      ]
    });
  };

  return (
    <div className="inline-widget" style={{ marginTop: '24px', padding: '24px', borderRadius: '12px' }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '1.15rem' }}>REST API Over-Fetching Simulator</h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
        Imagine you only need to display the **username** on the page. Click the button to see how REST returns the entire database columns block, wasting network bandwidth.
      </p>
      <button className="btn btn-active" onClick={fetchRest} style={{ width: '100%', padding: '8px', marginBottom: '16px' }}>
        GET /api/users/123
      </button>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px', minHeight: '100px' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--error)', marginBottom: '6px' }}>JSON Data Payload Received</div>
        {payload ? (
          <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-primary)', overflowX: 'auto', maxHeight: '150px' }}>
            {JSON.stringify(payload, null, 2)}
          </pre>
        ) : (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Execute query to fetch REST payload...</span>
        )}
      </div>
    </div>
  );
}

function GraphqlWidget() {
  const [fields, setFields] = useState({
    username: true,
    email: false,
    role: false,
    preferences: false
  });
  const [result, setResult] = useState(null);

  const toggleField = (field) => {
    setFields(prev => ({ ...prev, [field]: !prev[field] }));
    setResult(null);
  };

  const handleQuery = () => {
    const payload = {};
    if (fields.username) payload.username = "alex_pm";
    if (fields.email) payload.email = "alex@company.com";
    if (fields.role) payload.role = "admin";
    if (fields.preferences) payload.preferences = { theme: "dark", lang: "en" };
    setResult(payload);
  };

  const generateQueryText = () => {
    const selected = Object.keys(fields).filter(f => fields[f]);
    if (selected.length === 0) return "query {\n  user(id: 123) {\n  }\n}";
    return `query {\n  user(id: 123) {\n${selected.map(f => `    ${f}`).join('\n')}\n  }\n}`;
  };

  return (
    <div className="inline-widget" style={{ marginTop: '24px', padding: '24px', borderRadius: '12px' }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '1.15rem' }}>GraphQL Query Field Builder</h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
        Select the exact fields you want to fetch. Notice how GraphQL avoids over-fetching by returning a JSON containing <strong>only</strong> the requested fields.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
        {Object.keys(fields).map((f) => (
          <label key={f} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', cursor: 'pointer', color: 'var(--text-primary)' }}>
            <input type="checkbox" checked={fields[f]} onChange={() => toggleField(f)} />
            <span style={{ textTransform: 'capitalize' }}>{f}</span>
          </label>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button className="btn btn-active" onClick={handleQuery} style={{ flex: 1, padding: '8px' }}>
          Execute GraphQL Query
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="footer-grid">
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '6px' }}>GraphQL Query Sent</div>
          <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-primary)' }}>
            {generateQueryText()}
          </pre>
        </div>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--warning)', marginBottom: '6px' }}>JSON Payload Returned</div>
          {result ? (
            <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-primary)' }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          ) : (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Click execute query to fetch...</span>
          )}
        </div>
      </div>
    </div>
  );
}

function WebhookWidget() {
  const [serverOnline, setServerOnline] = useState(true);
  const [webhookLogs, setWebhookLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const simulatePayment = () => {
    setLoading(true);
    setWebhookLogs(prev => [`[Stripe Server] Payment Successful event triggered. Sending Webhook POST to /api/webhooks...`, ...prev]);
    
    setTimeout(() => {
      if (serverOnline) {
        setWebhookLogs(prev => [
          `[Your App Server] Webhook received successfully! Signature verified.`,
          `[Your App Server] Database updated: User subscription set to ACTIVE.`,
          `[Stripe Server] Webhook Delivery Status: 200 OK. Success!`,
          ...prev
        ]);
      } else {
        setWebhookLogs(prev => [
          `[Your App Server] Connection refused (Offline).`,
          `[Stripe Server] Webhook Delivery Status: 503 Service Unavailable (Failed).`,
          `[Stripe Queue] Webhook placed in Retry Loop. Next retry in 5 seconds.`,
          ...prev
        ]);
        
        // Auto retry simulation
        setTimeout(() => {
          setWebhookLogs(logs => [`[Stripe Queue] Retrying Delivery attempt #1...`, ...logs]);
          setTimeout(() => {
            setWebhookLogs(logs => [
              `[Stripe Server] Webhook Delivery Status: 503 Service Unavailable (Failed).`,
              `[Stripe Queue] Retry #1 failed. Rescheduled for later.`,
              ...logs
            ]);
          }, 1000);
        }, 4000);
      }
      setLoading(false);
    }, 1200);
  };

  const clearLogs = () => {
    setWebhookLogs([]);
  };

  return (
    <div className="inline-widget" style={{ marginTop: '24px', padding: '24px', borderRadius: '12px' }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '1.15rem' }}>Stripe Webhook Delivery & Retry Simulator</h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
        Toggle the receiving server status below, then simulate a payment. Observe how Stripe's server retry queue handles system outages.
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
        <button 
          className={`btn ${serverOnline ? 'btn-active' : ''}`}
          onClick={() => setServerOnline(true)}
          style={{ flex: 1, padding: '8px' }}
        >
          Server: ONLINE
        </button>
        <button 
          className={`btn ${!serverOnline ? 'btn-active' : ''}`}
          onClick={() => setServerOnline(false)}
          style={{ flex: 1, padding: '8px', backgroundColor: !serverOnline ? 'var(--error)' : 'transparent', color: !serverOnline ? '#fff' : 'inherit' }}
        >
          Server: OFFLINE
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button className="btn btn-active" onClick={simulatePayment} disabled={loading} style={{ flex: 2, padding: '8px' }}>
          Simulate Stripe Payment
        </button>
        <button className="btn" onClick={clearLogs} style={{ flex: 1, padding: '8px', fontSize: '0.72rem' }}>
          Clear Logs
        </button>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px', minHeight: '140px' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '6px' }}>Webhook Event Log</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {webhookLogs.length === 0 ? (
            <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Simulate a payment to view logs...</span>
          ) : (
            webhookLogs.slice(0, 5).map((log, i) => (
              <div key={i} style={{ color: log.includes('200 OK') || log.includes('ACTIVE') ? 'var(--primary)' : log.includes('Failed') || log.includes('refused') ? 'var(--error)' : 'var(--text-primary)', lineHeight: '1.25' }}>
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// --- MAIN TECH STACKS COMPONENT ---

export default function TechStacks({ selectedStackId, onSelectStack }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [dbType, setDbType] = useState('sql');

  // --- VIEWS & LIKES METRICS STATE ---
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!selectedStackId) return;

    // Reset counts immediately on stack change
    setViews(0);
    setLikes(0);
    
    const hasLiked = localStorage.getItem(`pmtech_liked_${selectedStackId}`) === 'true';
    setIsLiked(hasLiked);

    // Call live API view increment
    fetch(`/api/view?id=${selectedStackId}`)
      .then(res => res.json())
      .then(data => {
        if (data.fallback) {
          // LocalStorage fallback
          const storedViews = localStorage.getItem(`pmtech_views_${selectedStackId}`);
          let currentViews = storedViews ? parseInt(storedViews) : 0;
          currentViews += 1;
          localStorage.setItem(`pmtech_views_${selectedStackId}`, currentViews);
          setViews(currentViews);

          const storedLikes = localStorage.getItem(`pmtech_likes_${selectedStackId}`);
          setLikes(storedLikes ? parseInt(storedLikes) : 0);
        } else if (data.views) {
          setViews(data.views);
          // Fetch likes from metrics
          fetch(`/api/metrics`)
            .then(res => res.json())
            .then(metrics => {
              if (metrics[selectedStackId]) {
                setLikes(metrics[selectedStackId].likes);
              }
            });
        }
      })
      .catch(() => {
        // Safe fallback in case of request block
        const storedViews = localStorage.getItem(`pmtech_views_${selectedStackId}`);
        let currentViews = storedViews ? parseInt(storedViews) : 0;
        currentViews += 1;
        localStorage.setItem(`pmtech_views_${selectedStackId}`, currentViews);
        setViews(currentViews);

        const storedLikes = localStorage.getItem(`pmtech_likes_${selectedStackId}`);
        setLikes(storedLikes ? parseInt(storedLikes) : 0);
      });
  }, [selectedStackId]);

  const handleLike = () => {
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);

    // Optimistically update counts in UI
    setLikes(prev => nextLiked ? prev + 1 : prev - 1);

    const actionType = nextLiked ? 'like' : 'unlike';

    fetch(`/api/like?id=${selectedStackId}&action=${actionType}`)
      .then(res => res.json())
      .then(data => {
        if (data.fallback) {
          // LocalStorage fallback
          const storedLikes = localStorage.getItem(`pmtech_likes_${selectedStackId}`);
          let currentLikes = storedLikes ? parseInt(storedLikes) : 0;
          
          if (nextLiked) {
            currentLikes += 1;
          } else {
            currentLikes = Math.max(0, currentLikes - 1);
          }
          localStorage.setItem(`pmtech_likes_${selectedStackId}`, currentLikes);
          setLikes(currentLikes);
          localStorage.setItem(`pmtech_liked_${selectedStackId}`, nextLiked ? 'true' : 'false');
        } else if (data.likes) {
          setLikes(data.likes);
          localStorage.setItem(`pmtech_liked_${selectedStackId}`, nextLiked ? 'true' : 'false');
        }
      })
      .catch(() => {
        // Fallback
        const storedLikes = localStorage.getItem(`pmtech_likes_${selectedStackId}`);
        let currentLikes = storedLikes ? parseInt(storedLikes) : 0;
        
        if (nextLiked) {
          currentLikes += 1;
        } else {
          currentLikes = Math.max(0, currentLikes - 1);
        }
        localStorage.setItem(`pmtech_likes_${selectedStackId}`, currentLikes);
        setLikes(currentLikes);
        localStorage.setItem(`pmtech_liked_${selectedStackId}`, nextLiked ? 'true' : 'false');
      });
  };

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
          onClick={() => onSelectStack(null)} 
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

        {/* Meta Row with Views & Likes */}
        <div className="article-header-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge badge-outline" style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>
              {selectedStack.category}
            </span>
            <span>•</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>3 min read</span>
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

        {/* Dynamic Simulations Embedding */}
        {selectedStack.id === 'react' && <ReactWidget />}
        {selectedStack.id === 'html-css' && <HtmlCssWidget />}
        {selectedStack.id === 'rendering' && <RenderingWidget />}
        {selectedStack.id === 'nodejs' && <NodeWidget />}
        {selectedStack.id === 'django' && <DjangoWidget />}
        {selectedStack.id === 'redis' && <RedisWidget />}
        {selectedStack.id === 'rest' && <RestWidget />}
        {selectedStack.id === 'graphql' && <GraphqlWidget />}
        {selectedStack.id === 'webhooks' && <WebhookWidget />}

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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="footer-grid">
                  <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px' }}>
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

                  <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px' }}>
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
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'var(--bg-main)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <strong>SQL Join Model:</strong> Relational tables keep records clean and separate. Data is connected on-the-fly using relationships.
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <pre style={{ 
                  margin: 0, 
                  padding: '12px', 
                  background: 'var(--bg-main)', 
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
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'var(--bg-main)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
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
          Explore the components of modern architectures. Click a card to read the complete educational guide and play with interactive simulations.
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
            onClick={() => onSelectStack(comp.id)}
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
                Interactive Simulation
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
