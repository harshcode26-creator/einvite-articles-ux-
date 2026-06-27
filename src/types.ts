export interface Article {
  id: string;
  title: string;
  category: 'Getting Started' | 'Wedding Planning' | 'Features' | 'RSVP' | 'Guest Management' | 'Templates' | 'Tips' | 'Product Updates';
  excerpt: string;
  body: string[]; // detailed paragraphs
  readTime: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
  tips?: string[];
  quote?: string;
  // Custom interactive type to open inside the reading view
  interactiveType?: 'qr' | 'rsvp' | 'themes' | 'none';
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  status: 'attending' | 'declined' | 'pending';
  plusOne: boolean;
  dietary: string;
}
