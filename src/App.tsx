import React, { useState, useEffect } from 'react';
import { Article } from './types';
import { ALL_ARTICLES } from './data/articles';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ArticleModal from './components/ArticleModal';
import AddArticleModal from './components/AddArticleModal';
import { Search, Sparkles, Clock, ArrowRight, ChevronRight, Bookmark, Heart, Plus } from 'lucide-react';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('einvite_custom_articles');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...ALL_ARTICLES];
      } catch (e) {
        return ALL_ARTICLES;
      }
    }
    return ALL_ARTICLES;
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('einvite_bookmarked_ids');
    return saved ? JSON.parse(saved) : ['featured-invitation', 'love-story-qr'];
  });

  const [currentTab, setCurrentTab] = useState<'all' | 'saved' | 'about'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  // Sync bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('einvite_bookmarked_ids', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // don't open article details modal
    }
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const handleAddCustomArticle = (newArticle: Article) => {
    setArticles(prev => {
      const customOnly = prev.filter(a => a.id.startsWith('custom-'));
      const updatedCustom = [newArticle, ...customOnly];
      localStorage.setItem('einvite_custom_articles', JSON.stringify(updatedCustom));
      return [newArticle, ...prev];
    });
    setShowAddModal(false);
    // Auto-select All to see the new article
    setSelectedCategory('All');
    // Open the newly published article directly so they can celebrate!
    setActiveArticle(newArticle);
  };

  // Filtered lists
  const categories = [
    'All',
    'Getting Started',
    'Wedding Planning',
    'Features',
    'RSVP',
    'Guest Management',
    'Templates',
    'Tips',
    'Product Updates'
  ];

  const filteredArticles = articles.filter(article => {
    // Search query matching
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Category matching
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;

    // Tab matching (Saved guides vs All)
    const matchesTab = currentTab === 'all' || (currentTab === 'saved' && bookmarks.includes(article.id));

    return matchesSearch && matchesCategory && matchesTab;
  });

  // Featured Article is always the first one matching criteria (or standard featured if all)
  const featuredArticle = articles.find(a => a.id === 'featured-invitation');

  // Latest articles list (excludes the featured one in view, unless filtered or searching)
  const latestArticlesList = filteredArticles.filter(a => a.id !== 'featured-invitation');

  const visibleLatestArticles = latestArticlesList.slice(0, visibleCount);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F9] text-[#1B1C1C]">
      
      {/* Premium Header/Navigation bar */}
      <Navbar 
        onNavClick={(view) => {
          setCurrentTab(view);
          setSelectedCategory('All');
        }}
        currentTab={currentTab}
        onNewArticleClick={() => setShowAddModal(true)}
      />

      <main className="flex-grow max-w-[1280px] w-full mx-auto px-4 md:px-margin-desktop pt-8 pb-12">
        
        {/* Knowledge Hub Hero Section */}
        <section className="text-center mb-16 max-w-3xl mx-auto space-y-6">
          
          <h1 className="font-display text-4xl md:text-5xl text-on-surface leading-tight tracking-tight">
            {currentTab === 'saved' ? 'Your Saved Guides' : 'Articles & Resources'}
          </h1>
          
          <p className="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            {currentTab === 'saved' 
              ? 'Your handpicked collection of wedding stationery guides, guest trackers, and customized typography tips to perfect your big day.'
              : 'Explore our comprehensive guides, expert tips, and product updates designed to help you create unforgettable digital wedding experiences with precision and grace.'
            }
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto pt-2">
            <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-[#444748] opacity-80" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, topics or planning features..."
              className="w-full pl-12 pr-6 py-4.5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 luxury-shadow focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all placeholder:text-outline/60 text-base"
            />
          </div>

          {/* Category Pills Navigation */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleCount(6); // reset pagination when switching category
                }}
                className={`px-5 py-2 rounded-full font-sans text-xs font-medium transition-all border ${
                  selectedCategory === category
                    ? 'bg-secondary-container text-on-secondary-container border-secondary-container/30 shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high border-outline-variant/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Article Section (Only displayed when in "All" / main feed, and not filtered/searching) */}
        {currentTab === 'all' && selectedCategory === 'All' && !searchQuery && featuredArticle && (
          <section className="mb-24 space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-secondary"></span>
              <h2 className="font-sans text-xs font-bold tracking-[0.25em] text-secondary">FEATURED THIS WEEK</h2>
            </div>

            <div 
              onClick={() => setActiveArticle(featuredArticle)}
              className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-[32px] bg-surface-container-lowest luxury-shadow group cursor-pointer border border-outline-variant/10 hover:border-secondary/20 transition-all duration-300"
            >
              {/* Cover Art Image */}
              <div className="relative overflow-hidden aspect-[16/10] md:aspect-auto h-full">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              {/* Cover text */}
              <div className="p-8 md:p-14 flex flex-col justify-center space-y-6">
                <span className="text-secondary font-sans text-xs font-bold uppercase tracking-widest">
                  {featuredArticle.category}
                </span>
                
                <h3 className="font-display text-2xl md:text-3xl leading-tight text-on-surface transition-colors group-hover:text-secondary">
                  {featuredArticle.title}
                </h3>
                
                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-outline-variant/20">
                  <span className="text-on-surface-variant text-xs font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4 text-secondary" /> {featuredArticle.readTime}
                  </span>
                  
                  <button 
                    className="text-primary font-sans text-sm font-bold flex items-center gap-2 group/link cursor-pointer"
                  >
                    Read Article 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1 text-secondary" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Latest Articles Heading */}
        <section className="space-y-10">
          <div className="border-b border-outline-variant/20 pb-4 flex justify-between items-end">
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-on-surface">
                {currentTab === 'saved' ? 'Saved Collections' : 'Latest Articles'}
              </h2>
              <p className="text-on-surface-variant text-xs md:text-sm font-sans mt-1">
                {currentTab === 'saved' 
                  ? 'Manage and browse your saved wedding planning resources.'
                  : 'Browse practical guides, tutorials, inspiration, and product updates.'
                }
              </p>
            </div>

            {currentTab === 'saved' && (
              <button 
                onClick={() => {
                  setCurrentTab('all');
                  setSelectedCategory('All');
                }}
                className="text-xs font-bold text-secondary hover:underline cursor-pointer"
              >
                Browse All Resources →
              </button>
            )}
          </div>

          {/* Grid Layout of Cards */}
          {latestArticlesList.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-outline-variant/15 luxury-shadow max-w-xl mx-auto space-y-4">
              <span className="text-4xl">📚</span>
              <h3 className="font-display text-xl text-on-surface">No articles found</h3>
              <p className="text-on-surface-variant text-xs max-w-xs mx-auto">
                {currentTab === 'saved' 
                  ? 'You haven\'t bookmarked any guides yet. Tap the bookmark icon on any article card to save it!'
                  : 'No planning tips match your search criteria. Try filtering by another category.'
                }
              </p>
              {currentTab === 'saved' && (
                <button
                  onClick={() => setCurrentTab('all')}
                  className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-full cursor-pointer"
                >
                  Explore Wedding Guides
                </button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {visibleLatestArticles.map((article) => {
                const isSaved = bookmarks.includes(article.id);
                return (
                  <article 
                    key={article.id}
                    onClick={() => setActiveArticle(article)}
                    className="flex flex-col group card-hover cursor-pointer bg-white rounded-2xl overflow-hidden border border-outline-variant/10 p-4 transition-all"
                  >
                    {/* Cover Photo */}
                    <div className="rounded-xl overflow-hidden aspect-[4/3] mb-5 luxury-shadow border border-outline-variant/10 relative">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Bookmark button directly on card hover */}
                      <button
                        onClick={(e) => handleToggleBookmark(article.id, e)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                          isSaved 
                            ? 'bg-secondary-container text-on-secondary-container scale-110 shadow-md' 
                            : 'bg-white/80 hover:bg-white text-on-surface-variant hover:text-primary opacity-0 group-hover:opacity-100 shadow-sm'
                        }`}
                        title={isSaved ? 'Remove Bookmark' : 'Save Article'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-secondary text-secondary' : ''}`} />
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-secondary font-sans text-[10px] font-bold tracking-[0.15em] uppercase">
                        {article.category}
                      </span>
                      <span className="text-outline text-[10px] font-sans">
                        {article.date}
                      </span>
                    </div>

                    <h4 className="font-display text-lg mb-3 text-on-surface transition-colors group-hover:text-secondary line-clamp-2">
                      {article.title}
                    </h4>

                    <p className="text-on-surface-variant text-xs line-clamp-2 mb-5 font-sans leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Footer link row */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#f5f3f3]">
                      <span className="text-on-surface-variant text-xs font-medium">
                        {article.readTime}
                      </span>
                      
                      <button 
                        className="text-primary font-bold text-xs flex items-center gap-1 group/btn cursor-pointer"
                      >
                        Read Article <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 text-secondary" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination Load More section */}
          {latestArticlesList.length > visibleCount && (
            <div className="mt-16 text-center space-y-4">
              <p className="text-on-surface-variant text-xs font-medium">
                Showing {visibleLatestArticles.length} of {latestArticlesList.length} Articles
              </p>
              
              <button 
                onClick={() => setVisibleCount(prev => prev + 3)}
                className="px-8 py-3 rounded-full border border-primary text-primary font-sans text-sm font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-sm inline-flex items-center gap-2 cursor-pointer"
              >
                Load More Articles 
                <span className="text-lg">↓</span>
              </button>
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Reading modal details */}
      {activeArticle && (
        <ArticleModal 
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
          isBookmarked={bookmarks.includes(activeArticle.id)}
          onToggleBookmark={() => handleToggleBookmark(activeArticle.id)}
        />
      )}

      {/* Custom Add article Form Modal */}
      {showAddModal && (
        <AddArticleModal 
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddCustomArticle}
        />
      )}

    </div>
  );
}
