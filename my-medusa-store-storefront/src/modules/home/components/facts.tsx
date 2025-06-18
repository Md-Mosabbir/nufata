"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const facts = [
  { id: 1, text: "100% Natural Ingredients" },
  { id: 2, text: "Loved by 10k+ Customers" },
  { id: 3, text: "Handcrafted Daily" },
  { id: 4, text: "Sustainable Packaging" },
]

export default function QuickFacts() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFFFFF] to-[#F4F1DE]">
      {" "}
      {/* from: White, to: Cream background */}
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        ></motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
            Quick Facts
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {facts.map((fact, index) => (
            <motion.div
              key={fact.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <div className="bg-gradient-to-r from-[#E07A5F]/90 to-[#D85A35]/90 rounded-lg p-6 h-full flex items-center justify-center text-center shadow-sm">
                {" "}
                {/* from: Warm terracotta, to: Medium-dark terracotta */}
                <p className="font-bold text-white text-lg">{fact.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
