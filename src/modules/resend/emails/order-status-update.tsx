import {
  Text,
  Column,
  Container,
  Heading,
  Html,
  Img,
  Row,
  Section,
  Tailwind,
  Head,
  Preview,
  Body,
  Link
} from "@react-email/components"
import { BigNumberValue, CustomerDTO, OrderDTO } from "@medusajs/framework/types"

type OrderStatusUpdateEmailProps = {
  order: OrderDTO & {
    customer: CustomerDTO
  }
  status: string
  isAdmin?: boolean
}

function OrderStatusUpdateEmailComponent({ order, status, isAdmin }: OrderStatusUpdateEmailProps) {
  const formatter = new Intl.NumberFormat([], {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    currency: order.currency_code,
  })

  const formatPrice = (price: BigNumberValue) => {
    if (typeof price === "number") return formatter.format(price)
    if (typeof price === "string") return formatter.format(parseFloat(price))
    return price?.toString() || ""
  }

  const getStatusMessage = () => {
    switch (status) {
      case "updated": return "Your order status has been updated!"
      case "placed": return "Your order has been placed successfully!"
      case "completed": return "Your order has been completed!"
      case "fulfilled": return "Your order has been fulfilled and is on its way!"
      case "fulfillment_canceled": return "The fulfillment of your order has been canceled"
      case "canceled": return "Your order has been canceled"
      default: return `Your order status has been updated to ${status}`
    }
  }

  return (
    <Tailwind>
      <Html className="font-sans bg-[#fdf6ec]">
        <Head />
        <Preview>
          {isAdmin
            ? `Order #${order.display_id} Update from NUFATA'S`
            : `NUFATA'S Order ${status}`}
        </Preview>
        <Body className="bg-white my-10 mx-auto w-full max-w-2xl rounded shadow-lg border border-[#facc15]">
          {/* Header */}
          <Section className="bg-[#b91c1c] text-white px-6 py-4 flex items-center gap-2">
            <Heading className="text-xl font-bold tracking-wide">
              NUFATA'S
            </Heading>
          </Section>

          {/* Message */}
          <Container className="p-6">
            <Heading className="text-2xl font-bold text-center text-[#b91c1c]">
              {isAdmin
                ? `Order #${order.display_id} Status Update: ${status}`
                : `Order Status Update: ${status}`}
            </Heading>
            <Text className="text-center text-gray-700 mt-2">
              {isAdmin
                ? `Order status has been updated to ${status}`
                : getStatusMessage()}
            </Text>
          </Container>

          {/* Order Summary */}
          <Container className="px-6">
            <Section className="mt-8">
              <Heading className="text-xl font-semibold text-[#15803d] mb-4">
                Order Summary
              </Heading>
              <Row className="text-gray-700">
                <Column className="w-1/2">
                  <Text className="m-0">Order ID</Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text className="m-0">#{order.display_id}</Text>
                </Column>
              </Row>
              <Row className="text-gray-700">
                <Column className="w-1/2">
                  <Text className="m-0">Total</Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text className="m-0">{formatPrice(order.total)}</Text>
                </Column>
              </Row>
            </Section>

            {/* Customer Info (admin only) */}
            {isAdmin && (
              <Section className="mt-8">
                <Heading className="text-xl font-semibold text-[#15803d] mb-4">
                  Customer Information
                </Heading>
                <Row className="text-gray-700">
                  <Column className="w-1/2">
                    <Text className="m-0">Name</Text>
                  </Column>
                  <Column className="w-1/2 text-right">
                    <Text className="m-0">
                      {order.customer?.first_name} {order.customer?.last_name}
                    </Text>
                  </Column>
                </Row>
                <Row className="text-gray-700">
                  <Column className="w-1/2">
                    <Text className="m-0">Email</Text>
                  </Column>
                  <Column className="w-1/2 text-right">
                    <Text className="m-0">{order.email}</Text>
                  </Column>
                </Row>
              </Section>
            )}
          </Container>

          {/* Footer */}
          <Section className="bg-[#fef3c7] p-6 mt-10 rounded-b">
            <Text className="text-center text-[#92400e] text-sm">
              {isAdmin
                ? "Automated status update from NUFATA'S admin panel."
                : "If you have any questions, reply to this email or reach out to our facebook page"}
            </Text>
            <Text className="text-center text-[#a16207] text-sm">
              Order Token: {order.id}
            </Text>
            <Text className="text-center text-[#a3a3a3] text-xs mt-4">
              © {new Date().getFullYear()} NUFATA'S — Homemade Pithas & Desserts. Crafted with love in Bangladesh.
            </Text>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  )
}

export const orderStatusUpdateEmail = (props: OrderStatusUpdateEmailProps) => (
  <OrderStatusUpdateEmailComponent {...props} />
)
