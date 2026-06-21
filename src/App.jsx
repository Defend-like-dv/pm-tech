import React, { useState, useEffect } from 'react';
import { Layers, Menu, X, Sun, Moon } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
import ArticleList from './components/ArticleList';
import ArticleView from './components/ArticleView';
import TechStacks from './components/TechStacks';
import Glossary from './components/Glossary';

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || 'casestudies';
  });
  const [selectedArticleId, setSelectedArticleId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('article') || null;
  });
  const [selectedStackId, setSelectedStackId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('stack') || null;
  });
  
  // Theme state
  const [theme, setTheme] = useState('light');
  // Mobile menu drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper to synchronize state with URL query parameters
  const syncUrl = (tab, article, stack) => {
    const params = new URLSearchParams();
    if (tab) params.set('tab', tab);
    if (article) params.set('article', article);
    if (stack) params.set('stack', stack);
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({ tab, article, stack }, '', newUrl);
  };

  // Sync theme to body class
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Handle browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setActiveTab(params.get('tab') || 'casestudies');
      setSelectedArticleId(params.get('article') || null);
      setSelectedStackId(params.get('stack') || null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogoClick = () => {
    setActiveTab('casestudies');
    setSelectedArticleId(null);
    setSelectedStackId(null);
    setMobileMenuOpen(false);
    syncUrl('casestudies', null, null);
  };

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setSelectedArticleId(null); 
    setSelectedStackId(null);
    setMobileMenuOpen(false);
    syncUrl(tabId, null, null);
  };

  return (
    <div className="app-container">
      {/* Editorial Navigation Header */}
      <header className="blog-header">
        <div className="blog-logo" onClick={handleLogoClick}>
          <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Layers size={20} />
          </div>
          <span className="logo-text">PM-Tech</span>
          <span className="logo-badge">UPSKILL</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="blog-nav desktop-only">
          <span 
            className={`nav-link ${activeTab === 'casestudies' ? 'active' : ''}`}
            onClick={() => handleNavClick('casestudies')}
          >
            Case Studies
          </span>
          <span 
            className={`nav-link ${activeTab === 'techstacks' ? 'active' : ''}`}
            onClick={() => handleNavClick('techstacks')}
          >
            Tech Stacks
          </span>
          <span 
            className={`nav-link ${activeTab === 'glossary' ? 'active' : ''}`}
            onClick={() => handleNavClick('glossary')}
          >
            Glossary
          </span>
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="btn"
            style={{ 
              padding: '6px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </nav>

        {/* Mobile Header Controls */}
        <div className="mobile-only" style={{ display: 'none', alignItems: 'center', gap: '16px' }}>
          {/* Mobile Theme Toggle */}
          <button 
            onClick={toggleTheme}
            style={{ 
              border: 'none',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Hamburger Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ 
              border: 'none',
              background: 'transparent',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="mobile-dropdown-menu fade-in">
          <span 
            className={`mobile-nav-link ${activeTab === 'casestudies' ? 'active' : ''}`}
            onClick={() => handleNavClick('casestudies')}
          >
            Case Studies
          </span>
          <span 
            className={`mobile-nav-link ${activeTab === 'techstacks' ? 'active' : ''}`}
            onClick={() => handleNavClick('techstacks')}
          >
            Tech Stacks
          </span>
          <span 
            className={`mobile-nav-link ${activeTab === 'glossary' ? 'active' : ''}`}
            onClick={() => handleNavClick('glossary')}
          >
            Glossary
          </span>
        </div>
      )}

      {/* Main Publication Canvas */}
      <main className="main-wrapper">
        <div className="content-container">
          
          {/* View Routing */}
          {activeTab === 'casestudies' && (
            selectedArticleId ? (
              <ArticleView 
                articleId={selectedArticleId} 
                onBack={() => {
                  setSelectedArticleId(null);
                  syncUrl('casestudies', null, null);
                }} 
              />
            ) : (
              <ArticleList 
                filterType="casestudies" 
                onSelectArticle={(id) => {
                  setSelectedArticleId(id);
                  syncUrl('casestudies', id, null);
                }} 
              />
            )
          )}

          {activeTab === 'techstacks' && (
            <TechStacks 
              selectedStackId={selectedStackId}
              onSelectStack={(id) => {
                setSelectedStackId(id);
                syncUrl('techstacks', null, id);
              }}
            />
          )}
          
          {activeTab === 'glossary' && <Glossary />}
          
        </div>
      </main>

      {/* Rich Editorial Footer */}
      <footer style={{ 
        borderTop: '1px solid var(--border-color)', 
        padding: '60px 40px 40px 40px', 
        background: 'var(--bg-secondary)',
        transition: 'background-color var(--transition-normal), border-color var(--transition-normal)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
        width: '100%'
      }}>
        {/* Footer Top Content */}
        <div style={{ 
          width: '100%', 
          maxWidth: '740px', 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr', 
          gap: '40px',
          textAlign: 'left'
        }} className="footer-grid">
          
          {/* About us Column */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              About Us
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
              PM-Tech is an educational publication designed to help product managers build technical literacy and bridge the communication gap with engineering and design. We deconstruct backend architectures, system designs, APIs, and databases into intuitive, plain-English frameworks.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Resource Index
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span 
                onClick={() => handleNavClick('casestudies')}
                style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color var(--transition-fast)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
              >
                Case Studies
              </span>
              <span 
                onClick={() => handleNavClick('techstacks')}
                style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color var(--transition-fast)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
              >
                Tech Stacks
              </span>
              <span 
                onClick={() => handleNavClick('glossary')}
                style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color var(--transition-fast)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
              >
                Glossary
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright Row */}
        <div style={{ 
          width: '100%', 
          maxWidth: '740px', 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '24px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }} className="footer-row">
          <span>© 2026 PM-Tech Publication. All rights reserved.</span>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            style={{ color: 'var(--text-muted)', transition: 'color var(--transition-fast)' }}
            onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
          >
            <GithubIcon size={16} />
          </a>
        </div>
      </footer>

      {/* Media Queries for responsive navbar & dropdown */}
      <style>{`
        @media (max-width: 680px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
          .mobile-dropdown-menu {
            display: flex;
            flex-direction: column;
            background: var(--bg-main);
            border-bottom: 1px solid var(--border-color);
            padding: 16px 20px;
            gap: 16px;
            position: fixed;
            top: 65px;
            left: 0;
            right: 0;
            z-index: 99;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            transition: background-color var(--transition-normal), border-color var(--transition-normal);
          }
          .mobile-nav-link {
            font-size: 1rem;
            color: var(--text-secondary);
            font-weight: 500;
            cursor: pointer;
            padding: 8px 0;
            border-bottom: 1px solid transparent;
          }
          .mobile-nav-link.active {
            color: var(--text-primary);
            font-weight: 600;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          .footer-row {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
