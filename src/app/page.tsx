import Hotel from '@/components/hotel';
import { pageMetadata } from '@/config/pages';
export const metadata = pageMetadata('home');
import { site } from '@/config/site';
// Render the complete document on the server for every request.
export const dynamic = 'force-dynamic';
export default function Page() {
  const schema = {'@context':'https://schema.org','@type':'Hotel',name:site.name,telephone:site.telephone,address:{'@type':'PostalAddress',streetAddress:'9PJQ+R9M, 3rd Cross, Gopalpura, Santhekatte, Udupi - Perdoor - Agumbe Rd',addressLocality:'Kallianpur',addressRegion:'Karnataka',postalCode:'576105',addressCountry:'IN'},checkinTime:'14:00',checkoutTime:'12:00',url:site.url};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/><Hotel/></>;
}
