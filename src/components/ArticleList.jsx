import React from 'react';
import { articles } from '../data/articles';
import { BookOpen } from 'lucide-react';

export default function ArticleList({ onSelectArticle, filterType = 'all' }) {
  // Filter logic based on the menu category selected
  const filteredArticles = articles.filter(article => {
    if (filterType === 'casestudies') {
      return ['maps', 'blinkit', 'fifa'].includes(article.id);
    }
    return true; // 'all' displays everything
  });

  return (
    <div className="fade-in">
      {/* Editorial Feed Header */}
      <div className="feed-header" style={{ textAlign: 'left' }}>
        <h1 className="feed-title">
          {filterType === 'casestudies' ? 'Case Studies' : 'Tech Literacy for Product Managers'}
        </h1>
        <p className="feed-subtitle">
          {filterType === 'casestudies' 
            ? 'Deep-dive architectural breakdowns of real-world products at global scale.' 
            : 'Deconstructing engineering architecture, databases, and UI code in plain English. No jargon.'}
        </p>
      </div>

      {/* Article Feed list */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filteredArticles.map((article) => (
          <article 
            key={article.id} 
            className="article-card"
            onClick={() => onSelectArticle(article.id)}
            style={{ textAlign: 'left' }}
          >
            {/* Meta row */}
            <div className="article-meta">
              <span className="article-tag">{article.category}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <BookOpen size={12} />
                {article.readTime}
              </span>
            </div>

            {/* Title & Teaser */}
            <h2 className="article-card-title">{article.title}</h2>
            <p className="article-card-teaser">{article.teaser}</p>

            {/* Card Footer */}
            <div className="article-card-footer">
              <span style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                By {article.author}
              </span>
              <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem' }}>
                Read Article →
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
