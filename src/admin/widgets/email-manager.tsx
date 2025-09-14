import { useState } from "react"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Button, Container, StatusBadge, Text } from "@medusajs/ui"
import { DetailWidgetProps, AdminOrder } from "@medusajs/framework/types"

const statusMap: Record<string, { label: string; color: "green" | "blue" | "red" | "orange" | "grey" }> = {
  canceled: { label: "Cancelled", color: "red" },
  shipped: { label: "In Shipping", color: "blue" },
  delivered: { label: "Fulfilled", color: "green" },
  // Add more statuses as needed
}

const NotificationButton = ({
  endpoint,
  label,
  disabled,
  payload,
  successMessage,
  alreadySentMessage,
  variant = "secondary",
}: {
  endpoint: string
  label: string
  disabled?: boolean
  payload: Record<string, any>
  successMessage: string
  alreadySentMessage: string
  variant?: "secondary" | "danger"
}) => {
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleClick = async () => {
    if (disabled) {
      alert(alreadySentMessage)
      return
    }

    setIsSending(true)
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      })
      if (res.ok) {
        alert(successMessage)
        setSent(true)
      } else {
        alert("Failed to send email notification.")
      }
    } catch (e) {
      alert("Error sending email notification.")
    }
    setIsSending(false)
  }

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      disabled={isSending || sent || disabled}
      size="small"
    >
      {sent ? "Email Sent" : label}
    </Button>
  )
}

const FulfillmentNotificationWidget = ({
  data: order,
}: DetailWidgetProps<AdminOrder>) => {
  const shippingMethod =
    order.shipping_methods && order.shipping_methods.length > 0
      ? order.shipping_methods[0].name
      : "N/A"

  // Determine status badge
  const status =
    statusMap[order.status] ||
    statusMap[order.fulfillment_status] ||
    { label: order.status || order.fulfillment_status, color: "grey" }

  return (
    <Container className="divide-y p-0">
      {/* Order Status Section */}
      <div className="flex flex-col items-center justify-center px-6 py-4">
        <Text weight="plus" className="mb-2">
          Order Status
        </Text>
        <StatusBadge color={status.color}>{status.label}</StatusBadge>
      </div>

      {/* Manual Actions Section */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-y-3 items-center">
          <Text size="small">Cancel Order</Text>
          <NotificationButton
            endpoint="/admin/email-notifications/cancel"
            label="Cancel Order"
            // You can add a condition to disable this button if needed, e.g.:
            // disabled={order.status !== "canceled"}
            payload={{
              orderId: order.id,
              customerEmail: order.email,
              shippingMethod,
            }}
            successMessage="Cancel order email sent!"
            alreadySentMessage="Order is not canceled."
            variant="danger"
          />

          <Text size="small">Send Delivery Email</Text>
          <NotificationButton
            endpoint="/admin/email-notifications/delivery"
            label="Send Delivery Email"
            disabled={order.fulfillment_status !== "delivered"}
            payload={{
              orderId: order.id,
              customerEmail: order.email,
              shippingMethod,
            }}
            successMessage="Delivery email sent!"
            alreadySentMessage="Order is NOT delivered yet."
            variant="secondary"
          />

          <Text size="small">Send Shipment Email</Text>
          <NotificationButton
            endpoint="/admin/email-notifications/shipment"
            label="Send Shipment Email"
            disabled={order.fulfillment_status !== "shipped"}
            payload={{
              orderId: order.id,
              customerEmail: order.email,
              shippingMethod,
            }}
            successMessage="Shipment email sent!"
            alreadySentMessage="Order is NOT shipped yet."
            variant="secondary"
          />
        </div>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.side.after",
})

export default FulfillmentNotificationWidget
