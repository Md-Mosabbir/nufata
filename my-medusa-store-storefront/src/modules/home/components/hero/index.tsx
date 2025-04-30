import About from "../about"
import Contact from "../contact"
import Focus from "../focus"
import Testimonials from "../testimonials"
import { MessageCircle } from "lucide-react" // Importing the Messenger icon

const Hero = () => {
  return (
    <main className="min-h-screen relative">
      <Focus />
      <About />
      <Testimonials />
      <Contact />

      {/* Messenger Icon */}
      <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition duration-300">
        <MessageCircle size={50} />
      </div>
    </main>
  )
}

export default Hero
