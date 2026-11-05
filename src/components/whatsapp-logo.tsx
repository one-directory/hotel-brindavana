import Image from 'next/image';

/** Unmodified digital glyphs from Meta's official WhatsApp brand resource pack. */
export function WhatsAppLogo({size = 20, dark = false}: {size?: number; dark?: boolean}) {
  return <Image className="whatsapp-logo" src={`/brand/whatsapp-${dark ? 'black' : 'white'}.svg`} alt="" aria-hidden="true" width={size} height={size} unoptimized/>;
}
