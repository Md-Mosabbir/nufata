import type {
  SubscriberArgs,
  SubscriberConfig,
} from "@medusajs/framework"
import { sendOrderStatusUpdateWorkflow } from "../workflows/send-order-status-update"

const getStatusFromEvent = (eventName: string): string => {
  switch (eventName) {
    case "order.updated":
      return "updated"
    case "order.placed":
      return "placed"
    case "order.canceled":
      return "canceled"
    case "order.completed":
      return "completed"
    case "order.fulfillment_created":
      return "fulfilled"
    case "order.fulfillment_canceled":
      return "fulfillment_canceled"


    default:
      return eventName.split(".")[1] || "updated"
  }
}

export default async function orderStatusUpdateHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  const status = getStatusFromEvent(event.name)

  await sendOrderStatusUpdateWorkflow(container)
    .run({
      input: {
        id: event.data.id,
        status
      }
    })
}

export const config: SubscriberConfig = {
  event: [
    "order.updated",
    "order.placed",
    "order.canceled",
    "order.completed",
    "order.fulfillment_created",
    "order.fulfillment_canceled",

  ]
} 