import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import IngredientModuleService from "../../../../../modules/ingredient/service"
import { INGREDIENT_MODULE } from "../../../../../modules/ingredient"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { product_id } = req.params
  const ingredientModuleService: IngredientModuleService = req.scope.resolve(INGREDIENT_MODULE)
  const ingredients = await ingredientModuleService.listIngredientsByProduct(product_id)
  res.status(200).json({ ingredients })
} 