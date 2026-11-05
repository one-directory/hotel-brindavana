import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, Noto_Sans_Kannada } from 'next/font/google';
import { site } from '@/config/site';
import './globals.css';
import './responsive.css';
const serif = Cormorant_Garamond({subsets:['latin'],weight:['400','500','600','700'],style:['normal','italic'],variable:'--font-serif',display:'swap'});
const sans = Inter({subsets:['latin'],variable:'--font-sans',display:'swap'});
const kannada = Noto_Sans_Kannada({subsets:['kannada'],weight:['400'],variable:'--font-kannada',display:'swap'});
export const metadata: Metadata = {metadataBase:new URL(site.url),title:'Hotel Brindavana | Boarding & Lodging in Santhekatte, Udupi',description:'Explore Standard AC and Non-AC rooms, dining, Party Hall and Lawn at Hotel Brindavana, Santhekatte. Enquire directly on WhatsApp for availability and rates.',alternates:{canonical:'/'},openGraph:{title:'Hotel Brindavana | A stay in Santhekatte',description:'Rooms, dining and spaces to gather in Santhekatte, Udupi. Contact us directly for availability and rates.',type:'website',locale:'en_IN',url:'/',siteName:site.name,images:[{url:'/images/hero.png',width:1254,height:1254,alt:'Hotel Brindavana exterior in Santhekatte'}]},twitter:{card:'summary_large_image'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {return <html lang="en"><body id="top" className={`${serif.variable} ${sans.variable} ${kannada.variable}`}>{children}</body></html>;}
