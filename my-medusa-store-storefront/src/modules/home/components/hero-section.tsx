"use client"

import { Button } from "@medusajs/ui"
import { motion } from "framer-motion"

/**
 * Colors used:
 * - white: #FFFFFF - Background overlay
 * - black: #000000 - Text
 * - black/80: rgba(0,0,0,0.8) - Secondary text
 * - white/40: rgba(255,255,255,0.4) - Card background
 * - white/20: rgba(255,255,255,0.2) - Card border
 * - amber-500: #F59E0B - CTA button background
 * - amber-600: #D97706 - CTA button hover
 * - orange-500/30: rgba(249,115,22,0.3) - Gradient start
 * - orange-500/20: rgba(249,115,22,0.2) - Gradient middle
 * - emerald-500/30: rgba(16,185,129,0.3) - Gradient end
 */

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#E07A5F]/30 via-[#E07A5F]/20 to-[#81B29A]/30"></div>{" "}
        {/* from: Warm terracotta, to: Muted sage green */}
      </div>

      <div className="container relative z-10 px-4 md:px-6 py-10 md:py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto backdrop-blur-sm bg-[#FFFFFF]/40 p-8 md:p-12 rounded-xl border border-[#FFFFFF]/20 shadow-lg" /* White with opacity */
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black mb-4">
              Handcrafted with Heart
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-lg md:text-xl text-black/80 mb-8 max-w-2xl mx-auto">
              Every batch is crafted with the finest ingredients, mixed to
              perfection, and baked with love to create treats that aren't just
              delicious, but memorable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button className="bg-[#F2CC8F] hover:bg-[#EDB85F] text-[#000000] font-medium px-8 py-6 rounded-full text-lg shadow-md transition-all duration-300">
              {" "}
              {/* bg: Vibrant ochre, hover: Medium-dark ochre, text: Black */}
              Explore the Collection
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
