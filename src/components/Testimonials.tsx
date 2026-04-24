import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "John Kamau",
    role: "Nairobi Resident",
    content: "The best plumbing service in Nairobi. They transformed my old bathroom into a modern masterpiece. Professional and on time!",
    rating: 5
  },
  {
    name: "Sarah Wanjiku",
    role: "Property Manager",
    content: "We use Davis Plumbing for all our estate maintenance. Their response time is unmatched, especially for emergencies.",
    rating: 5
  },
  {
    name: "David Omondi",
    role: "Industrial Client",
    content: "Exceptional work on our warehouse repiping project. They handled everything from sourcing materials to final testing perfectly.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 border-y border-gray-100 py-24">
      <div className="container">
        <div className="text-center mb-16 space-y-3">
          <div className="text-[#e11d48] font-bold uppercase tracking-widest text-xs">Customer Satisfaction</div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">What Our Clients Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <div key={i} className="bg-white p-10 border border-gray-100 relative group hover:border-[#e11d48] transition-colors duration-500">
              <Quote className="absolute top-6 right-6 h-10 w-10 text-gray-100 group-hover:text-[#e11d48]/10 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#e11d48] text-[#e11d48]" />
                ))}
              </div>
              <p className="text-muted-foreground mb-8 text-lg italic leading-relaxed font-medium text-gray-600">"{review.content}"</p>
              <div className="pt-6 border-t border-gray-50">
                <div className="font-black uppercase tracking-tight text-sm">{review.name}</div>
                <div className="text-[10px] font-bold text-[#e11d48] uppercase tracking-[0.2em] mt-1">{review.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
