import { model } from "@medusajs/framework/utils"

const Ingredient = model.define("ingredient", {
  id: model.id().primaryKey(),
  name: model.text(),
  removable: model.boolean().default(false), // Whether the ingredient can be omitted by the user
  product_id: model.text().index("IDX_INGREDIENT_PRODUCT_ID"), // Foreign key to product
})

export default Ingredient 
