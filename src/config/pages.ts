import type { Metadata } from 'next';
import { site } from './site';

export const pages = [
  { id: 'home', name: 'Home', href: '/', title: 'Hotel Brindavana | Boarding & Lodging in Santhekatte, Udupi', description: 'Stay at Hotel Brindavana in Santhekatte, Udupi. Rooms, dining and gathering spaces. Enquire directly by phone or WhatsApp.' },
  { id: 'rooms', name: 'Rooms', href: '/rooms', title: 'AC & Non-AC Rooms | Hotel Brindavana, Santhekatte', description: 'See photos of Standard AC and Standard Non-AC Rooms at Hotel Brindavana. Contact the hotel for availability and rates for your dates.' },
  { id: 'facilities', name: 'Facilities', href: '/facilities', title: 'Dining & Facilities | Hotel Brindavana, Santhekatte', description: 'Bar & Restaurant, Family Restaurant, Party Hall, Lawn, Roof Top and everyday facilities at Hotel Brindavana. Enquire about your visit or gathering.' },
  { id: 'gallery', name: 'Gallery', href: '/gallery', title: 'Hotel, Room & Dining Photos | Hotel Brindavana, Santhekatte', description: 'View photographs of the Hotel Brindavana exterior, AC and Non-AC rooms, restaurant and party hall in Santhekatte, Udupi.' },
  { id: 'contact', name: 'Contact', href: '/contact', title: 'Contact & Directions | Hotel Brindavana, Santhekatte', description: 'Contact Hotel Brindavana for rooms, dining and gatherings. Find our Santhekatte address, map, directions and arrival details.' },
] as const;

export type PageId = typeof pages[number]['id'];
export function pageMetadata(id: PageId): Metadata {
  const page = pages.find(item => item.id === id)!;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.href },
    openGraph: {
      title: page.title, description: page.description, url: page.href,
      type: 'website', locale: 'en_IN', siteName: site.name,
      images: [{url:'/images/hero.png',width:1254,height:1254,alt:'Hotel Brindavana exterior in Santhekatte'}],
    },
    twitter: {card:'summary_large_image',title:page.title,description:page.description},
  };
}
