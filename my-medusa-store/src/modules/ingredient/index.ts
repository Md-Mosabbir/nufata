import IngredientModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const INGREDIENT_MODULE = "ingredient"

export default Module(INGREDIENT_MODULE, {
  service: IngredientModuleService,
}) 