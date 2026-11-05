/* eslint-disable @next/next/no-html-link-for-pages -- Full document navigation preserves the requested non-SPA behavior. */
import { ContactEnquiry } from './contact-enquiry';
import { HeroPhoto } from './hero-photo';
import { Phone, MapPin } from 'lucide-react';
import { WhatsAppLogo } from './whatsapp-logo';
import { PhotoProvider, MobileNavigation, RoomPhotos } from './interactions';
import { rooms, site, whatsappLink } from '@/config/site';

import { HomeOverview, RoomsGuide, FacilitiesDetails, GalleryCollection, LocationGuide } from './page-content';
import { pages, type PageId } from '@/config/pages';
const facilityGroups = [
  { title: 'Dining', number: '01', items: [{name:'Bar & Restaurant'}, {name:'Family Restaurant'}] },
  { title: 'Function spaces', number: '02', items: [{name:'Party Hall'}, {name:'Lawn'}, {name:'Roof Top'}] },
  { title: 'During your stay', number: '03', items: [{name:'Wi-Fi'}, {name:'Laundry service'}, {name:'Room service'}] },
];
function WhatsApp({children = 'Enquire on WhatsApp', message, className = ''}: {children?: React.ReactNode; message?: string; className?: string}) {
  return <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className={`button ${className}`}><WhatsAppLogo size={20} dark={className.includes('gold')}/><span>{children}</span></a>;
}
function Brand() {
  return <a href="/" className="brand" aria-label="Hotel Brindavana home"><span>Hotel Brindavana<small lang="kn">{site.kannada}</small></span></a>;
}
export default function Hotel({page = 'home'}: {page?: PageId}) {
  const activePath = pages.find(item => item.id === page)!.href;
  return <PhotoProvider>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><div className="container header-inner"><Brand/><nav aria-label="Main navigation" className="desktop-nav">{pages.map(item => <a key={item.id} href={item.href} aria-current={item.href === activePath ? 'page' : undefined}>{item.name}</a>)}</nav><a className="header-phone" href={"tel:"+site.telephone}>{site.phone}</a><MobileNavigation items={pages} activePath={activePath}/></div></header>
    <main id="main" className={page === 'home' ? 'home-page' : 'inner-page'}>
      {page === 'home' && <><section id="home" className="hero container">
        
        <div className="hero-layout">
          <div className="hero-copy"><h1>A stay in<br/><em>Santhekatte.</em></h1><p className="hero-intro">AC and Non-AC rooms in Santhekatte, Udupi.</p><p className="hero-description">We have a family restaurant, a bar and spaces for functions. Call us for room availability and rates.</p><div className="button-row"><WhatsApp/><a className="button button-outline" href={`tel:${site.telephone}`}><Phone size={16}/>Call Now</a></div><a href="/rooms" className="explore-link">Take a look at the rooms</a></div>
          <HeroPhoto/>
        </div>
        <p className="arrival-note">Check-in {site.checkIn}<span>·</span>Check-out {site.checkOut}</p>
      </section><section id="about" className="section container introduction"><div className="introduction-copy"><h2>About the hotel</h2><div><p>You will find us at 3rd Cross, Gopalpura, Santhekatte. We offer Standard AC and Standard Non-AC rooms.</p></div></div></section><HomeOverview/></>}
      {page === 'rooms' && <><section id="rooms" className="rooms-section section"><div className="container"><div className="section-heading"><div><h1 className="page-heading">AC and Non-AC rooms</h1></div><p>Explore Standard Non-AC and Standard AC rooms. Rates on request.</p></div><div className="room-list">{rooms.map((room,index) => <RoomCard key={room.slug} room={room} index={index}/>)}</div><p className="content-note">Photos show rooms at the hotel; the room available for your dates may vary. Please confirm room-specific amenities with us. Kitchens are available in some rooms.</p></div></section><RoomsGuide/></>}
      {page === 'facilities' && <><section id="facilities" className="section container facilities-section"><div className="facilities-heading"><h1 className="page-heading">Facilities at Brindavana</h1><p>Restaurants, function spaces and services available at the hotel.</p></div><div className="facility-directory">{facilityGroups.map(group => <div className="facility-group" key={group.title}><div className="facility-title"><span>{group.number}</span><h3>{group.title}</h3></div><ul>{group.items.map(({name}) => <li key={name}>{name}</li>)}</ul></div>)}</div></section><FacilitiesDetails/><section id="event-spaces" className="event-section"><div className="container event-layout"><div className="event-copy"><h2>Book a space for your function</h2><p>Send us your date, occasion and guest count. We will confirm which space is available and discuss the arrangements.</p><a href="/contact" className="text-link">Ask about the hall</a></div><div className="event-spaces"><p>Available spaces</p><ul><li>Party Hall</li><li>Lawn</li><li>Roof Top</li></ul></div></div></section></>}
      {page === 'gallery' && <section id="gallery" className="section container gallery-section"><div className="section-heading"><div><h1 className="page-heading">Photographs of the hotel</h1></div><p>Our entrance, rooms, restaurant and party hall, in photographs. Open a picture for a closer look.</p></div><GalleryCollection/></section>}
      {page === 'contact' && <><section id="contact" className="section container contact-section"><div><h1 className="page-heading">Contact the hotel</h1></div><div className="contact-details"><div className="button-row"><a className="contact-number button button-outline" href={`tel:${site.telephone}`}>{site.phone}</a><a className="contact-number button button-outline" href={`tel:${site.additionalTelephone}`}>{site.additionalPhone}</a></div><p>Tell us your dates, room preference and number of guests. We’ll confirm availability and rates directly.</p><ContactEnquiry/><div className="contact-address"><a href="#location" className="text-link">Address & directions</a></div></div></section><section id="location" className="location-section section"><div className="container location-grid"><div className="location-copy"><h2 className="page-heading">Find us in Santhekatte</h2><p className="address"><MapPin size={20}/>{site.address}</p><a className="button" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapQuery)}`}>Get Directions</a></div><div className="map-panel"><iframe title="Google Map: Hotel Brindavana Santhekatte Kallianpur" src={"https://maps.google.com/maps?q="+encodeURIComponent(site.mapQuery)+"&z=17&output=embed"} loading="eager" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/><a className="button map-open-button" href={"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(site.mapQuery)} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></div></div></section><LocationGuide/></>}
    </main>
    <footer className="footer"><div className="container"><div className="footer-top"><Brand/><p>Boarding & Lodging<br/>Santhekatte, Udupi · Karnataka</p><a href="#top" className="back-top">Back to top</a></div><nav className="footer-nav" aria-label="Footer navigation">{pages.map(item => <a key={item.id} href={item.href} aria-current={item.href === activePath ? 'page' : undefined}>{item.name}</a>)}</nav><div className="footer-bottom"><p>© {new Date().getFullYear()} Hotel Brindavana</p><p>Check-in {site.checkIn}<span> / </span>Check-out {site.checkOut}</p><a href={`tel:${site.telephone}`}>{site.phone}</a><a href={`tel:${site.additionalTelephone}`}>{site.additionalPhone}</a></div></div></footer>
    <a className="floating-whatsapp" href={whatsappLink()} aria-label="Message the hotel on WhatsApp" target="_blank" rel="noopener noreferrer"><WhatsAppLogo size={27}/></a>
  </PhotoProvider>;
}
function RoomCard({room,index}: {room:typeof rooms[number]; index:number}) {
  return <article id={room.slug} className="room-card"><RoomPhotos room={{name:room.name,images:room.images}}/><div className="room-body"><div className="room-kicker"><span>Room {index+1}</span><span>{index===0?'Non-AC':'Air-conditioned'}</span></div><h3>{room.name.replace(' Rooms', ' rooms')}</h3><p>{room.description}</p><ul className="room-amenities">{room.amenities.map(amenity => <li key={amenity}>{amenity}</li>)}</ul><div className="room-bottom"><a href="/contact">Ask about rates</a></div></div></article>;
}
