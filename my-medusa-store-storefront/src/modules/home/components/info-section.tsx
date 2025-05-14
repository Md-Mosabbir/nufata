export default function InfoSection() {
  return (
    <section className="my-16 flex flex-col md:flex-row items-center gap-8 px-2 md:px-0">
      <div className="flex-1 bg-white/30 backdrop-blur-md rounded-3xl shadow-lg p-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-800">Form Meets Tradition, Built for Joy</h2>
        <p className="text-gray-700 text-lg mb-6">Our pithas are lovingly handcrafted using time-honored recipes and the best local ingredients. Every bite is a celebration of Bangladeshi heritage, perfect for family gatherings, festivals, or a sweet treat any day.</p>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Made fresh to order</li>
          <li>Locally sourced ingredients</li>
          <li>Perfect for any occasion</li>
        </ul>
      </div>
      <div className="flex-1 flex justify-center">
        <img src="/images/pitha-family.jpg" alt="Family making pitha" className="rounded-3xl shadow-lg w-full max-w-md object-cover" />
      </div>
    </section>
  )
} 