import { Button } from "@medusajs/ui"
import { ArrowRight } from "lucide-react"

export default function Focus() {
  return (
    <div className="relative h-screen -mt-[65px] w-full overflow-hidden bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-amber-800"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>

      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <div className="max-w-4xl space-y-8">
          <span className="inline-block text-sm font-medium tracking-widest text-amber-700 uppercase border-b border-amber-500 pb-1">
            Authentic Taste of Tradition
          </span>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-gray-900 leading-tight">
            <span className="block">Handcrafted</span>
            <span className="font-normal text-amber-700 block">Pitha</span>
            <span className="block">for Every Occasion</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 font-light max-w-2xl mx-auto">
            Delicate, artisanal sweets and savories made with time-honored recipes and modern craftsmanship.
          </p>

          <div className="flex flex-wrap gap-6 pt-4 justify-center">
            <Button className="group relative overflow-hidden bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full px-8 py-6 text-lg transition-all duration-300">
              <span className="relative z-10 flex items-center">
                Order Now <ArrowRight className="ml-2 h-5 w-5" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:translate-x-full ease-out"></span>
            </Button>

            <Button
              variant="secondary"
              className="group relative overflow-hidden bg-transparent border-2 border-gray-800 text-gray-800 hover:text-white rounded-full px-8 py-6 text-lg transition-all duration-300"
            >
              <span className="relative z-10">Explore Menu</span>
              <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </Button>
          </div>
        </div>
      </div>


      {/* Decorative elements that reflect Bangladeshi patterns */}
      <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-amber-700/20 rounded-tl-3xl"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-amber-700/20 rounded-br-3xl"></div>
    </div>
  )
}

