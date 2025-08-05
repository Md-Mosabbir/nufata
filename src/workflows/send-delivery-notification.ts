import { 
  createWorkflow, 
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { sendNotificationStep } from "./steps/send-notification"

type WorkflowInput = {
  id: string
}

export const sendDeliveryNotificationWorkflow = createWorkflow(
  "send-delivery-notification",
  ({ id }: WorkflowInput) => {
    // Get the order details directly
    // @ts-ignore
    const { data: fulfillments} = useQueryGraphStep({
      entity: "fulfillment",
      fields: [
        "id",
        "order.id",
        "order.email",
        "order.display_id",
        "order.customer.*",
        "order.shipping_address.*",
        "order.fulfillments.*"
      ],
      filters: {
        id,
      },
    })
 const fulfillment = fulfillments[0]
    const order = fulfillment.order


    const notifications = [
      {
        to: order?.email as string,
        channel: "email",
        template: "delivery-created",
        data: {
          order
        },
      },
      {
        to: process.env.ADMIN_EMAIL || "admin@example.com",
        channel: "email",
        template: "delivery-created",
        data: {
          order: order,
          isAdmin: true,
        },
      }
    ]

    const notification = sendNotificationStep(notifications)

    return new WorkflowResponse(notification)
  }
) 