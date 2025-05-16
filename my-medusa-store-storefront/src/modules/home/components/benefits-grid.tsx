"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import { Heart, Leaf, ListChecks } from "lucide-react"
import { Checkbox } from "@medusajs/ui"

export default function SpecialFeatures() {
  const [ingredients, setIngredients] = useState({
    chocolate: true,
    nuts: true,
    dairy: false,
    gluten: false,
  })

  const handleIngredientToggle = (ingredient: string) => {
    setIngredients((prev) => ({
      ...prev,
      [ingredient]: !prev[ingredient as keyof typeof prev],
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#F4F1DE] to-[#FFFFFF]">
      {" "}
      {/* from: Cream background, to: White */}
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            What Makes Us Special
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Our commitment to quality and customization sets us apart
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Customizable Ingredients */}
          <motion.div variants={itemVariants}>
            <div className="h-full border border-black/5 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#E07A5F] flex items-center justify-center mb-6">
                  {/* Warm terracotta */}
                  <ListChecks className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">
                  Customizable Ingredients
                </h3>
                <p className="text-black/70 mb-6">
                  Personalize your treats by selecting exactly what goes into
                  them. Perfect for dietary preferences and allergen concerns.
                </p>

                <div className="space-y-3 w-full max-w-xs mx-auto">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="chocolate"
                      checked={ingredients.chocolate}
                      onCheckedChange={() =>
                        handleIngredientToggle("chocolate")
                      }
                    />
                    <label
                      htmlFor="chocolate"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Chocolate Chips
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="nuts"
                      checked={ingredients.nuts}
                      onCheckedChange={() => handleIngredientToggle("nuts")}
                    />
                    <label
                      htmlFor="nuts"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Nuts
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dairy"
                      checked={ingredients.dairy}
                      onCheckedChange={() => handleIngredientToggle("dairy")}
                      disabled
                    />
                    <label
                      htmlFor="dairy"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Dairy (Cannot be removed)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="gluten"
                      checked={ingredients.gluten}
                      onCheckedChange={() => handleIngredientToggle("gluten")}
                      disabled
                    />
                    <label
                      htmlFor="gluten"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Gluten (Cannot be removed)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Health First */}
          <motion.div variants={itemVariants}>
            <div className="h-full border border-black/5 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#81B29A] flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">
                  Health First
                </h3>
                <p className="text-black/70 mb-6">
                  We prioritize your wellbeing by using natural ingredients,
                  avoiding artificial preservatives, and offering options for
                  various dietary needs.
                </p>

                <div className="grid grid-cols-2 gap-4 w-full">
                  {[
                    "No Artificial Colors",
                    "No Preservatives",
                    "Low Sugar Options",
                    "Organic Ingredients",
                  ].map((label) => (
                    <div
                      key={label}
                      className="bg-[#F0F5F3] p-4 rounded-lg border border-[#E1ECE7]"
                    >
                      <p className="font-medium text-[#4C7A63]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          {/* Ingredient Transparency */}
          <motion.div variants={itemVariants}>
            <div className="h-full border border-black/5 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#F2CC8F] flex items-center justify-center mb-6">
                  <Leaf className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">
                  Ingredient Transparency
                </h3>
                <p className="text-black/70 mb-6">
                  We believe you deserve to know exactly what's in your food.
                  That's why we clearly list all ingredients and their sources.
                </p>

                <div className="w-full bg-[#FEF9F1] p-4 rounded-lg border border-[#FCF3E3]">
                  <h4 className="font-bold text-[#CB8A17] mb-2">
                    Sample Ingredient List
                  </h4>
                  <ul className="text-left text-sm text-[#E8A42F] space-y-1">
                    <li>• Organic Flour (Wheat)</li>
                    <li>• Cane Sugar</li>
                    <li>• Butter (Milk)</li>
                    <li>• Free-Range Eggs</li>
                    <li>• Belgian Chocolate (70% Cocoa)</li>
                    <li>• Vanilla Extract</li>
                    <li>• Sea Salt</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
