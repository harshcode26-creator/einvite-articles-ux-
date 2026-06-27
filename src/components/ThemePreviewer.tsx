import React, { useState } from 'react';
import { Type, Palette, AlignLeft, AlignCenter, AlignRight, Check, Sparkles } from 'lucide-react';

interface ThemePreset {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  accentColor: string;
  fontFamilyClass: string; // 'font-display' or 'font-mono' or 'font-sans'
  styleName: string;
}

const THEMES: ThemePreset[] = [
  {
    id: 'classic-editorial',
    name: 'Classic Editorial',
    bgColor: '#FAF7F2',
    textColor: '#161717',
    borderColor: '#735c00',
    accentColor: '#735c00',
    fontFamilyClass: 'font-display',
    styleName: 'Luxurious Serif'
  },
  {
    id: 'modern-brutalist',
    name: 'Modern Brutalist',
    bgColor: '#161717',
    textColor: '#FFFFFF',
    borderColor: '#444748',
    accentColor: '#C8C6C5',
    fontFamilyClass: 'font-sans',
    styleName: 'Monochromatic Grid'
  },
  {
    id: 'botanical-linen',
    name: 'Botanical Linen',
    bgColor: '#F1F3EE',
    textColor: '#1C3022',
    borderColor: '#94928D',
    accentColor: '#735c00',
    fontFamilyClass: 'font-sans',
    styleName: 'Organic Olive'
  },
  {
    id: 'midnight-celestial',
    name: 'Midnight Celestial',
    bgColor: '#0F121C',
    textColor: '#E4E2E1',
    borderColor: '#E9C349',
    accentColor: '#E9C349',
    fontFamilyClass: 'font-display',
    styleName: 'Cosmic Gold'
  }
];

