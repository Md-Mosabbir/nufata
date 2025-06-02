import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { sendDeliveryNotificationWorkflow } from "../workflows/send-delivery-notification"

export default async function deliveryCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {


  await sendDeliveryNotificationWorkflow(container).run({
    input: {
      id: data.id,
    },
  })
}

export const config: SubscriberConfig = {
  event: "delivery.created",

} 