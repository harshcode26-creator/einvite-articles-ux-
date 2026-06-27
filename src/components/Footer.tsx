import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20 py-16 px-4 md:px-margin-desktop mt-24">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-3">
          <span className="font-display text-2xl text-primary">EInvite</span>
          <p className="text-on-surface-variant text-xs text-center md:text-left">
            © 2026 EInvite. Editorial Excellence in Digital Planning & Design.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-xs">
            Privacy Policy
          </a>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-xs">
            Terms of Service
          </a>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-xs">
            Cookie Policy
          </a>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-xs">
            Contact Us
          </a>
          <a href="#" className="text-on-surface-variant hover:text-primary transition-colors text-xs">
            Careers
          </a>
        </div>

      </div>
    </footer>
  );
}
