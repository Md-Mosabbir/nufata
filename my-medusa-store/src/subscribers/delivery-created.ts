import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { sendDeliveryNotificationWorkflow } from "../workflows/send-delivery-notification"

export default async function deliveryCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {

  console.log("=====================================================================Delivery Created Handler")
  console.log("=====================================================================Data:", data)
  console.log("=====================================================================Container:", container)
  // Run the workflow to send the delivery notification
  console.log("=====================================================================Running sendDeliveryNotificationWorkflow")
  await sendDeliveryNotificationWorkflow(container).run({
    input: {
      id: data.id,
    },
  })
}

export const config: SubscriberConfig = {
  event: "delivery.created",

} 