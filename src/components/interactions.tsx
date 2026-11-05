'use client';
import Image from 'next/image';
import { createContext, useContext, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Menu } from 'lucide-react';
import { photoCaptions } from '@/config/site';

type Viewer = { images: string[]; index: number; label: string };
const ViewerContext = createContext<(viewer: Viewer) => void>(() => {});
export function PhotoProvider({children}: {children: React.ReactNode}) {
  const [viewer,setViewer] = useState<Viewer | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const isOpen = viewer !== null;
  useEffect(() => {
    if (!isOpen) return;
    const element = dialog.current;
    const trigger = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({preventScroll:true});
    };
  }, [isOpen]);
  const move = (direction: number) => setViewer(value => value ? {...value,index:(value.index+direction+value.images.length)%value.images.length} : value);
  function handleDialogKey(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    if (event.key !== 'Tab') return;
    const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('button');
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  return <ViewerContext.Provider value={setViewer}>{children}<dialog ref={dialog} className="lightbox" aria-label={viewer?.label || 'Image viewer'} onCancel={()=>setViewer(null)} onClick={event=>{if(event.target===event.currentTarget)setViewer(null);}} onKeyDown={handleDialogKey}>{viewer && <><div className="lightbox-heading"><span>{viewer.label}</span><button aria-label="Close photo viewer" onClick={()=>setViewer(null)} autoFocus><span>Close</span></button></div><div className="lightbox-image"><Image src={viewer.images[viewer.index]} fill sizes="90vw" alt={photoCaptions[viewer.images[viewer.index]] || `${viewer.label}, photo ${viewer.index+1}`}/></div><div className="lightbox-controls"><button aria-label="Previous photo" onClick={()=>move(-1)}><span>Previous</span></button><p>Photo <span>—</span> {viewer.index+1} / {viewer.images.length}</p><button aria-label="Next photo" onClick={()=>move(1)}><span>Next</span></button></div></>}</dialog></ViewerContext.Provider>;
}
export function MobileNavigation({items, activePath}: {items: readonly {name: string; href: string}[]; activePath: string}) {
  const [menu,setMenu] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return <><button ref={menuButton} className="menu-button" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} aria-controls="mobile-nav" onClick={()=>setMenu(!menu)}>{menu?<span>Close</span>:<Menu/>}</button>{menu && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" onKeyDown={event=>{if(event.key==='Escape'){setMenu(false);menuButton.current?.focus();}}}>{items.map((item,index)=><a key={item.href} href={item.href} aria-current={item.href === activePath ? 'page' : undefined} onClick={()=>setMenu(false)}><span aria-hidden="true">0{index+1}</span>{item.name}</a>)}</nav>}</>;
}
export function RoomPhotos({room}: {room:{name:string;images:string[]}}) {
  const [current,setCurrent] = useState(0);
  const setViewer = useContext(ViewerContext);
  return <div className="room-visual"><div className="room-image"><button className="room-enlarge" aria-label={`Enlarge ${room.name} photo ${current+1}`} onClick={()=>setViewer({images:room.images,index:current,label:room.name})}><Image src={room.images[current]} alt={photoCaptions[room.images[current]] || `${room.name}, photo ${current+1}`} fill sizes="(max-width: 600px) 90vw, 50vw"/></button></div><div className="room-image-footer"><span>Room photograph</span><div className="room-image-controls"><button aria-label={`Previous ${room.name} photo`} onClick={()=>setCurrent((current+room.images.length-1)%room.images.length)}><span>Previous</span></button><span aria-live="polite">{String(current+1).padStart(2, '0')} / {String(room.images.length).padStart(2, '0')}</span><button aria-label={`Next ${room.name} photo`} onClick={()=>setCurrent((current+1)%room.images.length)}><span>Next</span></button></div></div></div>;
}
export function GalleryPhotos({gallery}: {gallery:{src:string;label:string}[]}) {
  const setViewer = useContext(ViewerContext);
  return <div className="gallery-grid">{gallery.map((item,index)=><button className={`gallery-item gallery-${index}`} key={item.src} onClick={()=>setViewer({images:gallery.map(photo=>photo.src),index,label:'Hotel Brindavana gallery'})} aria-label={`Enlarge ${item.label} photo`}><div className="gallery-image"><Image src={item.src} alt={photoCaptions[item.src] || item.label} fill sizes="(max-width: 600px) 90vw, 48vw"/></div><span className="gallery-caption"><span>{item.label}</span></span></button>)}</div>;
}
