import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import { cancelOrderWorkflow } from "@medusajs/medusa/core-flows"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const orderId = req.params.id

  const logger = req.scope.resolve("logger") // Medusa Logger [[Logging](https://docs.medusajs.com/learn/debugging-and-testing/logging)]

  try {
    logger.info(`Cancel order request received. order_id=${orderId}`)

    // 1) Cancel the order
    const { result } = await cancelOrderWorkflow(req.scope).run({
      input: { order_id: orderId },
    })
    logger.info(`Order canceled via workflow. order_id=${orderId}`)

    // 2) Fetch order for email + template data
    const query = req.scope.resolve("query")
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
      logger.warn(`Order not in canceled state after workflow. order_id=${orderId}`)
      return res.status(400).json({ success: false, message: "Order is not canceled." })
    }

    // 3) Send notifications
    const notificationModuleService = req.scope.resolve(Modules.NOTIFICATION)

    // Customer email
    if (order.email) {
      try {
        await notificationModuleService.createNotifications({
          to: order.email,
          channel: "email",
          template: "order-cancel",
          data: { order, isAdmin: false },
        })
        logger.info(`Cancellation email sent to customer. order_id=${orderId} to=${order.email}`)
      } catch (err) {
        logger.warn(`Failed to send customer cancellation email. order_id=${orderId} error=${(err as Error).message}`)
      }
    } else {
      logger.warn(`Order has no email; skipping customer notification. order_id=${orderId}`)
    }

    // Admin email
    if (process.env.ADMIN_EMAIL) {
      try {
        await notificationModuleService.createNotifications({
          to: process.env.ADMIN_EMAIL,
          channel: "email",
          template: "order-cancel",
          data: { order, isAdmin: true },
        })
        logger.info(`Cancellation email sent to admin. order_id=${orderId} to=${process.env.ADMIN_EMAIL}`)
      } catch (err) {
        logger.warn(`Failed to send admin cancellation email. order_id=${orderId} error=${(err as Error).message}`)
      }
    } else {
      logger.warn(`ADMIN_EMAIL not set; skipping admin notification. order_id=${orderId}`)
    }

    return res.send(result)
  } catch (e) {
    logger.error(`Cancel order failed. order_id=${orderId} error=${(e as Error).message}`)
    return res.status(500).json({ success: false, message: "Failed to cancel order." })
  }
}
