import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "zod"

const ResetPasswordConfirmSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { email, password } = ResetPasswordConfirmSchema.parse(req.body)
  // 1. Get token from Authorization header
  let authHeader = req.headers["authorization"] || req.headers["Authorization"]
  if (Array.isArray(authHeader)) authHeader = authHeader[0]
  if (!authHeader || typeof authHeader !== "string" || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Missing or invalid token." })
  }
  const token = authHeader.slice(7).trim()
  // 2. Find customer by email (in-memory filter only, for compatibility)
  const query = req.scope.resolve("query")
  const result = await query.graph({
    entity: "customer",
    fields: ["id", "email", "metadata"],
  })
  const customer = result?.data?.find((c: any) => c.email === email)
  if (!customer || customer.metadata?.password_reset_token !== token) {
    return res.status(400).json({ message: "Invalid or expired token." })
  }
  // 3. Update password and remove token
  const manager = req.scope.resolve("manager") as any
  await manager.nativeUpdate(
    "customer",
    { id: customer.id },
    {
      password,
      metadata: {
        ...customer.metadata,
        password_reset_token: undefined,
        password_reset_token_created_at: undefined,
      },
    }
  )
  res.status(200).json({ message: "Password has been reset." })
}
