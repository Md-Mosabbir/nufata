import { 
  createWorkflow, 
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { sendNotificationStep } from "./steps/send-notification"

type WorkflowInput = {
  id: string
  status: string
}

export const sendOrderStatusUpdateWorkflow = createWorkflow(
  "send-order-status-update",
  ({ id, status }: WorkflowInput) => {
    // @ts-ignore
    const { data: orders } = useQueryGraphStep({
      entity: "order",
      fields: [
        "id",
        "display_id",
        "email",
        "currency_code",
        "total",
        "customer.*",
        "shipping_address.*",
      ],
      filters: {
        id,
      },
    })
    
    const notifications = [
      {
        to: orders[0].email as string,
        channel: "email",
        template: "order-status-update",
        data: {
          order: orders[0],
          status,
        },
      },
      {
        to: process.env.ADMIN_EMAIL || "admin@example.com",
        channel: "email",
        template: "order-status-update",
        data: {
          order: orders[0],
          status,
          isAdmin: true,
        },
      }
    ]

    const notification = sendNotificationStep(notifications)

    return new WorkflowResponse(notification)
  }
) 