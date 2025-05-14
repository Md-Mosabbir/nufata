import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import IngredientModuleService from "../../../../../modules/ingredient/service"
import { INGREDIENT_MODULE } from "../../../../../modules/ingredient"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { product_id } = req.params
  const { name, grams, removable } = req.body as { name: string; grams: number; removable: boolean }

  // Optionally validate input here

  const ingredientModuleService: IngredientModuleService = req.scope.resolve(INGREDIENT_MODULE)
  const ingredient = await ingredientModuleService.createIngredient({
    name,
    grams,
    removable,
    product_id,
  })

  res.status(201).json({ ingredient })
} 

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { product_id } = req.params
  const ingredientModuleService: IngredientModuleService = req.scope.resolve(INGREDIENT_MODULE)
  const ingredients = await ingredientModuleService.listIngredientsByProduct(product_id)
  res.status(200).json({ ingredients })
} 