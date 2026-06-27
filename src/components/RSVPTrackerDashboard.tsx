import React, { useState } from 'react';
import { Guest } from '../types';
import { Users, Check, X, PlusCircle, Trash2, Search, Filter, Download, ArrowUpRight, Sparkles } from 'lucide-react';

const INITIAL_GUESTS: Guest[] = [
  { id: '1', name: 'Eleanor Sterling', email: 'eleanor@sterling.com', status: 'attending', plusOne: true, dietary: 'None' },
  { id: '2', name: 'Alexander Hamilton', email: 'alex@hamilton.gov', status: 'attending', plusOne: false, dietary: 'Gluten-Free' },
  { id: '3', name: 'Elizabeth Bennet', email: 'lizzy@longbourn.org', status: 'pending', plusOne: true, dietary: 'Vegetarian' },
  { id: '4', name: 'Fitzwilliam Darcy', email: 'darcy@pemberley.co.uk', status: 'attending', plusOne: true, dietary: 'None' },
  { id: '5', name: 'Jane Austen', email: 'jane@austen-books.com', status: 'declined', plusOne: false, dietary: 'None' },
  { id: '6', name: 'Charles Bingley', email: 'charles@netherfield.org', status: 'pending', plusOne: false, dietary: 'Vegan' },
];

