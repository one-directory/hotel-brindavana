import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { rooms, site, photoCaptions, venuePhotos } from '@/config/site';

import { GalleryPhotos } from './interactions';


export function HomeOverview() {
  return <>
    <section id="home-rooms" className="section home-room-preview"><div className="container">
      <div className="section-heading"><div><h2>Rooms at Brindavana</h2></div><p>Choose between Standard AC and Non-AC rooms.</p></div>
      <div className="room-preview-grid">{rooms.map((room,index) => <article key={room.slug}><a className="preview-photo" href={`/rooms#${room.slug}`} aria-label={`See ${room.name}`}><Image src={room.images[0]} alt={photoCaptions[room.images[0]]} width={1200} height={900} loading="eager" unoptimized sizes="(max-width: 600px) 90vw, 48vw"/></a><div className="preview-room-title"><span>0{index+1}</span><h3>{room.name.replace(' Rooms', ' rooms')}</h3></div><p>{index === 0 ? 'A non-air-conditioned room for your time in Santhekatte.' : 'An air-conditioned room for your visit to Udupi.'}</p><div className="preview-room-links"><a href={`/rooms#${room.slug}`}>Room details & photographs</a></div></article>)}</div>
      <a className="button button-outline" href="/rooms">Compare both room categories</a>
    </div></section>
    <section id="home-facilities" className="section container home-hospitality">
      <div className="home-dining"><a className="venue-preview-photo" href="/facilities#restaurant-photos" aria-label="See restaurant photographs"><Image src={venuePhotos[0].images[0]} alt={photoCaptions[venuePhotos[0].images[0]]} fill sizes="(max-width: 600px) 90vw, 45vw"/></a><h2>Dining at the hotel</h2><p>We have a Family Restaurant and a Bar & Restaurant. Call for current timings or to arrange a meal for a group.</p><ul className="plain-facilities"><li>Family Restaurant</li><li>Bar & Restaurant</li></ul><a className="button button-outline" href="/facilities">Dining & everyday facilities</a></div>
      <div className="home-gathering"><a className="venue-preview-photo" href="/facilities#party-hall-photos" aria-label="See party hall photographs"><Image src={venuePhotos[1].images[0]} alt={photoCaptions[venuePhotos[1].images[0]]} fill sizes="(max-width: 600px) 90vw, 45vw"/></a><h3>Party hall, lawn and rooftop</h3><p>Contact us about availability for your function. Share the date and guest count so we can discuss the space you need.</p><p className="space-names">Party Hall · Lawn · Roof Top</p><a href="/contact" className="text-link">Ask about the hall</a></div>
    </section>
    <section className="stay-essentials" aria-labelledby="stay-essentials-title">
      <div className="container stay-essentials-layout">
        <div className="stay-essentials-intro"><h2 id="stay-essentials-title">During your stay</h2><p>Everyday services at Brindavana.</p></div>
        <dl className="stay-essentials-list">
          <div><dt>Wi-Fi</dt><dd>Available at the hotel. Ask reception for access details.</dd></div>
          <div><dt>Room service</dt><dd>Speak with the team about the menu and service timings.</dd></div>
          <div><dt>Laundry</dt><dd>Arrange laundry with the team, with charges and timings confirmed.</dd></div>
        </dl>
      </div>
    </section>
    <section id="home-gallery" className="section home-gallery-preview"><div className="container"><div className="section-heading"><div><h2>See the hotel before you visit</h2></div><a href="/gallery" className="text-link">See the full gallery</a></div><div className="home-photo-grid">{[{src:rooms[1].images[1],label:'An AC room'}, {src:rooms[0].images[1],label:'A Non-AC room'}].map(photo => <a href="/gallery" key={photo.src}><div><Image src={photo.src} alt={photoCaptions[photo.src] || 'Hotel Brindavana exterior in Santhekatte'} fill sizes="(max-width: 600px) 90vw, 35vw"/></div><span>{photo.label}</span></a>)}</div></div></section>
    <section id="home-visit" className="section container home-visit"><div><h2>Our address</h2><p className="address"><MapPin size={20}/>{site.address}</p><a className="button button-outline" href="/contact#location">Map & directions</a></div><div className="home-contact"><h3>Plan your visit</h3><p>Find our contact details and arrival information before your stay.</p><p className="content-note">Check-in {site.checkIn} · Check-out {site.checkOut}</p><a className="text-link" href="/contact">Contact details</a></div></section>
  </>;
}

const roomQuestions = [
  {question:'How do I check room rates?',answer:'Use the Contact page to send your dates, preferred room category and number of guests, or call the hotel.'},
  {question:'Can I ask for a room with a kitchen?',answer:'Kitchens are available in some rooms. Ask the hotel which rooms have this facility and whether one is available for your dates.'},
];

