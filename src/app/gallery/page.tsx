import Hotel from '@/components/hotel';
import { pageMetadata } from '@/config/pages';

export const dynamic = 'force-dynamic';
export const metadata = pageMetadata('gallery');

export default function Page() {
  return <Hotel page="gallery"/>;
}
