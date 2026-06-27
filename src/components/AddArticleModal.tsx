import React, { useState } from 'react';
import { Article } from '../types';
import { X, Sparkles, Plus, Image } from 'lucide-react';

interface AddArticleModalProps {
  onClose: () => void;
  onAdd: (article: Article) => void;
}

export default function AddArticleModal({ onClose, onAdd }: AddArticleModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Article['category']>('Wedding Planning');
  const [excerpt, setExcerpt] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [author, setAuthor] = useState('');
  const [readTime, setReadTime] = useState('5 min read');
  const [coverStyle, setCoverStyle] = useState('gold');

  const COVERS: Record<string, string> = {
    gold: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnunU1sExG0ySJYwZKgRegXQ6aEzLU4jY4fITVC86JoLkb40Ef4TjjeffR8gNjHIJDEajfbUqGkq6dxIr58Y7Tsruj-_N3d5JoVy0uDDku2Eqmln4CsJfpmSV6gK5wXBbBxw15TMfEYyniGjLKdMx2Kk0q1XObR5J8zoHN6GIqTy4ABrFmxDFufBr8ClGd6FmR7JcLZE2c2xwolB2jIOMGWg3ebgQ100U8wntycpSJOB802Wh4IfFbez7Btkesze1X4js9luoh91rt',
    desk: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDb0k_nA6tJkRpqSIvjd8ef0KdVnsmdYk9cJG9UOHQMvUYeS7vmZ8Bw6e1_9Su-t0eTcTKQrEvigy0UFebac9elL52NXSXPhOvWOSfZuRuy3q84RRJ7Y751iLwDHWOwYZOaYclCC-aY41TWJLWyvhVYfhJ23lUJyKlDT6qCI3-1xG5AyWqlpFqFP5r-ACMVqLOE0cHOim4CZq5tJhImFpDBJ_1eWdYbsPZbAf3Eg1S0LIswMLBXdrD737GTX3kohyCukhvE7TOTxjro',
    qr: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcdryiwuuIKdalpJdqDyStYQuEMRHXw78GXiQCKBdVI-CqVgMKL062a8l6bhk4EfWa1-_nYNOhrMYNlYxs0q672cSxvFhgu03IBMUfcVXGlZI-hUrB0LZvZnpcyYkMUmTyIOlKtJQ-UQHYsExQzFuuNyBj-bYHsSAcQ2vVSrI5jqWa3brmhutlfdcAGgcaO54XSfCp-f-gtU2aDYwJiIP73qUzYii9jJ43c8AuPnk0P8aB4eZakrcQDx4UpKPQo1SFf3vPmMHuBNP_',
    tablet: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfJr8m-vYTcX97apfO0CP6d48AxzQR3P_6z6JHeKRftGIajxFARDYiXdR0lG2oKfTNmtuWEriLC56S3pITgyRcFPHFL66eStYF-r15JaswIGWHRvduHQjUXjjoPfNBHMuidJR37oC3PRUWAd3aXbavbwSjdV4OZ_9AgjUtcwCKnFiIATj9ARAePOy_harmr2HpZGmg6149uYfwJR0sE3az7Fijc1U0-MiaaoyL14IC22mzwr427esilvsG1SeDqhHCpjRfYcMiDuhB',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !bodyText.trim() || !author.trim()) return;

    const paragraphs = bodyText.split('\n\n').filter(p => p.trim());
    
    const newArticle: Article = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category,
      excerpt: excerpt.trim() || paragraphs[0]?.slice(0, 120) + '...',
      body: paragraphs,
      readTime,
      image: COVERS[coverStyle] || COVERS.gold,
      author: author.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      tags: [category.replace(/\s+/g, ''), 'CouplesGuide', 'Contributed'],
      tips: ['Review carefully before final publication.', 'Add beautiful photos to maximize guest interest.'],
      interactiveType: 'none'
    };

    onAdd(newArticle);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-primary/45 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      ></div>

      {/* Modal wrapper */}
      <div className="flex min-h-screen items-center justify-center p-4 md:p-8 relative z-50">
        <div className="relative w-full max-w-2xl bg-white rounded-[24px] overflow-hidden border border-outline-variant/30 shadow-2xl flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-outline-variant/15 sticky top-0 bg-white z-10">
            <h3 className="font-display text-lg text-on-surface flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary" /> Contribute a Wedding Guide
            </h3>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-surface-container-low text-on-surface-variant hover:text-primary transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content body */}
          <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 flex-1">
            
            {/* Title */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold tracking-widest text-secondary uppercase">Article Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., 7 Elegant Ways to Word Your Rehearsal Invitations"
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F9] border border-outline-variant/30 text-xs focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold tracking-widest text-secondary uppercase">Topic Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F9] border border-outline-variant/30 text-xs focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                >
                  <option value="Getting Started">Getting Started</option>
                  <option value="Wedding Planning">Wedding Planning</option>
                  <option value="Features">Features</option>
                  <option value="RSVP">RSVP</option>
                  <option value="Guest Management">Guest Management</option>
                  <option value="Templates">Templates</option>
                  <option value="Tips">Tips</option>
                  <option value="Product Updates">Product Updates</option>
                </select>
              </div>

              {/* Author */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold tracking-widest text-secondary uppercase">Author Name</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g., Charlotte Bronte"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F9] border border-outline-variant/30 text-xs focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Read Time */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold tracking-widest text-secondary uppercase">Estimated Read Time</label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="e.g., 5 min read"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F9] border border-outline-variant/30 text-xs focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
                />
              </div>

              {/* Cover Image Theme Preset */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold tracking-widest text-secondary uppercase">Cover Photography Theme</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'gold', label: 'Ivory/Gold' },
                    { id: 'desk', label: 'Minimal' },
                    { id: 'qr', label: 'QR Style' },
                    { id: 'tablet', label: 'Tablet' },
                  ].map((preset) => (
                    <button
                      type="button"
                      key={preset.id}
                      onClick={() => setCoverStyle(preset.id)}
                      className={`py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                        coverStyle === preset.id
                          ? 'bg-secondary text-white border-secondary'
                          : 'bg-[#FAF9F9] border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold tracking-widest text-secondary uppercase">Summary Excerpt</label>
              <input
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Briefly describe what this article teaches your fellow wedding planners..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F9] border border-outline-variant/30 text-xs focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary"
              />
            </div>

            {/* Body text paragraphs */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold tracking-widest text-secondary uppercase">Detailed Guide Content</label>
              <textarea
                required
                rows={6}
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                placeholder="Write your article here. Use two line breaks (Enter twice) to create distinct paragraphs..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF9F9] border border-outline-variant/30 text-xs focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary leading-relaxed"
              />
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-outline-variant/15 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-outline-variant/30 text-xs font-bold text-on-surface-variant hover:bg-surface-container-low transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" /> Publish to My Feed
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
