import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { pages } from '@/config/pages';
export const dynamic = 'force-static';
export default function sitemap():MetadataRoute.Sitemap { return pages.map(page => ({url:new URL(page.href,site.url).href,changeFrequency:'monthly',priority:page.id === 'home' ? 1 : 0.8})); }
