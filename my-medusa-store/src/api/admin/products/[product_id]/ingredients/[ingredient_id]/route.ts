import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import IngredientModuleService from "../../../../../../modules/ingredient/service"
import { INGREDIENT_MODULE } from "../../../../../../modules/ingredient"

export async function PATCH(req: MedusaRequest, res: MedusaResponse) {
  const { ingredient_id } = req.params
  const { name, removable } = req.body as {
    name?: string
    removable?: boolean
  }
  const ingredientModuleService: IngredientModuleService = req.scope.resolve(INGREDIENT_MODULE)
  const updated = await ingredientModuleService.updateIngredient(ingredient_id, { name, removable })
  res.status(200).json({ ingredient: updated })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const { ingredient_id } = req.params
  const ingredientModuleService: IngredientModuleService = req.scope.resolve(INGREDIENT_MODULE)
  const deleted = await ingredientModuleService.deleteIngredient(ingredient_id)
  res.status(200).json({ ingredient: deleted })
} 