function Questions({items}: {items: {question: string; answer: string}[]}) {
  return <div className="questions">{items.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>;
}

export function RoomsGuide() {
  return <>
    <section id="room-comparison" className="section container detail-grid"><div><h2>Compare the rooms</h2><p>Both categories have the same check-in and check-out times.</p></div><div className="comparison-wrap"><table className="room-comparison"><caption>Standard room categories</caption><thead><tr><th scope="col">Your stay</th><th scope="col">Standard Non-AC</th><th scope="col">Standard AC</th></tr></thead><tbody><tr><th scope="row">Air conditioning</th><td>Not included</td><td>Included</td></tr><tr><th scope="row">Check-in</th><td>{site.checkIn}</td><td>{site.checkIn}</td></tr><tr><th scope="row">Check-out</th><td>{site.checkOut}</td><td>{site.checkOut}</td></tr></tbody></table><p className="content-note">Wi-Fi and room service are available at the hotel.</p></div></section>
    <section className="section detail-tint"><div className="container detail-grid"><div><h2>Before you enquire</h2><a className="text-link" href="/contact#location">Plan your arrival</a></div><Questions items={roomQuestions}/></div></section>
  </>;
}

export function FacilitiesDetails() {
  return <section id="facility-details" className="section detail-tint"><div className="container">
    <div className="detail-grid"><div><h2>Dining at Brindavana</h2><p>Family Restaurant and Bar & Restaurant are both at the hotel.</p><a href="/contact" className="text-link">Ask about dining</a></div><dl className="facility-descriptions"><div><dt>Family Restaurant</dt><dd>For a group meal, share the date, time and number of guests.</dd></div><div><dt>Bar & Restaurant</dt><dd>Call for current bar and restaurant timings.</dd></div></dl></div>
    <VenueCollections/>
    <div className="service-detail"><div><h2>Services for hotel guests</h2></div><dl className="facility-descriptions"><div><dt>Wi-Fi</dt><dd>Wi-Fi is available at the hotel. Ask us for access details during your stay.</dd></div><div><dt>Laundry service</dt><dd>Speak with the hotel about laundry requirements, charges and turnaround before arranging the service.</dd></div><div><dt>Room service</dt><dd>Ask about room-service options and timings when you enquire or arrive.</dd></div><div><dt>Kitchens in some rooms</dt><dd>If a kitchen matters for your stay, mention it when enquiring. This facility is available only in some rooms.</dd></div></dl></div>
    <div className="venue-details"><dl className="facility-descriptions"><div><dt>Party Hall</dt><dd>Indoor seating and tables for functions.</dd></div><div><dt>Lawn</dt><dd>An outdoor space for gatherings.</dd></div><div><dt>Roof Top</dt><dd>Ask about rooftop access and availability for your date.</dd></div></dl><p className="content-note">Timings, charges, capacity and arrangements are confirmed directly by the hotel.</p></div>
  </div></section>;
}

function VenueCollections() {
  return <div className="venue-photo-collections">{venuePhotos.map(venue => <section key={venue.id} id={venue.id + '-photos'} aria-labelledby={venue.id + '-heading'} className="photo-collection"><div className="collection-heading"><div><h2 id={venue.id + '-heading'}>{venue.name}</h2><p>{venue.description}</p></div></div><GalleryPhotos gallery={venue.images.map(src => ({src, label: photoCaptions[src]}))}/></section>)}</div>;
}

export function GalleryCollection() {
  return <div className="photo-collections">
    <section aria-labelledby="exterior-photos" className="photo-collection exterior-collection"><div className="collection-heading"><h2 id="exterior-photos">The hotel exterior</h2><p>The entrance at Santhekatte.</p></div><GalleryPhotos gallery={[{src:'/images/hero.png',label:'Hotel exterior'}]}/></section>
    {rooms.map((room,index) => <section key={room.slug} aria-labelledby={`${room.slug}-photos`} className="photo-collection"><div className="collection-heading"><div><h2 id={`${room.slug}-photos`}>{room.name.replace(' Rooms', ' rooms')}</h2><p>Selected room photographs from this category.</p></div><a href={`/rooms#${room.slug}`} className="text-link">Room details</a></div><GalleryPhotos gallery={room.images.map((src,photoIndex)=>({src,label:photoIndex === 0 ? (index===0?'Standard Non-AC room':'Standard AC room') : photoCaptions[src]}))}/></section>)}
    <VenueCollections/>
    <p className="content-note">These photographs show rooms and facilities at the hotel. The specific room available for your dates may vary; please confirm details when enquiring.</p>
  </div>;
}

export function LocationGuide() {
  return <section id="arrival-guide" className="section container detail-grid"><div><h2>Arrival information</h2><p>Head to 3rd Cross, Gopalpura in Santhekatte, Kallianpur. The address is on Udupi – Perdoor – Agumbe Road. Open the map for a route from your starting point.</p></div><div className="arrival-details"><dl><div><dt>Check-in</dt><dd>{site.checkIn}</dd></div><div><dt>Check-out</dt><dd>{site.checkOut}</dd></div><div><dt>Address code</dt><dd>9PJQ+R9M</dd></div></dl><h3>Need a hand finding us?</h3><p>Call the hotel if you need help with the final directions. If your arrival time is outside the usual check-in time, speak with us before you travel.</p></div></section>;
}

