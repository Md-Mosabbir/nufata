import { cancelOrderWorkflow } from "@medusajs/medusa/core-flows"
import { Modules } from "@medusajs/framework/utils"

// Register the hook somewhere during your app's initialization
cancelOrderWorkflow.hooks.orderCanceled(async ({ order }, { container }) => {
  const notificationModuleService = container.resolve(Modules.NOTIFICATION)
  await notificationModuleService.createNotifications({
    to: order.email,
    channel: "email",
    template: "order-cancel", // Your template ID
    data: { order, isAdmin: false },
  })
  // Optionally, send to admin as well
  await notificationModuleService.createNotifications({
    to: process.env.ADMIN_EMAIL || "",
    channel: "email",
    template: "order-cancel",
    data: { order, isAdmin: true },
  })
})