export default function RSVPTrackerDashboard() {
  const [guests, setGuests] = useState<Guest[]>(INITIAL_GUESTS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'attending' | 'declined' | 'pending'>('all');
  
  // Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newStatus, setNewStatus] = useState<'attending' | 'declined' | 'pending'>('pending');
  const [newPlusOne, setNewPlusOne] = useState(false);
  const [newDietary, setNewDietary] = useState('None');
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Calculations
  const totalGuestsCount = guests.length;
  const attendingCount = guests.filter(g => g.status === 'attending').length;
  const plusOnesCount = guests.filter(g => g.status === 'attending' && g.plusOne).length;
  const totalAttendees = attendingCount + plusOnesCount;
  const declinedCount = guests.filter(g => g.status === 'declined').length;
  const pendingCount = guests.filter(g => g.status === 'pending').length;

  const attendingPercent = totalGuestsCount ? Math.round((attendingCount / totalGuestsCount) * 100) : 0;
  const declinedPercent = totalGuestsCount ? Math.round((declinedCount / totalGuestsCount) * 100) : 0;
  const pendingPercent = totalGuestsCount ? Math.round((pendingCount / totalGuestsCount) * 100) : 0;

  // Actions
  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newGuest: Guest = {
      id: Date.now().toString(),
      name: newName.trim(),
      email: newEmail.trim() || `${newName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      status: newStatus,
      plusOne: newPlusOne,
      dietary: newDietary || 'None'
    };

    setGuests([newGuest, ...guests]);
    setNewName('');
    setNewEmail('');
    setNewStatus('pending');
    setNewPlusOne(false);
    setNewDietary('None');
    setShowAddForm(false);
  };

  const handleUpdateStatus = (id: string, status: 'attending' | 'declined' | 'pending') => {
    setGuests(guests.map(g => g.id === id ? { ...g, status } : g));
  };

  const handleDeleteGuest = (id: string) => {
    setGuests(guests.filter(g => g.id !== id));
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 2000);
  };

  // Filter & Search
  const filteredGuests = guests.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase()) || 
                          g.email.toLowerCase().includes(search.toLowerCase()) ||
                          g.dietary.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || g.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div id="rsvp-tracker-dashboard" className="bg-surface p-6 md:p-8 rounded-2xl border border-outline-variant/30 luxury-shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-full bg-secondary-container/30 text-secondary">
            <Users className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-display text-xl text-on-surface">Guest & RSVP Dashboard</h4>
            <p className="text-xs text-on-surface-variant font-sans">Automated live analytics & list segmentation portal</p>
          </div>
        </div>
        
        <button
          onClick={handleExport}
          className="text-xs font-semibold px-4 py-2.5 bg-primary text-white rounded-full hover:bg-primary/95 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
        >
          {exporting ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" /> Export Complete
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" /> Export guest list (CSV)
            </>
          )}
        </button>
      </div>

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Attending Card */}
        <div className="bg-white p-5 rounded-xl border border-outline-variant/10 luxury-shadow flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded-full">Attending</span>
            <span className="text-[10px] text-outline font-bold">{attendingPercent}%</span>
          </div>
          <div className="mt-4">
            <span className="font-display text-3xl font-medium block text-on-surface">{attendingCount}</span>
            <span className="text-[11px] text-on-surface-variant">+{plusOnesCount} plus-ones ({totalAttendees} total plate seats)</span>
          </div>
        </div>

        {/* Pending Card */}
        <div className="bg-white p-5 rounded-xl border border-outline-variant/10 luxury-shadow flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">Pending</span>
            <span className="text-[10px] text-outline font-bold">{pendingPercent}%</span>
          </div>
          <div className="mt-4">
            <span className="font-display text-3xl font-medium block text-on-surface">{pendingCount}</span>
            <span className="text-[11px] text-on-surface-variant">Awaiting digital response</span>
          </div>
        </div>

        {/* Declined Card */}
        <div className="bg-white p-5 rounded-xl border border-outline-variant/10 luxury-shadow flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full">Declined</span>
            <span className="text-[10px] text-outline font-bold">{declinedPercent}%</span>
          </div>
          <div className="mt-4">
            <span className="font-display text-3xl font-medium block text-on-surface">{declinedCount}</span>
            <span className="text-[11px] text-on-surface-variant">Sending love from afar</span>
          </div>
        </div>

        {/* Total Registered */}
        <div className="bg-primary text-white p-5 rounded-xl border border-outline-variant/15 luxury-shadow flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-fixed bg-white/10 px-2.5 py-1 rounded-full">Total Guests</span>
            <ArrowUpRight className="w-4 h-4 opacity-70" />
          </div>
          <div className="mt-4">
            <span className="font-display text-3xl font-medium block text-white">{totalGuestsCount}</span>
            <span className="text-[11px] text-primary-fixed/80">Segmented in primary list</span>
          </div>
        </div>
      </div>

      {/* Search and Filters bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-6">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, dietary..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-outline-variant/40 text-xs focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto justify-end">
          {[
            { id: 'all', label: 'All Guests' },
            { id: 'attending', label: 'Attending' },
            { id: 'pending', label: 'Pending' },
            { id: 'declined', label: 'Declined' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === item.id
                  ? 'bg-primary-container text-white shadow-sm'
                  : 'bg-white border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3.5 py-2 rounded-lg text-xs font-bold bg-secondary text-white hover:bg-secondary/95 transition-all flex items-center gap-1.5 shadow-sm ml-2 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Add Guest
          </button>
        </div>
      </div>

      {/* Add Guest Modal/Form Drawer */}
      {showAddForm && (
        <form onSubmit={handleAddGuest} className="bg-white p-5 rounded-xl border border-secondary-container mb-6 animate-fadeIn space-y-4 luxury-shadow">
          <div className="flex justify-between items-center pb-2 border-b border-outline-variant/10">
            <h5 className="font-display font-medium text-on-surface flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-secondary" /> Add New Guest Segment
            </h5>
            <button type="button" onClick={() => setShowAddForm(false)} className="text-outline hover:text-on-surface">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Full Name</label>
              <input
                type="text"
                required
                placeholder="Elizabeth Bennet"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/40 text-xs focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                placeholder="lizzy@longbourn.org"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/40 text-xs focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Dietary Preference</label>
              <input
                type="text"
                placeholder="Vegetarian, Nut Allergy, Gluten-Free"
                value={newDietary}
                onChange={(e) => setNewDietary(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/40 text-xs focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">RSVP Status</label>
              <select
                value={newStatus}
                onChange={(e: any) => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/40 text-xs focus:outline-none focus:ring-1 focus:ring-secondary/50 focus:border-secondary"
              >
                <option value="pending">Pending Response</option>
                <option value="attending">Attending</option>
                <option value="declined">Declined</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="plusOne"
                checked={newPlusOne}
                onChange={(e) => setNewPlusOne(e.target.checked)}
                className="w-4 h-4 text-secondary rounded border-outline-variant/40 focus:ring-secondary"
              />
              <label htmlFor="plusOne" className="text-xs text-on-surface-variant font-medium cursor-pointer">
                Allocated Plus-One
              </label>
            </div>

            <div className="flex items-end justify-end">
              <button
                type="submit"
                className="w-full md:w-auto px-5 py-2.5 bg-secondary text-white font-bold text-xs rounded-lg hover:bg-secondary/95 transition-all cursor-pointer"
              >
                Add Guest to List
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Guest Table Container */}
      <div className="overflow-x-auto rounded-xl border border-outline-variant/20 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant/20">
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Guest Name / Email</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Dietary Constraints</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Plus One</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">RSVP Status</th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {filteredGuests.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-xs text-on-surface-variant">
                  No guests found matching filters.
                </td>
              </tr>
            ) : (
              filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-surface-container-low/30 transition-all">
                  <td className="p-4">
                    <div className="font-semibold text-xs text-on-surface">{guest.name}</div>
                    <div className="text-[10px] text-outline">{guest.email}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                      guest.dietary === 'None' ? 'bg-surface-container-low text-on-surface-variant' : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                      {guest.dietary}
                    </span>
                  </td>
                  <td className="p-4 text-xs font-medium text-on-surface-variant">
                    {guest.plusOne ? 'Yes' : 'No'}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      guest.status === 'attending' 
                        ? 'bg-green-50 text-green-700 border border-green-100'
                        : guest.status === 'declined'
                        ? 'bg-rose-50 text-rose-700 border border-rose-100'
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {guest.status === 'attending' && <Check className="w-2.5 h-2.5" />}
                      {guest.status === 'declined' && <X className="w-2.5 h-2.5" />}
                      {guest.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex gap-1 justify-end">
                      <button
                        onClick={() => handleUpdateStatus(guest.id, 'attending')}
                        title="Mark Attending"
                        className={`p-1.5 rounded hover:bg-green-50 text-green-600 transition-all ${guest.status === 'attending' ? 'opacity-30' : ''}`}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(guest.id, 'declined')}
                        title="Mark Declined"
                        className={`p-1.5 rounded hover:bg-rose-50 text-rose-600 transition-all ${guest.status === 'declined' ? 'opacity-30' : ''}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGuest(guest.id)}
                        title="Delete Guest"
                        className="p-1.5 rounded hover:bg-surface-container-high text-outline hover:text-rose-600 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
