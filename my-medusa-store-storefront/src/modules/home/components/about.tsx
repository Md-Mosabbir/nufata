const About = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "url('/placeholder.svg?height=800&width=800')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <span className="inline-block text-sm font-medium tracking-wider text-amber-700 uppercase border-b border-amber-500 pb-1">
              Our Story
            </span>
            <h2 className="text-4xl font-light tracking-tight text-gray-900">
              Crafting{" "}
              <span className="font-normal text-amber-700">Tradition</span>{" "}
              Since 1985
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our journey began in a small kitchen with recipes passed down
              through generations. Today, we continue to honor those traditions
              while bringing innovative twists to classic pitha varieties.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Every pitha is handcrafted with locally-sourced ingredients,
              ensuring authentic flavors that transport you to the heart of
              South Asian culinary heritage.
            </p>

            <div className="pt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-light text-amber-700">35+</p>
                <p className="text-sm text-gray-600">Varieties</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-light text-amber-700">100%</p>
                <p className="text-sm text-gray-600">Natural</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-light text-amber-700">3</p>
                <p className="text-sm text-gray-600">Locations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
