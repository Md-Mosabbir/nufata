import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "zod"
import { randomBytes } from "crypto"

const ResetPasswordSchema = z.object({
  identifier: z.string().email(),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { identifier } = ResetPasswordSchema.parse(req.body)
  // 1. Find customer by email using the query resource
  const query = req.scope.resolve("query")
  const result = await query.graph({
    entity: "customer",
    filters: { email: identifier },
  })
  const customer = result?.data?.[0]
  if (!customer) {
    return res.status(200).json({ message: "If the email exists, a reset link will be sent." })
  }
  // 2. Generate token
  const token = randomBytes(32).toString("hex")
  // 3. Store token in metadata (update customer)
  const manager = req.scope.resolve("manager")
  await manager.nativeUpdate(
    "customer",
    { id: customer.id },
    {
      metadata: {
        ...customer.metadata,
        password_reset_token: token,
        password_reset_token_created_at: new Date().toISOString(),
      },
    }
  )
  // 4. Emit event for notification
  const eventBus = req.scope.resolve("eventBus") as { emit: Function }
  await eventBus.emit("auth.password_reset", {
    entity_id: identifier,
    token,
    actor_type: "customer",
  })
  res.status(200).json({ message: "If the email exists, a reset link will be sent." })
}
