import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Clock, User, Tag, Share2, Heart, MessageCircle, 
  Twitter, Linkedin, Facebook, Link2, Brain 
} from 'lucide-react';
import './BlogPost.css';

const BlogPost = ({ post, onBack, currentTheme, toggleTheme }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuOpen && !event.target.closest('.share-container')) {
        setShareMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [shareMenuOpen]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link copied to clipboard!');
      });
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
    
    setShareMenuOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!post) {
    return (
      <div className={`blog-post-page ${currentTheme}`}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          color: currentTheme === 'dark' ? '#e5e7eb' : '#374151'
        }}>
          <p>Post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`blog-post-page ${currentTheme}`}>
      {/* Progress Bar */}
      <div className="scroll-progress-container">
        <div 
          className="scroll-progress-bar" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="blog-nav">
        <div className="blog-nav-container">
          <div className="blog-nav-content">
            <button 
              onClick={onBack} 
              className="back-btn"
              aria-label="Go back to blog list"
            >
              <ArrowLeft size={20} />
              <span>Back to Blog</span>
            </button>
            
            <div className="blog-nav-right">
              <div className="logo-section">
                <Brain className="brain-icon" />
                <span className="logo-text">aimode.studio</span>
              </div>
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {currentTheme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="blog-hero">
        <div className="blog-hero-container">
          <div className="blog-hero-content">
            <div className="category-badge-b large">
              <Tag size={16} />
              <span>{post.category}</span>
            </div>
            
            <h1 className="blog-title">{post.title}</h1>
            <p className="blog-subtitle">{post.excerpt}</p>
            
            <div className="blog-meta">
              <div className="meta-left">
                <div className="author-info">
                  <div className="author-avatar">
                    <User size={20} />
                  </div>
                  <div className="author-details">
                    <span className="author-name">{post.author}</span>
                    <span className="publish-date">{formatDate(post.date)}</span>
                  </div>
                </div>
                <div className="read-time">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <div className="meta-right">
                <button 
                  className={`like-btn ${isLiked ? 'liked' : ''}`}
                  onClick={() => setIsLiked(!isLiked)}
                  aria-label={isLiked ? "Unlike post" : "Like post"}
                >
                  <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                  <span>{isLiked ? '1' : '0'}</span>
                </button>
                
                <div className="share-container">
                  <button 
                    className="share-btn"
                    onClick={() => setShareMenuOpen(!shareMenuOpen)}
                    aria-label="Share post"
                  >
                    <Share2 size={18} />
                    <span>Share</span>
                  </button>
                  
                  {shareMenuOpen && (
                    <div className="share-menu">
                      <button onClick={() => handleShare('twitter')} className="share-option">
                        <Twitter size={16} />
                        <span>Twitter</span>
                      </button>
                      <button onClick={() => handleShare('linkedin')} className="share-option">
                        <Linkedin size={16} />
                        <span>LinkedIn</span>
                      </button>
                      <button onClick={() => handleShare('facebook')} className="share-option">
                        <Facebook size={16} />
                        <span>Facebook</span>
                      </button>
                      <button onClick={() => handleShare('copy')} className="share-option">
                        <Link2 size={16} />
                        <span>Copy Link</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="blog-image-container">
        <div className="blog-image-wrapper">
          <img 
            src={post.image} 
            alt={`Featured image for ${post.title}`}
            className="blog-featured-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* Article Content */}
      <main className="blog-content">
        <div className="blog-content-container">
          <article className="blog-article">
            <div className="article-body">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className={`article-paragraph ${index === 0 ? 'first-paragraph' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Tags */}
            <div className="article-tags">
              <h4>Tags</h4>
              <div className="tags-list">
                {post.tags.map((tag, index) => (
                  <span key={index} className="article-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Author Card */}
          <div className="author-card">
            <div className="author-card-content">
              <div className="author-card-avatar">
                <User size={40} />
              </div>
              <div className="author-card-info">
                <h4 className="author-card-name">{post.author}</h4>
                <p className="author-card-bio">
                  Passionate writer and technologist exploring the intersection of AI, design, and human creativity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;