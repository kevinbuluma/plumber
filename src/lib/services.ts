export const PLUMBING_SERVICES = [
  {
    id: "toilet-repair",
    label: "Toilet Repair & Unclogging",
    description: "Fixing leaks, running toilets, and stubborn clogs in residential and commercial toilets.",
    price: "From KSh 1,500",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "bathroom-renovation",
    label: "Bathroom Renovation Kenya",
    description: "Full redesigns and overhaul of master bathrooms including new piping, fixtures, and tiling.",
    price: "Contact for Quote",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "water-heater",
    label: "Water Heater Installation",
    description: "Expert installation of solar, electric, and instant water heaters for consistent hot water.",
    price: "From KSh 3,500",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "burst-pipe",
    label: "Piping and Repiping Services",
    description: "Emergency repair of burst pipes and full residential/commercial repiping solutions.",
    price: "From KSh 2,500",
    image: "https://images.unsplash.com/photo-1504148455328-497c5efdf13a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "kitchen-sink",
    label: "Kitchen Sink Tap Repair",
    description: "Fixing dripping taps or replacing old faucets with modern, water-efficient models.",
    price: "From KSh 1,200",
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "glass-shower",
    label: "Glass Shower Cubicle Installation",
    description: "Professional installation of modern glass shower cubicles and enclosures.",
    price: "From KSh 15,000",
    image: "https://images.unsplash.com/photo-1620626011761-9963d7b59675?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "low-pressure",
    label: "Low Water Pressure Solutions",
    description: "Diagnosing and fixing low water pressure issues with pump installations and pipe cleaning.",
    price: "From KSh 4,000",
    image: "https://images.unsplash.com/photo-1585909665970-014691e50a43?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "instant-shower",
    label: "Instant Shower Installation",
    description: "Quick and safe installation of instant hot shower heads for your bathroom.",
    price: "From KSh 2,500",
    image: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80&w=800",
  },
];

export const WHATSAPP_NUMBER = "+254703335788";

export const getWhatsAppLink = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
