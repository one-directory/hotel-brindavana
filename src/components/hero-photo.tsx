'use client';

import Image from 'next/image';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export function HeroPhoto() {
  const [night, setNight] = useState(false);
  const [nightReady, setNightReady] = useState(false);
  const [nightFailed, setNightFailed] = useState(false);
  const showingNight = night && nightReady && !nightFailed;
  const status = nightFailed && night ? 'Night view unavailable' : night && !nightReady ? 'Loading night view...' : showingNight ? 'After dark in Santhekatte' : 'Daylight in Santhekatte';

  return <figure className="hero-photo hero-day-night" data-night={showingNight}>
    <div className="hero-photo-frame">
      <Image className="hero-day-image" src="/images/hero.png" alt="Hotel Brindavana exterior and entrance in daylight" aria-hidden={showingNight} fill priority sizes="(max-width: 600px) 100vw, 60vw"/>
      <Image className="hero-night-image" src="/images/hero-night.png" alt="Hotel Brindavana illuminated exterior and entrance at night" aria-hidden={!showingNight} fill loading="eager" sizes="(max-width: 600px) 100vw, 60vw" onLoad={() => setNightReady(true)} onError={() => setNightFailed(true)}/>
      <div className="hero-view-switch" role="group" aria-label="Hotel exterior view">
        <span className="hero-view-indicator" aria-hidden="true" data-night={night}/>
        <button type="button" aria-label="Day view" aria-pressed={!night} onClick={() => setNight(false)}><Sun size={16} aria-hidden="true"/>Day</button>
        <button type="button" aria-label="Night view" aria-pressed={night} onClick={() => setNight(true)}><Moon size={16} aria-hidden="true"/>Night</button>
      </div>
      <div className="hero-view-caption" role="status"><span className="hero-view-dot" aria-hidden="true"/>{status}</div>
    </div>
    <figcaption><span>Hotel Brindavana</span><span>Santhekatte, Udupi</span></figcaption>
  </figure>;
}
