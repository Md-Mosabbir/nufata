import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "zod"
import { randomBytes } from "crypto"

const ResetPasswordSchema = z.object({
  identifier: z.string().email(),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { identifier } = ResetPasswordSchema.parse(req.body)
  // 1. Find admin user by email (in-memory filter for compatibility)
  const query = req.scope.resolve("query")
  const result = await query.graph({
    entity: "user",
    fields: ["id", "email", "metadata"],
  })
  const admin = result?.data?.find((u: any) => u.email === identifier)
  if (!admin) {
    return res.status(200).json({ message: "If the email exists, a reset link will be sent." })
  }
  // 2. Generate token
  const token = randomBytes(32).toString("hex")
  // 3. Store token in metadata (update admin)
  const manager = req.scope.resolve("manager")
  await manager.nativeUpdate(
    "user",
    { id: admin.id },
    {
      metadata: {
        ...admin.metadata,
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
    actor_type: "user",
  })
  res.status(200).json({ message: "If the email exists, a reset link will be sent." })
}

// This route is intentionally removed. Use Medusa's built-in /auth/user/emailpass/reset-password endpoint for admin password reset.
