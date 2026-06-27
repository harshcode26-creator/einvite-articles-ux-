import React, { useState } from 'react';
import { Article } from '../types';
import { X, Bookmark, Share2, Calendar, User, Clock, Check, ArrowLeft } from 'lucide-react';
import LoveStoryQRGenerator from './LoveStoryQRGenerator';
import RSVPTrackerDashboard from './RSVPTrackerDashboard';
import ThemePreviewer from './ThemePreviewer';

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export default function ArticleModal({ article, onClose, isBookmarked, onToggleBookmark }: ArticleModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-primary/40 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      ></div>

      {/* Modal Scroll Wrapper */}
      <div className="flex min-h-screen items-center justify-center p-4 md:p-8 relative z-50">
        {/* Modal Main container */}
        <div 
          className="relative w-full max-w-5xl bg-[#FAF9F9] rounded-[32px] overflow-hidden border border-outline-variant/30 shadow-2xl transition-all animate-scaleUp max-h-[90vh] flex flex-col"
        >
          {/* Sticky Header Row */}
          <div className="flex justify-between items-center px-6 md:px-10 py-5 bg-[#FAF9F9] border-b border-outline-variant/15 sticky top-0 z-20">
            <button 
              onClick={onClose} 
              className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Resources
            </button>

            <div className="flex items-center gap-2">
              {/* Share */}
              <button 
                onClick={handleCopyLink}
                className="p-2.5 rounded-full hover:bg-surface-container-low text-on-surface-variant hover:text-primary transition-all cursor-pointer"
                title="Copy Article Link"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
              </button>

              {/* Bookmark toggle */}
              <button 
                onClick={onToggleBookmark}
                className={`p-2.5 rounded-full hover:bg-surface-container-low transition-all cursor-pointer ${
                  isBookmarked ? 'text-secondary bg-secondary-container/20' : 'text-on-surface-variant hover:text-primary'
                }`}
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-secondary' : ''}`} />
              </button>

              {/* Close */}
              <button 
                onClick={onClose}
                className="p-2.5 rounded-full hover:bg-surface-container-low text-on-surface-variant hover:text-primary transition-all ml-1 cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Content body */}
          <div className="overflow-y-auto px-6 md:px-10 py-8 flex-1 space-y-8">
            
            {/* Meta and Header Titles */}
            <div className="max-w-3xl space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-secondary-container/20 text-secondary border border-secondary-container/30 text-[10px] font-bold uppercase tracking-widest">
                {article.category}
              </span>
              
              <h1 className="font-display text-2xl md:text-4xl text-on-surface leading-tight tracking-tight">
                {article.title}
              </h1>

              {/* Author Row */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-on-surface-variant pt-2">
                <div className="flex items-center gap-1.5 font-medium">
                  <User className="w-3.5 h-3.5 text-secondary" /> By {article.author}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-secondary" /> {article.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-secondary" /> {article.readTime}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="w-full aspect-[21/9] rounded-[24px] overflow-hidden luxury-shadow border border-outline-variant/10">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Main Article Content Grid (Content + Sidebar/Interactives) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Detailed Article Text Body */}
              <div className="lg:col-span-7 space-y-6 text-on-surface-variant font-sans text-sm md:text-base leading-relaxed">
                {article.body.map((para, idx) => (
                  <p key={idx} className="first-letter:font-display first-letter:text-3xl first-letter:font-semibold first-letter:mr-1 first-letter:float-left first-letter:text-secondary">
                    {para}
                  </p>
                ))}

                {/* Quote block */}
                {article.quote && (
                  <blockquote className="border-l-4 border-secondary pl-4 py-1 italic text-secondary text-base bg-secondary-container/5 rounded-r-lg my-6">
                    "{article.quote}"
                  </blockquote>
                )}

                {/* Tips Section */}
                {article.tips && article.tips.length > 0 && (
                  <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 mt-8">
                    <h4 className="font-display text-base font-semibold text-on-surface mb-3 flex items-center gap-2">
                      ✍ Eleanor's Expert Recommendations
                    </h4>
                    <ul className="space-y-2 text-xs md:text-sm">
                      {article.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-secondary font-bold text-xs mt-0.5">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tag / Meta Sidebar */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-5 rounded-2xl border border-outline-variant/15 luxury-shadow">
                  <h4 className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Topic Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-[#FAF9F9] text-on-surface-variant border border-outline-variant/25 text-[11px] font-sans">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-secondary-container/10 p-5 rounded-2xl border border-secondary-container/30 text-xs text-on-secondary-container">
                  <h4 className="font-display text-sm font-semibold mb-2 text-secondary">EInvite Professional Suite</h4>
                  <p className="leading-relaxed mb-4">
                    This resource is brought to you by EInvite's product studio. Launch your wedding invitation portal with bespoke typography matching.
                  </p>
                  <button className="w-full py-2 bg-primary text-white font-bold text-center rounded-lg hover:bg-primary/90 transition-all cursor-pointer">
                    Start Custom Invitation Free
                  </button>
                </div>
              </div>

            </div>

            {/* Interactive Widget Overlay (renders at bottom of full article details!) */}
            {article.interactiveType && article.interactiveType !== 'none' && (
              <div className="pt-6 border-t border-outline-variant/20 mt-12">
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest bg-secondary-container/30 px-3 py-1 rounded-full">
                    Interactive Workshop Guide
                  </span>
                </div>
                {article.interactiveType === 'qr' && <LoveStoryQRGenerator />}
                {article.interactiveType === 'rsvp' && <RSVPTrackerDashboard />}
                {article.interactiveType === 'themes' && <ThemePreviewer />}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
