export default function ProductHighlights() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-8 px-2 md:px-0">
      {/* Product 1 */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg bg-white/30 backdrop-blur-md flex flex-col justify-end min-h-[320px]">
        <img
          src="/images/nolen-gur-pitha.jpg"
          alt="Nolen Gur Pitha"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        />
        <div className="relative z-10 p-6 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-2xl font-semibold text-white mb-2">Nolen Gur Pitha</h3>
          <p className="text-white text-lg mb-4">From ৳120</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/80 text-amber-700 rounded-full font-semibold hover:bg-white transition">Explore</button>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition">Shop</button>
          </div>
        </div>
      </div>
      {/* Product 2 */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg bg-white/30 backdrop-blur-md flex flex-col justify-end min-h-[320px]">
        <img
          src="/images/patishapta.jpg"
          alt="Patishapta"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
        />
        <div className="relative z-10 p-6 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-2xl font-semibold text-white mb-2">Patishapta</h3>
          <p className="text-white text-lg mb-4">From ৳100</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/80 text-amber-700 rounded-full font-semibold hover:bg-white transition">Explore</button>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition">Shop</button>
          </div>
        </div>
      </div>
    </section>
  )
} 