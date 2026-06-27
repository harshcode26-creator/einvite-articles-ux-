import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavClick: (view: 'all' | 'saved' | 'about') => void;
  currentTab: 'all' | 'saved' | 'about';
  onNewArticleClick: () => void;
}

export default function Navbar({ onNavClick, currentTab, onNewArticleClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLinkClick = (name: string, action?: () => void) => {
    setIsOpen(false);
    if (action) {
      action();
    } else {
      showToast(`The "${name}" page is part of our main EInvite website. We've preserved it here for visual context!`);
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-[#ECECEC] shadow-none h-[86px] md:h-[74px] lg:h-[86px] transition-all duration-200">
      <nav className="flex justify-between items-center w-full px-6 md:px-8 lg:px-[64px] max-w-[1280px] mx-auto h-full relative">
        
        {/* Brand Logo - Far Left */}
        <div className="flex-1 flex justify-start">
          <button 
            onClick={() => handleLinkClick('Home', () => onNavClick('all'))} 
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-display text-2xl md:text-[22px] lg:text-3xl font-medium text-[#1A1A1A] tracking-tight transition-all duration-200 hover:opacity-85">
              EInvite
            </span>
          </button>
        </div>

        {/* Center Navigation Links - Centered exactly on Desktop/Tablet */}
        <div className="hidden md:flex items-center justify-center md:gap-5 lg:gap-[36px] flex-nowrap">
          {/* Home */}
          <button
            onClick={() => handleLinkClick('Home', () => onNavClick('all'))}
            className="relative font-sans md:text-[15px] lg:text-[17px] font-medium text-[#1A1A1A] hover:text-[#735c00] transition-colors duration-200 py-2 group cursor-pointer"
          >
            <span>Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#735c00] transition-all duration-200 group-hover:w-full"></span>
          </button>

          {/* Create */}
          <button
            onClick={() => handleLinkClick('Create', onNewArticleClick)}
            className="relative font-sans md:text-[15px] lg:text-[17px] font-medium text-[#1A1A1A] hover:text-[#735c00] transition-colors duration-200 py-2 group cursor-pointer"
          >
            <span>Create</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#735c00] transition-all duration-200 group-hover:w-full"></span>
          </button>

          {/* About */}
          <button
            onClick={() => handleLinkClick('About')}
            className="relative font-sans md:text-[15px] lg:text-[17px] font-medium text-[#1A1A1A] hover:text-[#735c00] transition-colors duration-200 py-2 group cursor-pointer"
          >
            <span>About</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#735c00] transition-all duration-200 group-hover:w-full"></span>
          </button>

          {/* Contact */}
          <button
            onClick={() => handleLinkClick('Contact')}
            className="relative font-sans md:text-[15px] lg:text-[17px] font-medium text-[#1A1A1A] hover:text-[#735c00] transition-colors duration-200 py-2 group cursor-pointer"
          >
            <span>Contact</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#735c00] transition-all duration-200 group-hover:w-full"></span>
          </button>

          {/* Pricing */}
          <button
            onClick={() => handleLinkClick('Pricing')}
            className="relative font-sans md:text-[15px] lg:text-[17px] font-medium text-[#1A1A1A] hover:text-[#735c00] transition-colors duration-200 py-2 group cursor-pointer"
          >
            <span>Pricing</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#735c00] transition-all duration-200 group-hover:w-full"></span>
          </button>

          {/* Articles - Active Page */}
          <button
            onClick={() => handleLinkClick('Articles', () => onNavClick('all'))}
            className="relative font-sans md:text-[15px] lg:text-[17px] font-medium text-[#1A1A1A] py-2 cursor-pointer"
          >
            <span>Articles</span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#735c00]"></span>
          </button>

          {/* Feedback */}
          <button
            onClick={() => handleLinkClick('Feedback')}
            className="relative font-sans md:text-[15px] lg:text-[17px] font-medium text-[#1A1A1A] hover:text-[#735c00] transition-colors duration-200 py-2 group cursor-pointer"
          >
            <span>Feedback</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#735c00] transition-all duration-200 group-hover:w-full"></span>
          </button>
        </div>

        {/* Action Buttons - Far Right */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-3">
          {/* Log In Button */}
          <button 
            onClick={() => handleLinkClick('Log In', () => showToast('Log In systems are in Guest Mode! Enjoy full, unlimited template previews.'))}
            className="bg-white border border-[#1A1A1A] text-[#1A1A1A] font-sans font-medium md:text-[14px] lg:text-[15px] rounded-full md:px-[18px] lg:px-6 md:py-2 lg:py-2.5 hover:bg-[#F5F5F5] transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Log In
          </button>

          {/* Sign Up Button */}
          <button 
            onClick={() => handleLinkClick('Sign Up', () => showToast('Welcome! Guest access is fully active, no signup required.'))}
            className="bg-[#1A1A1A] text-white font-sans font-medium md:text-[14px] lg:text-[15px] rounded-full md:px-[18px] lg:px-6 md:py-2 lg:py-2.5 hover:bg-[#333333] transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#1A1A1A] focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="absolute top-[86px] left-0 right-0 w-full bg-white border-b border-[#ECECEC] z-50 flex flex-col p-6 space-y-4 shadow-lg animate-fadeIn md:hidden">
          {/* Links */}
          <button
            onClick={() => handleLinkClick('Home', () => onNavClick('all'))}
            className="text-left font-sans text-[16px] font-medium text-[#1A1A1A] hover:text-[#735c00] py-1"
          >
            Home
          </button>
          <button
            onClick={() => handleLinkClick('Create', onNewArticleClick)}
            className="text-left font-sans text-[16px] font-medium text-[#1A1A1A] hover:text-[#735c00] py-1"
          >
            Create
          </button>
          <button
            onClick={() => handleLinkClick('About')}
            className="text-left font-sans text-[16px] font-medium text-[#1A1A1A] hover:text-[#735c00] py-1"
          >
            About
          </button>
          <button
            onClick={() => handleLinkClick('Contact')}
            className="text-left font-sans text-[16px] font-medium text-[#1A1A1A] hover:text-[#735c00] py-1"
          >
            Contact
          </button>
          <button
            onClick={() => handleLinkClick('Pricing')}
            className="text-left font-sans text-[16px] font-medium text-[#1A1A1A] hover:text-[#735c00] py-1"
          >
            Pricing
          </button>
          <button
            onClick={() => handleLinkClick('Articles', () => onNavClick('all'))}
            className="text-left font-sans text-[16px] font-semibold text-[#735c00] border-l-2 border-[#735c00] pl-2 py-1"
          >
            Articles
          </button>
          <button
            onClick={() => handleLinkClick('Feedback')}
            className="text-left font-sans text-[16px] font-medium text-[#1A1A1A] hover:text-[#735c00] py-1"
          >
            Feedback
          </button>

          {/* Separator */}
          <div className="h-[1px] bg-[#ECECEC] my-2"></div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => handleLinkClick('Log In', () => showToast('Log In systems are in Guest Mode! Enjoy full, unlimited template previews.'))}
              className="w-full bg-white border border-[#1A1A1A] text-[#1A1A1A] font-sans font-medium text-[15px] rounded-full py-2.5 text-center hover:bg-[#F5F5F5] transition-all duration-200 cursor-pointer"
            >
              Log In
            </button>
            <button 
              onClick={() => handleLinkClick('Sign Up', () => showToast('Welcome! Guest access is fully active, no signup required.'))}
              className="w-full bg-[#1A1A1A] text-white font-sans font-medium text-[15px] rounded-full py-2.5 text-center hover:bg-[#333333] transition-all duration-200 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Floating Interactive Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1A1A1A] text-white border border-neutral-800 px-6 py-3.5 rounded-full text-xs font-sans tracking-wide shadow-2xl flex items-center gap-2 animate-bounce-short">
          <span>✨ {toastMessage}</span>
        </div>
      )}
    </header>
  );
}
