import { defineLink } from "@medusajs/framework/utils"
import IngredientModule from "../modules/ingredient"
import ProductModule from "@medusajs/medusa/product"

export default defineLink(
  {
    linkable: IngredientModule.linkable.ingredient,
    field: "product_id",
    isList: false,
  },
  ProductModule.linkable.product,
  {
    readOnly: true
  }
) 