export default function ThemePreviewer() {
  const [activeThemeId, setActiveThemeId] = useState('classic-editorial');
  const [partner1, setPartner1] = useState('Eleanor Sterling');
  const [partner2, setPartner2] = useState('Marcus Vance');
  const [date, setDate] = useState('October 18, 2026');
  const [venue, setVenue] = useState('The Overlook Glasshouse, Hudson Valley');
  const [letterSpacing, setLetterSpacing] = useState('tracking-wide'); // tracking-tight | tracking-wide | tracking-widest
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [copiedLink, setCopiedLink] = useState(false);

  const activeTheme = THEMES.find(t => t.id === activeThemeId) || THEMES[0];

  const handleShareDraft = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div id="theme-previewer" className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-outline-variant/30 luxury-shadow">
      <div className="flex items-center gap-3 mb-6">
        <span className="p-2.5 rounded-full bg-secondary-container/30 text-secondary">
          <Palette className="w-5 h-5" />
        </span>
        <div>
          <h4 className="font-display text-xl text-on-surface">Digital Stationery Studio</h4>
          <p className="text-xs text-on-surface-variant font-sans">Preview and test premium design guidelines live</p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="md:col-span-5 space-y-5">
          {/* Theme Preset selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-widest text-secondary uppercase">Luxury Theme Preset</label>
            <div className="grid grid-cols-2 gap-2">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setActiveThemeId(theme.id)}
                  className={`px-3 py-2.5 rounded-lg border text-left transition-all ${
                    activeThemeId === theme.id
                      ? 'bg-white border-secondary text-secondary shadow-sm'
                      : 'bg-white border-outline-variant/20 hover:bg-surface-container-high'
                  }`}
                >
                  <div className="text-xs font-bold font-sans">{theme.name}</div>
                  <div className="text-[10px] text-outline font-sans">{theme.styleName}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Invitation Wording controls */}
          <div className="space-y-3 pt-2">
            <div className="space-y-1">
              <label className="block text-xs font-bold tracking-widest text-secondary uppercase">Partner One Name</label>
              <input
                type="text"
                value={partner1}
                onChange={(e) => setPartner1(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-outline-variant/30 text-xs focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold tracking-widest text-secondary uppercase">Partner Two Name</label>
              <input
                type="text"
                value={partner2}
                onChange={(e) => setPartner2(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-outline-variant/30 text-xs focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold tracking-widest text-secondary uppercase">Wedding Date</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-outline-variant/30 text-xs focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold tracking-widest text-secondary uppercase">Ceremony Venue</label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-outline-variant/30 text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Typography Layout variables */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold tracking-widest text-secondary uppercase">Layout Typography Variables</label>
            <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-outline-variant/20">
              {/* Alignment */}
              <div className="flex gap-1.5">
                <button
                  onClick={() => setTextAlign('left')}
                  className={`p-1.5 rounded hover:bg-surface-container-low ${textAlign === 'left' ? 'text-secondary bg-secondary-container/20' : 'text-outline'}`}
                  title="Align Left"
                >
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTextAlign('center')}
                  className={`p-1.5 rounded hover:bg-surface-container-low ${textAlign === 'center' ? 'text-secondary bg-secondary-container/20' : 'text-outline'}`}
                  title="Align Center"
                >
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTextAlign('right')}
                  className={`p-1.5 rounded hover:bg-surface-container-low ${textAlign === 'right' ? 'text-secondary bg-secondary-container/20' : 'text-outline'}`}
                  title="Align Right"
                >
                  <AlignRight className="w-4 h-4" />
                </button>
              </div>

              {/* Spacing / Tracking */}
              <div className="flex gap-1">
                {[
                  { value: 'tracking-tight', label: 'Tight' },
                  { value: 'tracking-wide', label: 'Wide' },
                  { value: 'tracking-widest', label: 'Spacious' },
                ].map((track) => (
                  <button
                    key={track.value}
                    onClick={() => setLetterSpacing(track.value)}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
                      letterSpacing === track.value
                        ? 'bg-secondary text-white'
                        : 'text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    {track.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Invitation Frame */}
        <div className="md:col-span-7 flex flex-col items-center justify-center bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-inner">
          <span className="text-[10px] text-outline tracking-widest font-bold uppercase mb-4">LIVE WEB PREVIEW</span>

          <div
            className="w-full max-w-sm aspect-[4/5.6] rounded-2xl p-8 flex flex-col justify-between border relative transition-all duration-500 overflow-hidden"
            style={{
              backgroundColor: activeTheme.bgColor,
              color: activeTheme.textColor,
              borderColor: `${activeTheme.borderColor}40`,
              boxShadow: '0 12px 40px -15px rgba(0,0,0,0.1)'
            }}
          >
            {/* Outer Elegant Frame lines */}
            <div
              className="absolute inset-4 border pointer-events-none transition-all duration-500"
              style={{ borderColor: `${activeTheme.borderColor}20`, borderWidth: '1px' }}
            ></div>

            {/* Top Emblem */}
            <div className={`text-center pt-2 relative z-10 flex flex-col items-center justify-center`}>
              {activeTheme.id === 'midnight-celestial' ? (
                <div className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: activeTheme.accentColor }}>✨ CELESTIAL ✨</div>
              ) : activeTheme.id === 'botanical-linen' ? (
                <div className="text-xs italic" style={{ color: activeTheme.textColor }}>🌿 🌿 🌿</div>
              ) : activeTheme.id === 'classic-editorial' ? (
                <div className="font-display font-bold text-lg leading-none" style={{ color: activeTheme.accentColor }}>⚜</div>
              ) : (
                <div className="font-mono text-xs border px-2 py-0.5" style={{ borderColor: activeTheme.accentColor, color: activeTheme.accentColor }}>EInvite v2.4</div>
              )}
            </div>

            {/* Body wording */}
            <div
              className={`my-auto py-4 relative z-10 ${letterSpacing}`}
              style={{ textAlign }}
            >
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-75 font-sans font-medium mb-3">
                TOGETHER WITH THEIR FAMILIES
              </p>
              
              <h1 className={`font-medium tracking-tight leading-tight mb-2 ${
                activeTheme.fontFamilyClass === 'font-display' ? 'font-display text-2xl md:text-3xl' : 'font-sans text-xl md:text-2xl font-bold'
              }`}>
                {partner1}
              </h1>
              
              <p className="text-[11px] font-serif italic my-1 opacity-80">and</p>
              
              <h1 className={`font-medium tracking-tight leading-tight mb-4 ${
                activeTheme.fontFamilyClass === 'font-display' ? 'font-display text-2xl md:text-3xl' : 'font-sans text-xl md:text-2xl font-bold'
              }`}>
                {partner2}
              </h1>

              <p className="text-[9px] uppercase tracking-[0.2em] opacity-75 font-sans mb-5 leading-relaxed">
                REQUEST THE PLEASURE OF YOUR COMPANY<br />
                AT THE CELEBRATION OF THEIR MARRIAGE
              </p>
            </div>

            {/* Footer details */}
            <div className="relative z-10 text-center pb-2">
              <p className="text-xs font-semibold tracking-wider uppercase mb-1">
                {date}
              </p>
              <p className="text-[9px] uppercase tracking-widest opacity-80">
                {venue}
              </p>
              <div className="w-8 h-[1px] bg-outline-variant/30 mx-auto my-3"></div>
              <p className="text-[8px] uppercase tracking-[0.3em] opacity-60">
                Reception to follow
              </p>
            </div>
          </div>

          <button
            onClick={handleShareDraft}
            className="mt-6 px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded-full hover:bg-primary/95 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-green-400" /> Draft Code Copied!
              </>
            ) : (
              <>
                <Type className="w-4 h-4" /> Export Design Preset CSS
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
