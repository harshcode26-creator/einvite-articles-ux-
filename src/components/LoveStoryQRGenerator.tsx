import React, { useState } from 'react';
import { Heart, QrCode, Download, Check, Sparkles } from 'lucide-react';

export default function LoveStoryQRGenerator() {
  const [partner1, setPartner1] = useState('Eleanor');
  const [partner2, setPartner2] = useState('Marcus');
  const [weddingDate, setWeddingDate] = useState('2026-10-18');
  const [qrColor, setQrColor] = useState('#161717'); // charcoal
  const [frameStyle, setFrameStyle] = useState('minimal-gold'); // minimal-gold | floral-border | midnight-modern
  const [centerIcon, setCenterIcon] = useState('heart'); // heart | monogram | none
  const [copied, setCopied] = useState(false);

  const colors = [
    { name: 'Classic Slate', hex: '#161717' },
    { name: 'Warm Gold', hex: '#735c00' },
    { name: 'Rosewood', hex: '#5c1a1a' },
    { name: 'Forest Moss', hex: '#1c3022' },
  ];

  const handleDownload = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="love-story-qr-generator" className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-outline-variant/30 luxury-shadow">
      <div className="flex items-center gap-3 mb-6">
        <span className="p-2 rounded-full bg-secondary-container/30 text-secondary">
          <Sparkles className="w-5 h-5" />
        </span>
        <div>
          <h4 className="font-display text-xl text-on-surface">Interactive Love Story QR Designer</h4>
          <p className="text-xs text-on-surface-variant font-sans">Craft a beautiful, scannable stationery bridge for your physical invites</p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="md:col-span-5 space-y-5">
          {/* Couple Names */}
          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-widest text-secondary uppercase">Partner Names</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={partner1}
                onChange={(e) => setPartner1(e.target.value)}
                placeholder="Partner 1"
                className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/40 text-sm focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary"
              />
              <input
                type="text"
                value={partner2}
                onChange={(e) => setPartner2(e.target.value)}
                placeholder="Partner 2"
                className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/40 text-sm focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary"
              />
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-widest text-secondary uppercase">Wedding Date</label>
            <input
              type="date"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/40 text-sm focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary"
            />
          </div>

          {/* Color Select */}
          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-widest text-secondary uppercase">QR Ink Color</label>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => setQrColor(color.hex)}
                  title={color.name}
                  className={`w-8 h-8 rounded-full border transition-all relative ${
                    qrColor === color.hex ? 'ring-2 ring-offset-2 ring-secondary' : 'border-outline-variant/40'
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {qrColor === color.hex && (
                    <span className="absolute inset-0 flex items-center justify-center text-white text-[10px]">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Frame Style */}
          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-widest text-secondary uppercase">Invitation Frame Style</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'minimal-gold', label: 'Minimal Gold' },
                { id: 'floral-border', label: 'Linen Floral' },
                { id: 'midnight-modern', label: 'Dark Onyx' },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setFrameStyle(style.id)}
                  className={`px-2 py-2 rounded-lg border text-xs font-medium transition-all ${
                    frameStyle === style.id
                      ? 'bg-secondary-container/25 text-on-secondary-container border-secondary/50'
                      : 'bg-surface border-outline-variant/30 hover:bg-surface-container-high'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Center Emblem */}
          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-widest text-secondary uppercase">Center Emblem</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'heart', label: 'Embossed Heart' },
                { id: 'monogram', label: 'Monogram' },
                { id: 'none', label: 'No Center' },
              ].map((icon) => (
                <button
                  key={icon.id}
                  onClick={() => setCenterIcon(icon.id)}
                  className={`px-2 py-2 rounded-lg border text-xs font-medium transition-all ${
                    centerIcon === icon.id
                      ? 'bg-secondary-container/25 text-on-secondary-container border-secondary/50'
                      : 'bg-surface border-outline-variant/30 hover:bg-surface-container-high'
                  }`}
                >
                  {icon.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Card */}
        <div className="md:col-span-7 flex flex-col items-center justify-center bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-inner">
          <span className="text-[10px] text-outline tracking-widest font-bold uppercase mb-4">LIVE PREVIEW</span>
          
          <div
            className={`w-64 aspect-[3/4.2] rounded-xl flex flex-col justify-between p-6 transition-all duration-300 relative ${
              frameStyle === 'midnight-modern'
                ? 'bg-primary text-white border-2 border-primary-fixed-dim/30'
                : frameStyle === 'floral-border'
                ? 'bg-[#FDFBF7] border-2 border-[#EADFC9] text-on-surface'
                : 'bg-white border-2 border-secondary-container/70 text-on-surface'
            }`}
            style={{
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)'
            }}
          >
            {/* Top decorative element */}
            <div className="text-center">
              {frameStyle === 'floral-border' && (
                <div className="text-[#A2906C] text-sm italic mb-1 font-serif">✿ ❀ ✿</div>
              )}
              {frameStyle === 'minimal-gold' && (
                <div className="w-10 h-[1px] bg-secondary-container mx-auto mb-2"></div>
              )}
              <h5 className="font-display text-lg tracking-wider">
                {partner1} & {partner2}
              </h5>
              <p className="text-[10px] opacity-75 font-sans tracking-widest uppercase mt-0.5">
                {new Date(weddingDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>

            {/* QR Code Container */}
            <div className="my-auto flex flex-col items-center justify-center relative">
              <div className="p-3 bg-white rounded-xl shadow-sm border border-outline-variant/10 relative">
                {/* Simulated QR Code via elegant SVG */}
                <svg
                  width="110"
                  height="110"
                  viewBox="0 0 100 100"
                  style={{ color: qrColor }}
                  className="transition-colors duration-300"
                >
                  {/* Position detection markers */}
                  {/* Top Left */}
                  <rect x="0" y="0" width="30" height="30" fill="currentColor" rx="4" />
                  <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
                  <rect x="10" y="10" width="10" height="10" fill="currentColor" rx="1" />
                  
                  {/* Top Right */}
                  <rect x="70" y="0" width="30" height="30" fill="currentColor" rx="4" />
                  <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
                  <rect x="80" y="10" width="10" height="10" fill="currentColor" rx="1" />
                  
                  {/* Bottom Left */}
                  <rect x="0" y="70" width="30" height="30" fill="currentColor" rx="4" />
                  <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
                  <rect x="10" y="80" width="10" height="10" fill="currentColor" rx="1" />

                  {/* Random pixels simulating a QR pattern */}
                  <rect x="35" y="5" width="8" height="8" fill="currentColor" rx="1" />
                  <rect x="48" y="12" width="15" height="8" fill="currentColor" rx="1" />
                  <rect x="35" y="24" width="8" height="15" fill="currentColor" rx="1" />
                  <rect x="55" y="24" width="10" height="8" fill="currentColor" rx="1" />

                  <rect x="75" y="35" width="12" height="12" fill="currentColor" rx="1" />
                  <rect x="85" y="50" width="10" height="15" fill="currentColor" rx="1" />
                  <rect x="72" y="68" width="8" height="12" fill="currentColor" rx="1" />

                  <rect x="10" y="35" width="15" height="8" fill="currentColor" rx="1" />
                  <rect x="5" y="48" width="8" height="15" fill="currentColor" rx="1" />
                  <rect x="22" y="55" width="15" height="8" fill="currentColor" rx="1" />

                  <rect x="35" y="70" width="15" height="10" fill="currentColor" rx="1" />
                  <rect x="55" y="72" width="12" height="15" fill="currentColor" rx="1" />
                  <rect x="40" y="88" width="20" height="8" fill="currentColor" rx="1" />
                  <rect x="72" y="85" width="15" height="10" fill="currentColor" rx="1" />

                  {/* QR Core overlay for brand center */}
                  {centerIcon !== 'none' && (
                    <rect x="36" y="36" width="28" height="28" fill="white" rx="4" />
                  )}
                </svg>

                {/* Actual overlay icon inside white center */}
                {centerIcon === 'heart' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Heart className="w-5 h-5 fill-red-500 text-red-500 animate-pulse" />
                  </div>
                )}
                {centerIcon === 'monogram' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="font-display text-xs font-bold" style={{ color: qrColor }}>
                      {partner1[0]}{partner2[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Sub-label */}
              <span className="text-[9px] uppercase tracking-widest font-sans mt-3 font-semibold opacity-80 flex items-center gap-1">
                <QrCode className="w-3 h-3 text-secondary" /> Scan to view our love story
              </span>
            </div>

            {/* Bottom Brand */}
            <div className="text-center pt-2 border-t border-dashed border-outline-variant/30">
              <span className="font-display text-xs tracking-widest opacity-80">EInvite</span>
              <p className="text-[7px] tracking-widest uppercase opacity-60">Digital Excellence</p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="mt-6 px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded-full hover:bg-primary/95 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" /> Vector Asset Exported!
              </>
            ) : (
              <>
                <Download className="w-4 h-4" /> Export High-Res SVG Asset
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
