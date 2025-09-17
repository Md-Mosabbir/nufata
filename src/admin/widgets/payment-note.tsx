import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text } from "@medusajs/ui"
import { DetailWidgetProps, AdminOrder } from "@medusajs/framework/types"

const OrderPaymentMethodWidget = ({ data: order }: DetailWidgetProps<AdminOrder>) => {
  const paymentOption = order.metadata?.manual_payment_option

  // Only show the widget if the field exists
  if (!paymentOption) {
    return <></>
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Payment Method Used</Heading>
      </div>
      <div className="px-6 py-4">
        <Text size="large" weight="plus">
          {paymentOption === "bkash"
            ? "Bkash was used for payment"
            : "Cash on Delivery (COD) was used for payment"}
        </Text>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.side.after",
})

export default OrderPaymentMethodWidget
