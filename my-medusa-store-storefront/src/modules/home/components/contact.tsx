import { Button } from "@medusajs/ui"
import { MapPin, Clock, Phone } from "lucide-react"

const Contact = () => {
  return (
    <section className="py-24 bg-[#F8F5F2]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="inline-block text-sm font-medium tracking-wider text-amber-700 uppercase border-b border-amber-500 pb-1">
              Visit Us
            </span>
            <h2 className="text-4xl font-light tracking-tight text-gray-900 mt-4">
              Experience the{" "}
              <span className="font-normal text-amber-700">Tradition</span>
            </h2>
            <p className="text-gray-700 mt-4 mb-8">
              Visit our shop to experience the authentic taste of traditional
              pitha. We also offer catering services for special occasions.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-amber-700 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Location
                  </h3>
                  <p className="text-gray-700">123 Pitha Lane, Gulshan</p>
                  <p className="text-gray-700">Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-6 w-6 text-amber-700 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                  <p className="text-gray-700">Monday - Friday: 8am - 8pm</p>
                  <p className="text-gray-700">Saturday - Sunday: 9am - 9pm</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-amber-700 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Contact</h3>
                  <p className="text-gray-700">Phone: +880 1234 567890</p>
                  <p className="text-gray-700">Email: hello@pithahouse.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button className="bg-amber-700 hover:bg-amber-800 text-white rounded-full px-6">
                Get Directions
              </Button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-auto">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url('/placeholder.svg?height=800&width=1200')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-6">
              <h3 className="text-xl font-medium text-gray-900">
                Join Our Pitha Making Workshop
              </h3>
              <p className="text-gray-700 mt-2">Every Saturday, 11am - 1pm</p>
              <Button className="mt-4 rounded-full border-amber-700 text-amber-700 hover:bg-amber-50">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
