import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
type DeliveryEmailReq = {
  orderId: string
  customerEmail: string
}


export const POST = async (req: MedusaRequest<DeliveryEmailReq>, res: MedusaResponse) => {
	const { orderId, customerEmail } = req.body

	// Resolve the Query and Notification Module services
	const query = req.scope.resolve("query")
	const notificationModuleService = req.scope.resolve(Modules.NOTIFICATION)

	// Fetch the full order object
	const { data: [order] } = await query.graph({
		entity: "order",
		fields: [
			"id",
			"display_id",
			"created_at",
			"currency_code",
			"total",
			"email",
			"items.*",
			"items.variant.*",
			"items.variant.product.*",
			"shipping_address.*",
			"billing_address.*",
			"shipping_methods.*",
			"tax_total",
			"subtotal",
			"discount_total",
			// add any other fields your template needs
		],
		filters: { id: orderId },
	})

	// Send to customer
	await notificationModuleService.createNotifications({
		to: customerEmail,
		channel: "email",
		template: "delivery-created", // Your template ID
		data: { order, isAdmin: false },
	})

	// Send to admin
	await notificationModuleService.createNotifications({
		to: process.env.ADMIN_EMAIL || "",
		channel: "email",
		template: "delivery-created", // Your template ID
		data: { order, isAdmin: true },
	})

	res.status(200).json({ success: true })
}
