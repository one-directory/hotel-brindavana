'use client';

import { useState } from 'react';
import { site, whatsappLink } from '@/config/site';
import { WhatsAppLogo } from './whatsapp-logo';

const choices = [
  { label: 'AC', message: site.messages.room('Standard AC Rooms') },
  { label: 'Non-AC', message: site.messages.room('Standard Non-AC Rooms') },
  { label: 'Function', message: site.messages.event },
] as const;

export function ContactEnquiry() {
  const [choice, setChoice] = useState<string>('AC');
  const selected = choices.find(item => item.label === choice)!;

  return <div className="contact-enquiry">
    <fieldset className="enquiry-choice">
      <legend>What would you like to enquire about?</legend>
      <div>{choices.map(item => <label key={item.label}>
        <input type="radio" name="enquiry-type" value={item.label} checked={choice === item.label} onChange={() => setChoice(item.label)}/>
        <span>{item.label}</span>
      </label>)}</div>
    </fieldset>
    <a className="button" href={whatsappLink(selected.message)} target="_blank" rel="noopener noreferrer">
      <WhatsAppLogo size={20}/><span>Enquire on WhatsApp</span>
    </a>
  </div>;
}