import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    text: "The bhapa pitha took me right back to my grandmother's kitchen. Authentic flavors that are hard to find elsewhere.",
    author: "Rahim Ahmed",
    location: "Dhaka",
  },
  {
    id: 2,
    text: "Their patishapta is simply divine. The perfect balance of sweetness and texture. I order every week!",
    author: "Priya Sharma",
    location: "New York",
  },
  {
    id: 3,
    text: "As someone who grew up with homemade pitha, I'm incredibly impressed by the quality and authenticity here.",
    author: "Tanvir Rahman",
    location: "Toronto",
  },
]

const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium tracking-wider text-amber-700 uppercase border-b border-amber-500 pb-1">
            Testimonials
          </span>
          <h2 className="text-4xl font-light tracking-tight text-gray-900 mt-4">
            What Our{" "}
            <span className="font-normal text-amber-700">Customers</span> Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#F8F5F2] p-8 rounded-2xl relative"
            >
              <Quote className="absolute top-6 right-6 h-12 w-12 text-amber-200" />
              <p className="text-gray-700 relative z-10 mb-6">
                {testimonial.text}
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-medium">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-gray-900 font-medium">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
