export default function BenefitsGrid() {
  const benefits = [
    {
      img: "/images/benefit-fresh.jpg",
      title: "Freshly Made",
      desc: "Prepared daily with the finest ingredients."
    },
    {
      img: "/images/benefit-tradition.jpg",
      title: "Traditional Recipe",
      desc: "Passed down through generations of pitha makers."
    },
    {
      img: "/images/benefit-delivery.jpg",
      title: "Home Delivery",
      desc: "Enjoy pitha at your doorstep, anywhere in the city."
    },
    {
      img: "/images/benefit-authentic.jpg",
      title: "Authentic Taste",
      desc: "Experience the true flavors of Bangladesh."
    },
  ]
  return (
    <section className="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 md:px-0">
      {benefits.map((b, i) => (
        <div key={i} className="rounded-3xl bg-white/30 backdrop-blur-md shadow-lg p-6 flex flex-col items-center text-center">
          <img src={b.img} alt={b.title} className="w-20 h-20 object-cover rounded-full mb-4 border-4 border-amber-100 shadow" />
          <h4 className="text-lg font-semibold mb-2 text-amber-800">{b.title}</h4>
          <p className="text-gray-700 text-sm">{b.desc}</p>
        </div>
      ))}
    </section>
  )
} 