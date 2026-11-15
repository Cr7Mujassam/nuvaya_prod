import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw, Heart, MessageCircle } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';

export const Home = ({ setCurrentView, onViewDetails }) => {
  const { products, setSelectedCategory, setSortBy } = useProducts();

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  const categories = [
    { name: "Chiffon Hijabs", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80", count: "12 Styles" },
    { name: "Open Abayas", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80", count: "18 Styles" },
    { name: "Jersey Hijabs", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80", count: "10 Styles" },
    { name: "Premium Abayas", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80", count: "14 Styles" },
    { name: "Scarves and Accessories", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80", count: "8 Items" }
  ];

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSortBy('featured');
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 animate-fade-in">
      
      {/* Hero Banner */}
      <section className="relative bg-[#F3EFEA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 flex flex-col lg:flex-row items-center justify-between">
          
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-[#EBE5DD] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-widest text-[#6B705C] uppercase">
              <Sparkles size={14} /> Luxury Modest Fashion House
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C2A29] leading-[1.15]">
              Modesty Meets <br />
              <span className="italic font-normal text-[#6B705C]">Modern Elegance.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#6B6560] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover exquisitely draped pure silk chiffon hijabs, embroidered open abayas, and effortless daily essentials designed for the graceful modern woman.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                onClick={() => handleCategoryClick('Chiffon Hijabs')}
                className="w-full sm:w-auto bg-[#2C2A29] hover:bg-[#3D3A39] text-[#F9F6F0] px-8 py-4 rounded text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                Shop Hijabs <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => handleCategoryClick('Open Abayas')}
                className="w-full sm:w-auto border border-[#6B705C] text-[#6B705C] hover:bg-[#6B705C] hover:text-white px-8 py-4 rounded text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all"
              >
                Explore Abayas <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Hero Image Collage */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative flex justify-center">
            <div className="relative w-72 sm:w-96 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80" 
                alt="Nuvaya Modest Fashion Model" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 sm:left-4 w-48 sm:w-64 aspect-[4/3] rounded-xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
              <img 
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80" 
                alt="Silk Chiffon Hijab" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#6B705C] uppercase">Curated Collections</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2A29]">Explore by Category</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer shadow-md bg-[#F3EFEA]"
            >
              <img 
                src={cat.image} 
                alt={cat.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] tracking-widest uppercase text-[#C5A880] font-semibold">{cat.count}</span>
                <h3 className="font-serif text-base sm:text-lg font-bold group-hover:text-[#C5A880] transition-colors">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#6B705C] uppercase">Most Coveted</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2A29]">Best-Selling Masterpieces</h2>
          </div>
          <button 
            onClick={() => { setSelectedCategory('All'); setSortBy('rating'); setCurrentView('shop'); }}
            className="text-xs font-bold tracking-widest uppercase text-[#6B705C] hover:text-[#2C2A29] flex items-center gap-1 transition-colors"
          >
            View All Best Sellers <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} onViewDetails={onViewDetails} />
          ))}
        </div>
      </section>

      {/* Brand Promise / Why Choose Nuvaya */}
      <section className="bg-[#F3EFEA] py-16 border-y border-[#EBE5DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#6B705C] uppercase">The Nuvaya Promise</span>
            <h2 className="font-serif text-3xl font-bold text-[#2C2A29]">Why Connoisseurs Choose Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl text-center space-y-3 shadow-sm border border-[#EBE5DD]">
              <div className="w-12 h-12 bg-[#F9F6F0] rounded-full flex items-center justify-center mx-auto text-[#6B705C]">
                <Sparkles size={24} />
              </div>
              <h3 className="font-serif font-bold text-base text-[#2C2A29]">Uncompromising Quality</h3>
              <p className="text-xs text-[#8A8580] leading-relaxed">Sourced from premium Dubai crepes, organic modal, and pure silk chiffon.</p>
            </div>

            <div className="bg-white p-6 rounded-xl text-center space-y-3 shadow-sm border border-[#EBE5DD]">
              <div className="w-12 h-12 bg-[#F9F6F0] rounded-full flex items-center justify-center mx-auto text-[#6B705C]">
                <Truck size={24} />
              </div>
              <h3 className="font-serif font-bold text-base text-[#2C2A29]">Pan-India Shipping</h3>
              <p className="text-xs text-[#8A8580] leading-relaxed">Fast, insured delivery with complimentary shipping on orders above ₹1,499.</p>
            </div>

            <div className="bg-white p-6 rounded-xl text-center space-y-3 shadow-sm border border-[#EBE5DD]">
              <div className="w-12 h-12 bg-[#F9F6F0] rounded-full flex items-center justify-center mx-auto text-[#6B705C]">
                <MessageCircle size={24} />
              </div>
              <h3 className="font-serif font-bold text-base text-[#2C2A29]">WhatsApp Concierge</h3>
              <p className="text-xs text-[#8A8580] leading-relaxed">Personalized styling assistance and effortless ordering directly on WhatsApp.</p>
            </div>

            <div className="bg-white p-6 rounded-xl text-center space-y-3 shadow-sm border border-[#EBE5DD]">
              <div className="w-12 h-12 bg-[#F9F6F0] rounded-full flex items-center justify-center mx-auto text-[#6B705C]">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-serif font-bold text-base text-[#2C2A29]">Modest Perfection</h3>
              <p className="text-xs text-[#8A8580] leading-relaxed">Thoughtfully engineered cuts ensuring complete coverage without sacrificing style.</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#C5A880] uppercase">Freshly Dropped</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2A29]">New Arrivals</h2>
          </div>
          <button 
            onClick={() => { setSelectedCategory('All'); setSortBy('newest'); setCurrentView('shop'); }}
            className="text-xs font-bold tracking-widest uppercase text-[#6B705C] hover:text-[#2C2A29] flex items-center gap-1 transition-colors"
          >
            View All New Arrivals <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} onViewDetails={onViewDetails} />
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-semibold tracking-[0.25em] text-[#6B705C] uppercase">Client Love</span>
        <h2 className="font-serif text-3xl font-bold text-[#2C2A29] mb-12">Words from Our Patrons</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F3EFEA] p-8 rounded-xl border border-[#EBE5DD] relative shadow-2xs">
            <p className="font-serif text-sm italic text-[#2C2A29] mb-4">
              "The Aurelia Chiffon Hijab is absolute perfection. The gold sheen is subtle and luxurious, and ordering via WhatsApp was seamless!"
            </p>
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#6B705C]">Zainab Khan</h4>
            <span className="text-[10px] text-[#8A8580]">Mumbai</span>
          </div>

          <div className="bg-[#F3EFEA] p-8 rounded-xl border border-[#EBE5DD] relative shadow-2xs">
            <p className="font-serif text-sm italic text-[#2C2A29] mb-4">
              "Nuvaya's open abayas have completely transformed my professional wardrobe. The fabric quality is comparable to top international designer pieces."
            </p>
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#6B705C]">Dr. Fatima Al-Mansoor</h4>
            <span className="text-[10px] text-[#8A8580]">Hyderabad</span>
          </div>

          <div className="bg-[#F3EFEA] p-8 rounded-xl border border-[#EBE5DD] relative shadow-2xs">
            <p className="font-serif text-sm italic text-[#2C2A29] mb-4">
              "The magnetic hijab pins are a total game changer! No more snags on my pure silk hijabs. Fast delivery and exquisite packaging."
            </p>
            <h4 className="font-bold text-xs uppercase tracking-widest text-[#6B705C]">Aaliya Rahman</h4>
            <span className="text-[10px] text-[#8A8580]">Bangalore</span>
          </div>
        </div>
      </section>

      {/* Instagram Shopping Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#6B705C] uppercase">@nuvaya.co.in</span>
          <h2 className="font-serif text-3xl font-bold text-[#2C2A29]">Instagram Shopping Gallery</h2>
          <p className="text-xs text-[#8A8580]">Tag @nuvaya.co.in in your elegant looks to be featured.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
              Shop Look
            </div>
          </div>
          <div className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
              Shop Look
            </div>
          </div>
          <div className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
              Shop Look
            </div>
          </div>
          <div className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
              Shop Look
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="bg-[#2C2A29] text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880]">Join the Inner Circle</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">Receive 10% Off Your First Order</h2>
          <p className="text-xs sm:text-sm text-[#A5A58D] max-w-lg mx-auto">
            Subscribe to get early access to new seasonal hijab drops, private trunk shows, and exclusive styling editorials.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to NUVAYA!'); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="flex-1 px-4 py-3 bg-[#3D3A39] border border-[#555] text-white rounded text-xs focus:outline-none focus:border-[#C5A880] placeholder-[#8A8580]"
            />
            <button 
              type="submit"
              className="bg-[#C5A880] hover:bg-[#b0946d] text-[#2C2A29] font-bold px-6 py-3 rounded text-xs tracking-widest uppercase transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
