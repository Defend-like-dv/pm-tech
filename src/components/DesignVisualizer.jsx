import React, { useState } from 'react';
import { Layout, Maximize2, Menu, X, HelpCircle, Eye } from 'lucide-react';

export default function DesignVisualizer() {
  const [activeTab, setActiveTab] = useState('boxmodel');

  // --- BOX MODEL STATE ---
  const [padding, setPadding] = useState(20);
  const [margin, setMargin] = useState(20);
  const [borderWidth, setBorderWidth] = useState(2);
  const [hoverArea, setHoverArea] = useState(null); // 'content', 'padding', 'border', 'margin'

  // --- UNITS STATE ---
  const [rootSize, setRootSize] = useState(16);
  const [elementPx, setElementPx] = useState(24);
  const [elementRem, setElementRem] = useState(1.5);

  // --- HAMBURGER STATE ---
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Module Title */}
      <div style={{ textAlign: 'left' }}>
        <h1 style={{ marginBottom: '8px' }}>Design & UI Mechanics Sandbox</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Interact with CSS spacing, relative typography units, and state transitions to understand UI implementation.
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        borderBottom: '1px solid var(--border-color)', 
        paddingBottom: '12px' 
      }}>
        <button 
          className={`btn ${activeTab === 'boxmodel' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('boxmodel')}
        >
          <Maximize2 size={18} />
          CSS Box Model (Padding vs Margin)
        </button>
        <button 
          className={`btn ${activeTab === 'units' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('units')}
        >
          <Layout size={18} />
          Units: Pixels (px) vs Relative (rem)
        </button>
        <button 
          className={`btn ${activeTab === 'hamburger' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('hamburger')}
        >
          <Menu size={18} />
          Hamburger Menu Mechanics
        </button>
      </div>

      {/* --- CSS BOX MODEL WORKSPACE --- */}
      {activeTab === 'boxmodel' && (
        <div className="fade-in grid-2">
          {/* Controls */}
          <div className="card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3>Box Model Controls</h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Adjust padding, borders, and margins. Hover over different zones to see details.
            </p>

            <div className="slider-container">
              <div className="slider-label">
                <span>Padding (Inside Space)</span>
                <span className="slider-value" style={{ color: '#34d399' }}>{padding}px</span>
              </div>
              <input 
                type="range" min="0" max="60" step="4"
                value={padding} onChange={(e) => setPadding(Number(e.target.value))}
                className="custom-slider"
              />
            </div>

            <div className="slider-container">
              <div className="slider-label">
                <span>Border Width</span>
                <span className="slider-value" style={{ color: '#a855f7' }}>{borderWidth}px</span>
              </div>
              <input 
                type="range" min="1" max="10" step="1"
                value={borderWidth} onChange={(e) => setBorderWidth(Number(e.target.value))}
                className="custom-slider"
              />
            </div>

            <div className="slider-container">
              <div className="slider-label">
                <span>Margin (Outside Space)</span>
                <span className="slider-value" style={{ color: '#fbbf24' }}>{margin}px</span>
              </div>
              <input 
                type="range" min="0" max="60" step="4"
                value={margin} onChange={(e) => setMargin(Number(e.target.value))}
                className="custom-slider"
              />
            </div>

            {/* Explanation box */}
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.03)', 
              padding: '16px', 
              borderRadius: '8px',
              fontSize: '0.85rem',
              border: '1px solid var(--border-color)'
            }}>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '0.9rem', color: '#fff' }}>
                Chrome DevTools Guide
              </h4>
              <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><span style={{ color: '#fbbf24', fontWeight: 'bold' }}>Margin (Orange)</span> pushes OTHER elements away. It creates empty space *outside* the element border.</li>
                <li><span style={{ color: '#a855f7', fontWeight: 'bold' }}>Border</span> defines the frame or edge of the component.</li>
                <li><span style={{ color: '#34d399', fontWeight: 'bold' }}>Padding (Green)</span> creates breathing room *inside* the border, around the actual content.</li>
              </ul>
            </div>
          </div>

          {/* Interactive Rendering Frame */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '380px' }}>
            <h4 style={{ textAlign: 'left', alignSelf: 'flex-start', marginBottom: '24px' }}>Live Spacing Visualizer</h4>

            {/* Simulated Browser Page Context */}
            <div style={{ 
              background: 'rgba(0,0,0,0.2)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '8px', 
              width: '100%', 
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              position: 'relative'
            }}>
              
              {/* Outer neighbor block */}
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', fontSize: '0.75rem', borderRadius: '4px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Sibling Element (Header Block)
              </div>

              {/* Spacing Container */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                
                {/* Visual Representation of Margin, Border, Padding */}
                <div 
                  onMouseEnter={() => setHoverArea('margin')}
                  onMouseLeave={() => setHoverArea(null)}
                  style={{
                    backgroundColor: hoverArea === 'margin' ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                    border: '1px dashed rgba(245, 158, 11, 0.4)',
                    padding: `${margin}px`,
                    transition: 'all 0.1s ease',
                    display: 'inline-block',
                    width: '100%',
                    maxWidth: '300px'
                  }}
                >
                  <div 
                    onMouseEnter={(e) => { e.stopPropagation(); setHoverArea('border'); }}
                    onMouseLeave={() => setHoverArea(null)}
                    style={{
                      border: `${borderWidth}px solid ${hoverArea === 'border' ? 'var(--primary)' : 'rgba(255,255,255,0.3)'}`,
                      transition: 'all 0.1s ease',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <div 
                      onMouseEnter={(e) => { e.stopPropagation(); setHoverArea('padding'); }}
                      onMouseLeave={() => setHoverArea(null)}
                      style={{
                        backgroundColor: hoverArea === 'padding' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(22, 29, 49, 0.6)',
                        padding: `${padding}px`,
                        transition: 'all 0.1s ease'
                      }}
                    >
                      <div 
                        onMouseEnter={(e) => { e.stopPropagation(); setHoverArea('content'); }}
                        onMouseLeave={() => setHoverArea(null)}
                        style={{
                          backgroundColor: hoverArea === 'content' ? 'rgba(6, 182, 212, 0.25)' : 'rgba(255,255,255,0.05)',
                          padding: '12px',
                          borderRadius: '4px',
                          color: '#fff',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          fontSize: '0.85rem',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}
                      >
                        Content Box
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Sibling Element */}
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', fontSize: '0.75rem', borderRadius: '4px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Sibling Element (Footer Block)
              </div>
            </div>

            {/* Hover zone metadata display */}
            <div style={{ marginTop: '20px', minHeight: '30px', fontSize: '0.9rem', fontWeight: '500' }}>
              {hoverArea === 'margin' && <span style={{ color: '#fbbf24' }}>🟠 Margin ({margin}px): Creates outer separation. Sibling elements are pushed away.</span>}
              {hoverArea === 'border' && <span style={{ color: 'var(--primary)' }}>🟣 Border ({borderWidth}px): The frame edge. Separates inner padding from outer margin.</span>}
              {hoverArea === 'padding' && <span style={{ color: 'var(--success)' }}>🟢 Padding ({padding}px): Breathing room *inside* the card, around the text content.</span>}
              {hoverArea === 'content' && <span style={{ color: 'var(--secondary)' }}>🔵 Content Box: The core text or image container.</span>}
              {!hoverArea && <span style={{ color: 'var(--text-muted)' }}>Hover over the live preview elements to inspect CSS zones.</span>}
            </div>

          </div>
        </div>
      )}

      {/* --- UNITS: PX VS REM --- */}
      {activeTab === 'units' && (
        <div className="fade-in grid-2">
          {/* Controls */}
          <div className="card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3>Relative Sizing (px vs rem)</h3>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              A **pixel (px)** is static. A **rem (Root EM)** scales relative to the browser font settings.
            </p>

            <div className="slider-container">
              <div className="slider-label">
                <span>Browser Root Size (Normally 16px)</span>
                <span className="slider-value" style={{ color: 'var(--primary)' }}>{rootSize}px</span>
              </div>
              <input 
                type="range" min="10" max="28" step="2"
                value={rootSize} onChange={(e) => setRootSize(Number(e.target.value))}
                className="custom-slider"
              />
            </div>

            <div className="slider-container">
              <div className="slider-label">
                <span>Text Sized in Pixels (Static)</span>
                <span className="slider-value">{elementPx}px</span>
              </div>
              <input 
                type="range" min="12" max="36" step="2"
                value={elementPx} onChange={(e) => setElementPx(Number(e.target.value))}
                className="custom-slider"
              />
            </div>

            <div className="slider-container">
              <div className="slider-label">
                <span>Text Sized in REMs (Scalable)</span>
                <span className="slider-value" style={{ color: 'var(--secondary)' }}>{elementRem}rem</span>
              </div>
              <input 
                type="range" min="0.8" max="2.5" step="0.1"
                value={elementRem} onChange={(e) => setElementRem(Number(e.target.value))}
                className="custom-slider"
              />
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', fontSize: '0.82rem', border: '1px solid var(--border-color)' }}>
              <strong>💡 Accessibility Insight:</strong> If a user goes into browser settings and changes default font size (e.g. from 16px to 24px for readability), elements sized in `rem` will scale up automatically. Elements sized in `px` remain stuck and may become unreadable or break page layout.
            </div>
          </div>

          {/* Sizing Output Visualizer */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center' }}>
            <h4 style={{ textAlign: 'left', margin: 0 }}>Font Scaling Comparison</h4>
            
            {/* Visual Frame */}
            <div style={{ 
              background: 'rgba(0,0,0,0.2)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '8px', 
              padding: '24px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              
              {/* PX representation */}
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>Sized in Pixels: {elementPx}px</span>
                <div style={{ 
                  fontSize: `${elementPx}px`, 
                  color: '#fff',
                  fontWeight: '600',
                  lineHeight: '1.2'
                }}>
                  This text is locked at {elementPx}px.
                </div>
              </div>

              <hr style={{ border: 'none', borderBottom: '1px solid var(--border-color)', margin: 0 }} />

              {/* REM representation */}
              <div>
                <span className="badge badge-violet" style={{ marginBottom: '8px' }}>Sized in REM: {elementRem}rem</span>
                {/* Dynamic rendering: inline CSS using calculated pixels = elementRem * rootSize */}
                <div style={{ 
                  fontSize: `${elementRem * rootSize}px`, 
                  color: '#fff',
                  fontWeight: '600',
                  lineHeight: '1.2'
                }}>
                  This text scales to {(elementRem * rootSize).toFixed(1)}px.
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Calculation: {elementRem}rem × {rootSize}px (root size) = {(elementRem * rootSize).toFixed(1)}px
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- HAMBURGER MENU MECHANICS --- */}
      {activeTab === 'hamburger' && (
        <div className="fade-in grid-2">
          {/* Simulated Mobile Device Preview */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h4 style={{ textAlign: 'left', alignSelf: 'flex-start', marginBottom: '16px' }}>Mobile Viewport Simulator</h4>
            
            {/* Simulated Phone Shell */}
            <div style={{ 
              width: '280px', 
              height: '420px', 
              border: '8px solid rgba(255,255,255,0.15)', 
              borderRadius: '24px', 
              background: '#0b0f19',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              
              {/* Top Bar of the Phone */}
              <div style={{ 
                height: '44px', 
                background: 'rgba(255,255,255,0.03)', 
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                position: 'relative',
                zIndex: 10
              }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Logo</span>
                
                {/* Interactive Hamburger Icon */}
                <button 
                  onClick={() => setHamburgerOpen(!hamburgerOpen)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    outline: 'none'
                  }}
                  aria-expanded={hamburgerOpen ? "true" : "false"}
                >
                  {hamburgerOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>

              {/* Simulated Navigation Slide-in menu */}
              <div style={{
                position: 'absolute',
                top: '44px',
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(15, 23, 42, 0.95)',
                transform: hamburgerOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '32px 24px',
                zIndex: 5
              }}>
                <span style={{ color: '#fff', fontWeight: '600', fontSize: '1.1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>Menu</span>
                <span style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Home</span>
                <span style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Features</span>
                <span style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Pricing</span>
                <span style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Contact</span>
              </div>

              {/* Main Phone Body */}
              <div style={{ padding: '20px', textAlign: 'left', opacity: hamburgerOpen ? 0.3 : 1, transition: 'opacity 0.3s' }}>
                <h5 style={{ margin: '0 0 8px 0', fontSize: '1rem' }}>Article Title</h5>
                <p style={{ fontSize: '0.72rem', margin: 0 }}>
                  This is the main layout container of the website. Click the top-right hamburger menu to see the drawer transition.
                </p>
              </div>

            </div>
          </div>

          {/* Explanation of state / code */}
          <div className="card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3>Behind the Scenes (States & Code)</h3>
            <p style={{ margin: 0, fontSize: '0.88rem' }}>
              A hamburger menu is a classic example of dynamic UI state. Here is what is happening under the hood:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* React State */}
              <div>
                <span className="badge badge-violet" style={{ marginBottom: '6px' }}>React Component State</span>
                <pre style={{ 
                  background: 'rgba(0,0,0,0.3)', 
                  padding: '12px', 
                  borderRadius: '6px', 
                  fontSize: '0.8rem', 
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--secondary)',
                  margin: 0
                }}>
                  {`const [isOpen, setIsOpen] = useState(${hamburgerOpen ? 'true' : 'false'});`}
                </pre>
              </div>

              {/* CSS Class */}
              <div>
                <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>CSS Transition State</span>
                <pre style={{ 
                  background: 'rgba(0,0,0,0.3)', 
                  padding: '12px', 
                  borderRadius: '6px', 
                  fontSize: '0.8rem', 
                  fontFamily: 'var(--font-mono)',
                  color: '#fff',
                  margin: 0
                }}>
{`.menu-drawer {
  transform: translateX(${hamburgerOpen ? '0' : '100%'});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}`}
                </pre>
              </div>

              {/* Accessibility */}
              <div>
                <span className="badge badge-success" style={{ marginBottom: '6px' }}>Accessibility (A11y)</span>
                <pre style={{ 
                  background: 'rgba(0,0,0,0.3)', 
                  padding: '12px', 
                  borderRadius: '6px', 
                  fontSize: '0.8rem', 
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--warning)',
                  margin: 0
                }}>
                  {`<button aria-expanded="${hamburgerOpen ? 'true' : 'false'}">`}
                </pre>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Screen readers rely on `aria-expanded` to tell blind users that a menu is opened.
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
