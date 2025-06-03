import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search, Menu, X, Clock, User, Tag, ArrowRight, Github,
  Twitter, Linkedin, Mail, TrendingUp, Zap, Brain, Code2
} from 'lucide-react';
import './App.css';
import BlogPost from './BlogPost.js';

const App = () => {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [scrollY, setScrollY] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Get saved theme from localStorage or default to dark
    return localStorage.getItem('theme') || 'dark';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const [selectedPost, setSelectedPost] = useState(null);
  const [showBlogPost, setShowBlogPost] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  // Theme toggle handler
  const toggleTheme = useCallback(() => {
    setCurrentTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  }, []);

  // Mobile menu toggle handler
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Mock blog data
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI: Beyond Machine Learning",
      excerpt: "Exploring the next frontier of artificial intelligence and its impact on creative industries.",
      content: "Artificial intelligence is rapidly evolving beyond traditional machine learning paradigms. Today's AI systems are increasingly capable of creative tasks once thought to be exclusively human domains. From generating artwork to composing music, the boundaries between human and machine creativity continue to blur.\n\nResearchers are now focusing on developing systems that can understand context, nuance, and even emotional subtleties. The next generation of AI might not just assist creative professionals but work as true collaborators, bringing novel perspectives and unexpected innovations to the creative process.\n\nHowever, this evolution raises important questions about authorship, originality, and the nature of creativity itself. As AI becomes more sophisticated in creative endeavors, how do we define the unique value of human input? What new forms of human-AI collaboration might emerge? These questions will define the future relationship between artificial intelligence and creative industries.",
      category: "AI Research",
      author: "Alex Chen",
      date: "2025-05-28",
      readTime: "8 min read",
      tags: ["AI", "Machine Learning", "Future Tech"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Building Responsive Design Systems",
      excerpt: "A comprehensive guide to creating scalable and maintainable design systems for modern web applications.",
      content: "Design systems have become essential for maintaining consistency across complex digital products. When built correctly, they serve as the single source of truth for designers and developers, eliminating confusion and streamlining collaboration.\n\nThe key to a successful design system lies in its architecture. Start by auditing your existing UI components and identifying patterns. Document your color palette, typography, spacing scales, and component behaviors meticulously.\n\nImplement a modular approach where components can be combined like building blocks. This modular architecture enables teams to create new features quickly without reinventing the wheel.\n\nMaintenance is equally important. Establish clear governance processes to manage changes and ensure the design system evolves alongside your product. Regular reviews and updates prevent the system from becoming obsolete.\n\nBy investing in a robust design system, organizations can significantly improve their development velocity while maintaining a cohesive user experience across all touchpoints.",
      category: "Design",
      author: "Sarah Kim",
      date: "2025-05-26",
      readTime: "12 min read",
      tags: ["Design Systems", "UI/UX", "Frontend"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "The Art of Code: Writing Beautiful JavaScript",
      excerpt: "Discover techniques for writing clean, elegant, and performant JavaScript code that scales.",
      content: "Beautiful code is not just about functionality—it's about craftsmanship. Clean code communicates intent clearly, makes maintenance easier, and prevents bugs before they happen.\n\nStart by embracing modern JavaScript features like destructuring, arrow functions, and optional chaining. These tools can dramatically improve code readability when used appropriately.\n\nConsider the cognitive load your code places on readers. Break complex operations into well-named helper functions. Use meaningful variable names that explain their purpose without requiring comments.\n\nConsistency is crucial. Whether you prefer functional or object-oriented paradigms, apply your chosen patterns consistently throughout the codebase.\n\nRemember that optimization comes after clarity. Write clear code first, then optimize performance where data shows it's necessary. Modern JavaScript engines are remarkably efficient at optimizing well-structured code.\n\nBy treating code as a craft rather than just a technical solution, you create software that's not only functional but sustainable and enjoyable to work with over time.",
      category: "Development",
      author: "Mike Johnson",
      date: "2025-05-24",
      readTime: "10 min read",
      tags: ["JavaScript", "Clean Code", "Best Practices"],
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: 4,
      title: "Emerging Trends in Web3 and Blockchain",
      excerpt: "Understanding the latest developments in decentralized technologies and their real-world applications.",
      content: "Web3 technologies are reshaping how we think about digital ownership and trust. Beyond cryptocurrencies, blockchain is enabling new models for collaboration, governance, and value exchange across industries.\n\nDecentralized finance (DeFi) continues to mature, offering alternatives to traditional financial services without intermediaries. Meanwhile, NFTs are evolving beyond digital art to represent real-world assets and unlock new forms of utility for their holders.\n\nDAOs (Decentralized Autonomous Organizations) are pioneering new approaches to collective decision-making and resource allocation. These digital cooperatives manage billions in assets through transparent, code-based governance systems.\n\nInteroperability between blockchains is becoming a key focus, with cross-chain protocols enabling seamless asset transfers and communication between previously isolated networks.\n\nRegulatory frameworks are also evolving to accommodate these innovations while protecting consumers. Forward-thinking jurisdictions are establishing clear guidelines that foster innovation while addressing legitimate concerns.\n\nAs Web3 technologies mature, we're witnessing the emergence of a more open, transparent, and user-owned internet that redistributes value to creators and participants rather than centralized platforms.",
      category: "Technology",
      author: "Emma Rodriguez",
      date: "2025-05-22",
      readTime: "15 min read",
      tags: ["Web3", "Blockchain", "Cryptocurrency"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: 5,
      title: "Accessibility-First Development",
      excerpt: "Why and how to prioritize accessibility in modern web development workflows.",
      content: "Accessibility isn't just a compliance requirement—it's a fundamental aspect of good design and development. By building accessible products, we extend our reach to the over one billion people worldwide with disabilities while creating better experiences for all users.\n\nStart by integrating accessibility testing early in your development process. Automated tools can catch many issues, but manual testing with screen readers and keyboard navigation is essential for a comprehensive evaluation.\n\nSemantics matter tremendously. Using the right HTML elements for their intended purpose provides built-in accessibility features. A properly structured document with appropriate headings, landmarks, and ARIA attributes when necessary creates a navigable experience for assistive technology users.\n\nDesign with flexibility in mind. Support text resizing, ensure sufficient color contrast, and provide alternatives for color-based information. These considerations help users with visual impairments but benefit everyone in challenging viewing conditions.\n\nMake interactive elements like forms and custom components fully keyboard accessible and ensure they communicate their purpose and state clearly to assistive technologies.\n\nBy embracing accessibility as a core principle rather than an afterthought, we build more inclusive, usable, and ultimately successful digital products.",
      category: "Development",
      author: "Jordan Taylor",
      date: "2025-05-20",
      readTime: "11 min read",
      tags: ["Accessibility", "Web Development", "Inclusivity"],
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: 6,
      title: "State Management in React: Beyond Redux",
      excerpt: "Exploring modern alternatives for managing state in React applications.",
      content: "While Redux has been the go-to state management solution for React applications for years, the ecosystem has evolved to offer more lightweight and specialized alternatives. Modern React developers now have a variety of tools to match their specific use cases.\n\nReact's built-in Context API combined with useReducer provides Redux-like functionality without additional dependencies, perfect for medium-sized applications with moderate complexity.\n\nFor server state management, libraries like React Query and SWR provide powerful caching, background updates, and revalidation strategies that dramatically simplify data fetching logic.\n\nZustand offers a minimalist store with a straightforward API that avoids boilerplate while maintaining Redux's core principles. Its lightweight nature and flexible middleware system make it increasingly popular.\n\nJotai and Recoil take an atomic approach to state, allowing granular updates and subscriptions that can significantly improve performance in applications with complex state interdependencies.\n\nThe key is choosing the right tool for your specific requirements rather than defaulting to the most popular option. Modern state management is about matching your solution to your problem's characteristics and complexity.",
      category: "Development",
      author: "Priya Sharma",
      date: "2025-05-18",
      readTime: "9 min read",
      tags: ["React", "State Management", "Frontend"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      featured: false
    }
  ];

  // Handler to open a blog post
  const handleOpenPost = useCallback((post) => {
    setSelectedPost(post);
    setShowBlogPost(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handler to go back to blog list
  const handleBackToBlog = useCallback(() => {
    setShowBlogPost(false);
    setSelectedPost(null);
  }, []);

  const categories = ['All', 'AI Research', 'Design', 'Development', 'Technology'];

  // Memoized filtered posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogPosts, searchQuery, selectedCategory]);

  // Memoized paginated posts
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  // Memoized featured post
  const featuredPost = useMemo(() => {
    return blogPosts.find(post => post.featured);
  }, [blogPosts]);

  // Search handler
  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  }, []);

  // Category selection handler
  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on category change
  }, []);

  // Newsletter subscription handler
  const handleSubscribe = useCallback((e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;

    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      alert(`Thank you for subscribing with ${email}!`);
      e.target.reset();
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={`app ${currentTheme}`}>
      {showBlogPost && selectedPost ? (
        <BlogPost
          post={selectedPost}
          onBack={handleBackToBlog}
          currentTheme={currentTheme}
          toggleTheme={toggleTheme}
        />
      ) : (
        <>
          {/* Animated Background Elements */}
          <div className="background-elements" aria-hidden="true">
            <div className="floating-orb orb-1"></div>
            <div className="floating-orb orb-2"></div>
            <div className="floating-orb orb-3"></div>
          </div>

          {/* Navigation */}
          <nav className={`navbar ${scrollY > 50 ? 'scrolled' : ''}`}>
  <div className="nav-container">
    <div className="nav-content">
      <div className="logo-section">
        <a href="#" className="logo-icon" aria-label="aimode.studio home">
          <Brain className="brain-icon" aria-hidden="true" />
        </a>
        <span className="logo-text">aimode.studio</span>
      </div>
      
      {/* Only Desktop Navigation with Theme Toggle */}
      <div className="desktop-nav">
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
          <header className="hero-section">
            <div className="hero-container">
              <div className="hero-content">
                <h1 className="hero-title">AI Blog</h1>
                <p className="hero-subtitle">
                  Exploring the intersection of artificial intelligence, design, and human creativity
                </p>
              </div>

              {/* Search Bar */}
              <div className="search-container">
                <div className="search-wrapper">
                  <Search className="search-icon" size={20} aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-input"
                    aria-label="Search articles"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="category-filter" role="tablist" aria-label="Filter posts by category">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    role="tab"
                    aria-selected={selectedCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <main>
            {/* Featured Post */}
            {featuredPost && (
              <section className="featured-section">
                <div className="featured-container">
                  <div className="featured-post">
                    <div className="featured-grid">
                      <div className="featured-image">
                        <img
                          src={featuredPost.image}
                          alt=""
                          className="featured-img"
                          loading="lazy"
                        />
                        <div className="featured-badge">
                          <span>Featured</span>
                        </div>
                      </div>
                      <div className="featured-content">
                        <div className="post-meta">
                          <span className="meta-item">
                            <User size={16} aria-hidden="true" />
                            <span>{featuredPost.author}</span>
                          </span>
                          <span className="meta-item">
                            <Clock size={16} aria-hidden="true" />
                            <span>{featuredPost.readTime}</span>
                          </span>
                        </div>
                        <h2 className="featured-title">{featuredPost.title}</h2>
                        <p className="featured-excerpt">{featuredPost.excerpt}</p>
                        <div className="post-tags">
                          {featuredPost.tags.map((tag, index) => (
                            <span key={index} className="tag">#{tag}</span>
                          ))}
                        </div>
                        <button
                          className="read-more-btn"
                          onClick={() => handleOpenPost(featuredPost)}
                        >
                          <span>Read More</span>
                          <ArrowRight size={16} className="arrow-icon" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Blog Posts Grid */}
            <section className="posts-section">
              <div className="posts-container">
                {paginatedPosts.length > 0 ? (
                  <>
                    <div className="posts-grid">
                      {paginatedPosts.map((post, index) => (
                        <article key={post.id} className="post-card" style={{ animationDelay: `${index * 100}ms` }}>
                          <div className="card-wrapper">
                            <div className="card-content">
                              <div className="post-image">
                                <img src={post.image} alt="" className="card-img" loading="lazy" />
                                <div className="category-badge">
                                  <span>{post.category}</span>
                                </div>
                              </div>
                              <div className="card-body">
                                <div className="post-meta">
                                  <span className="meta-item">
                                    <User size={14} aria-hidden="true" />
                                    <span>{post.author}</span>
                                  </span>
                                  <span className="meta-item">
                                    <Clock size={14} aria-hidden="true" />
                                    <span>{post.readTime}</span>
                                  </span>
                                </div>
                                <h3 className="post-title">{post.title}</h3>
                                <p className="post-excerpt">{post.excerpt}</p>
                                <div className="post-tags">
                                  {post.tags.slice(0, 2).map((tag, tagIndex) => (
                                    <span key={tagIndex} className="tag small">#{tag}</span>
                                  ))}
                                  {post.tags.length > 2 && (
                                    <span className="tag small">+{post.tags.length - 2}</span>
                                  )}
                                </div>
                                <button
                                  className="read-more-btn"
                                  onClick={() => handleOpenPost(featuredPost)}
                                >
                                  <span>Read More</span>
                                  <ArrowRight size={16} className="arrow-icon" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>

                    {/* Pagination */}
                    {filteredPosts.length > postsPerPage && (
                      <div className="pagination">
                        <button
                          className="page-btn prev"
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          aria-label="Previous page"
                        >
                          &larr;
                        </button>

                        {[...Array(Math.ceil(filteredPosts.length / postsPerPage))].map((_, i) => (
                          <button
                            key={i}
                            className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(i + 1)}
                            aria-current={currentPage === i + 1 ? "page" : undefined}
                          >
                            {i + 1}
                          </button>
                        ))}

                        <button
                          className="page-btn next"
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredPosts.length / postsPerPage)))}
                          disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
                          aria-label="Next page"
                        >
                          &rarr;
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="no-results">
                    <h3>No posts found</h3>
                    <p>Try adjusting your search or category filters</p>
                    <button
                      className="reset-filters-btn"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter-section">
              <div className="newsletter-container">
                <div className="newsletter-card">
                  <div className="newsletter-content">
                    <div className="newsletter-header">
                      <Zap className="newsletter-icon" aria-hidden="true" />
                      <h3 className="newsletter-title">Stay Updated</h3>
                      <p className="newsletter-subtitle">
                        Get the latest insights on AI, design, and technology delivered to your inbox.
                      </p>
                    </div>
                    <form className="newsletter-form" onSubmit={handleSubscribe}>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="newsletter-input"
                        aria-label="Email address for newsletter"
                        required
                      />
                      <button
                        type="submit"
                        className="newsletter-btn"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Subscribing...' : 'Subscribe'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="footer">
            <div className="footer-container">
              <div className="footer-content">
                <div className="footer-grid">
                  <div className="footer-brand">
                    <div className="footer-logo">
                      <div className="logo-icon">
                        <Brain className="brain-icon" aria-hidden="true" />
                      </div>
                      <span className="logo-text">aimode.studio</span>
                    </div>
                    <p className="footer-description">
                      Exploring the future of artificial intelligence, design, and human creativity through thoughtful content and innovative perspectives.
                    </p>
                  </div>
                  <div className="footer-links">
                    <h4 className="footer-heading">Categories</h4>
                    <nav className="link-list">
                      {categories.slice(1).map((category) => (
                        <a
                          key={category}
                          href="#"
                          className="footer-link"
                          onClick={(e) => {
                            e.preventDefault();
                            handleCategorySelect(category);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          {category}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div className="footer-social">
                    <h4 className="footer-heading">Connect</h4>
                    <div className="social-links">
                      <a href="#" className="social-link" aria-label="Twitter">
                        <Twitter size={20} aria-hidden="true" />
                      </a>
                      <a href="#" className="social-link" aria-label="GitHub">
                        <Github size={20} aria-hidden="true" />
                      </a>
                      <a href="#" className="social-link" aria-label="LinkedIn">
                        <Linkedin size={20} aria-hidden="true" />
                      </a>
                      <a href="#" className="social-link" aria-label="Email">
                        <Mail size={20} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="footer-bottom">
                  <p>&copy; 2025 aimode.studio. All rights reserved.</p>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;