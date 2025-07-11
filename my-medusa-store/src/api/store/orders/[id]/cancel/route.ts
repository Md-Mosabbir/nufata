import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { cancelOrderWorkflow } from "@medusajs/medusa/core-flows"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const orderId = req.params.id
  console.log("scope", req.scope.resolve("product"))
 
  const { result } = await cancelOrderWorkflow(req.scope).run({
    input: { order_id: orderId }
  })
  res.send(result)
}