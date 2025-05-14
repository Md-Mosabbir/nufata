import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/pitha-hero.jpg')" }}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="relative z-10 text-center text-white max-w-2xl mx-auto p-8 rounded-3xl bg-white/20 backdrop-blur-md shadow-lg">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">Spring Pitha Festival</h1>
        <p className="text-lg md:text-xl mb-6">Handcrafted Bangladeshi pitha, made with love and tradition. Taste the heritage in every bite.</p>
        <button className="px-8 py-3 bg-amber-600 rounded-full text-lg font-semibold shadow-lg hover:bg-amber-700 transition">Shop Now</button>
      </div>
    </section>
  )
} 