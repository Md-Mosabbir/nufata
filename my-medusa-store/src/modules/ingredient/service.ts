import { InjectManager, MedusaService, MedusaContext } from "@medusajs/framework/utils"
import Ingredient from "./models/ingredient"
import { Context } from "@medusajs/framework/types"
import { EntityManager } from "@mikro-orm/knex"
import { randomUUID } from "crypto"

class IngredientModuleService extends MedusaService({
  Ingredient,
}) {
  @InjectManager()
  async createIngredient(
    data: { name: string; grams: number; removable: boolean; product_id: string },
    @MedusaContext() sharedContext?: Context<EntityManager>
  ) {
    if (!sharedContext?.manager) {
      throw new Error("EntityManager is not available in context")
    }
    const result = await sharedContext.manager.execute(
      `INSERT INTO ingredient (id, name, grams, removable, product_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, now(), now())
       RETURNING *`,
      [
        randomUUID(),
        data.name,
        data.grams,
        data.removable,
        data.product_id
      ]
    )
    return result[0]
  }

  @InjectManager()
  async listIngredientsByProduct(
    product_id: string,
    @MedusaContext() sharedContext?: Context<EntityManager>
  ) {
    if (!sharedContext?.manager) {
      throw new Error("EntityManager is not available in context")
    }
    const result = await sharedContext.manager.execute(
      `SELECT * FROM ingredient WHERE product_id = ? AND deleted_at IS NULL`,
      [product_id]
    )
    return result
  }

  @InjectManager()
  async updateIngredient(
    id: string,
    data: { name?: string; grams?: number; removable?: boolean },
    @MedusaContext() sharedContext?: Context<EntityManager>
  ) {
    if (!sharedContext?.manager) {
      throw new Error("EntityManager is not available in context")
    }
    // Build dynamic SET clause
    const fields: string[] = []
    const values: any[] = []
    if (data.name !== undefined) {
      fields.push("name = ?")
      values.push(data.name)
    }
    if (data.grams !== undefined) {
      fields.push("grams = ?")
      values.push(data.grams)
    }
    if (data.removable !== undefined) {
      fields.push("removable = ?")
      values.push(data.removable)
    }
    if (fields.length === 0) {
      throw new Error("No fields to update")
    }
    fields.push("updated_at = now()")
    const sql = `UPDATE ingredient SET ${fields.join(", ")} WHERE id = ? AND deleted_at IS NULL RETURNING *`
    values.push(id)
    const result = await sharedContext.manager.execute(sql, values)
    return result[0]
  }

  @InjectManager()
  async deleteIngredient(
    id: string,
    @MedusaContext() sharedContext?: Context<EntityManager>
  ) {
    if (!sharedContext?.manager) {
      throw new Error("EntityManager is not available in context")
    }
    // Soft delete: set deleted_at
    const result = await sharedContext.manager.execute(
      `UPDATE ingredient SET deleted_at = now(), updated_at = now() WHERE id = ? AND deleted_at IS NULL RETURNING *`,
      [id]
    )
    return result[0]
  }
}

export default IngredientModuleService 