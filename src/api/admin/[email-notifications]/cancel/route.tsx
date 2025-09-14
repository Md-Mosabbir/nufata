import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

type CancelEmailReq = {
  orderId: string
  customerEmail: string
}

export const POST = async (req: MedusaRequest<CancelEmailReq>, res: MedusaResponse) => {
  const { orderId, customerEmail } = req.body

  const query = req.scope.resolve("query")
  const notificationModuleService = req.scope.resolve(Modules.NOTIFICATION)

  const { data: [order] } = await query.graph({
    entity: "order",
    fields: [
      "id",
      "display_id",
      "created_at",
      "currency_code",
      "total",
      "email",
      "status",
      "items.*",
      "items.variant.*",
      "items.variant.product.*",
      "shipping_address.*",
      "billing_address.*",
      "shipping_methods.*",
      "tax_total",
      "subtotal",
      "discount_total",
    ],
    filters: { id: orderId },
  })

  if (!order || order.status !== "canceled") {
    return res.status(400).json({ success: false, message: "Order is not canceled." })
  }

  await notificationModuleService.createNotifications({
    to: customerEmail,
    channel: "email",
    template: "order-cancel",
    data: { order, isAdmin: false },
  })

  await notificationModuleService.createNotifications({
    to: process.env.ADMIN_EMAIL || "",
    channel: "email",
    template: "order-cancel",
    data: { order, isAdmin: true },
  })

  res.status(200).json({ success: true })
}