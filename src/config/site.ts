export const site = {
  name: 'Hotel Brindavana', kannada: 'ಹೋಟೇಲ್ ಬೃಂದಾವನ',
  phone: '+91 9743545550', telephone: '+919743545550', whatsapp: '919743545550',
  additionalPhone: '+91 9743040505', additionalTelephone: '+919743040505',
  address: '9PJQ+R9M, 3rd Cross, Gopalpura, Santhekatte, Udupi - Perdoor - Agumbe Rd, Kallianpur, Karnataka 576105',
  checkIn: '2:00 PM', checkOut: '12:00 PM',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://hotel-brindavana-santhekatte.keenbowl128.chatgpt.site',
  mapQuery: 'Hotel Brindavana Santhekatte Kallianpur, 9PJQ+R9M, Karnataka 576105',
  messages: {
    default: 'Hello Hotel Brindavana, I would like to enquire about room availability and rates.',
    event: 'Hello Hotel Brindavana, I would like to enquire about your Party Hall and Lawn for a gathering.',
    dining: 'Hello Hotel Brindavana, I would like to enquire about dining. Date: ___, Time: ___, Guests: ___.',
    arrival: 'Hello Hotel Brindavana, I would like help planning my arrival. Date: ___, Expected arrival time: ___.',
    room: (name: string) => `Hello Hotel Brindavana, I would like to enquire about ${name}. Dates: ___, Guests: ___.`,
  },
};
export const whatsappLink = (message: string = site.messages.default) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
export const rooms = [
  {
    "name": "Standard Non-AC Rooms",
    "slug": "standard-non-ac",
    "description": "A Standard room without air conditioning.",
    "amenities": [
      "Wi-Fi",
      "Room service"
    ],
    "images": [
      "/images/enhanced/standard-non-ac.webp",
      "/images/enhanced/non-ac-02.webp"
    ]
  },
  {
    "name": "Standard AC Rooms",
    "slug": "standard-ac",
    "description": "A Standard room with air conditioning.",
    "amenities": [
      "Air conditioning",
      "Wi-Fi",
      "Room service"
    ],
    "images": [
      "/images/enhanced/standard-ac.webp",
      "/images/enhanced/ac-02.webp",
      "/images/enhanced/ac-05.webp",
      "/images/enhanced/ac-06.webp"
    ]
  }
];
export const venuePhotos = [
  {
    "id": "restaurant",
    "name": "Restaurant",
    "description": "Dining areas and restaurant seating.",
    "images": [
      "/images/enhanced/restaurant.webp",
      "/images/enhanced/resto-01.webp",
      "/images/enhanced/resto-02.webp"
    ]
  },
  {
    "id": "party-hall",
    "name": "Party hall",
    "description": "Seating, tables and lighting in the party hall.",
    "images": [
      "/images/enhanced/party-hall.webp"
    ]
  }
];
export const photoCaptions: Record<string, string> = {
  "/images/enhanced/ac-02.webp": "AC room with a blue feature wall",
  "/images/enhanced/ac-06.webp": "AC room and doorway",
  "/images/enhanced/resto-02.webp": "Restaurant tables and seating",
  "/images/enhanced/party-hall.webp": "Party hall seating and tables",
  "/images/enhanced/ac-01.webp": "Desk and mirror in an AC room",
  "/images/enhanced/ac-05.webp": "AC room with two beds",
  "/images/enhanced/ac-08.webp": "AC room with a blue feature wall",
  "/images/enhanced/non-ac-02.webp": "Non-AC room with a colorful feature wall",
  "/images/enhanced/resto-01.webp": "Restaurant tables and booth seating",
  "/images/enhanced/resto-05.webp": "Deepa AC Bar & Family Restaurant entrance",
  "/images/enhanced/party-hall-02.webp": "Party hall seating and tables",
  "/images/enhanced/party-hall-06.webp": "Party hall with blue lighting",
  "/images/enhanced/standard-ac.webp": "AC room with a maroon feature wall",
  "/images/enhanced/standard-non-ac.webp": "Non-AC room with a blue feature wall",
  "/images/enhanced/restaurant.webp": "Restaurant dining area"
};
export const gallery = [{src: "/images/hero.png", label: "Hotel exterior"}, ...[...rooms, ...venuePhotos].flatMap(group => group.images.map(src => ({src, label: photoCaptions[src]})))];
