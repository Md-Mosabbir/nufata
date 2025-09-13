import {
  Text,
  Column,
  Container,
  Heading,
  Html,
  Row,
  Section,
  Tailwind,
  Head,
  Preview,
  Body,
} from "@react-email/components"
import { BigNumberValue, CustomerDTO, OrderDTO } from "@medusajs/framework/types"

type OrderStatusUpdateEmailProps = {
  order: OrderDTO & {
    customer: CustomerDTO
  }
  status: string
  isAdmin?: boolean
}

/* ------------------------
   Utility Helpers
-------------------------*/

function usePriceFormatter(currency: string) {
  const formatter = new Intl.NumberFormat([], {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    currency,
  })

  return (price: BigNumberValue) => {
    if (typeof price === "number") return formatter.format(price)
    if (typeof price === "string") return formatter.format(parseFloat(price))
    return price?.toString() || ""
  }
}

function getStatusMessage(status: string) {
  switch (status) {
    case "updated": return "Your order status has been updated!"
    case "canceled": return "Your order has been canceled"
    default: return `Your order status has been updated to ${status}`
  }
}

/* ------------------------
   Reusable Components
-------------------------*/

function AdminBanner() {
  return (
    <Section className="bg-yellow-500 text-black px-6 py-2 text-center font-bold uppercase tracking-wider">
      🚨 Admin Notification 🚨
    </Section>
  )
}

function EmailHeader() {
  return (
    <Section className="bg-[#b91c1c] text-white px-6 py-4">
      <Heading className="text-xl font-bold tracking-wide">NUFATA'S</Heading>
    </Section>
  )
}

function EmailMessage({ isAdmin, order, status }: { isAdmin?: boolean; order: OrderDTO; status: string }) {
  return (
    <Container className="p-6">
      <Heading className="text-2xl font-bold text-center text-[#b91c1c]">
        {isAdmin
          ? `Order #${order.display_id} Status Update: ${status}`
          : `Order Status Update: ${status}`}
      </Heading>
      <Text className="text-center text-gray-700 mt-2">
        {isAdmin
          ? `Order status has been updated to ${status}`
          : getStatusMessage(status)}
      </Text>
    </Container>
  )
}

function OrderSummary({ order, formatPrice }: { order: OrderDTO; formatPrice: (p: BigNumberValue) => string }) {
  return (
    <Section className="mt-8">
      <Heading className="text-xl font-semibold text-[#15803d] mb-4">
        Order Summary
      </Heading>
      <Row className="text-gray-700">
        <Column className="w-1/2"><Text className="m-0">Order ID</Text></Column>
        <Column className="w-1/2 text-right"><Text className="m-0">#{order.display_id}</Text></Column>
      </Row>
      <Row className="text-gray-700">
        <Column className="w-1/2"><Text className="m-0">Total</Text></Column>
        <Column className="w-1/2 text-right"><Text className="m-0">{formatPrice(order.total)}</Text></Column>
      </Row>
    </Section>
  )
}

function CustomerInfo({ order }: { order: OrderDTO & { customer: CustomerDTO } }) {
  return (
    <Section className="mt-8">
      <Heading className="text-xl font-semibold text-[#15803d] mb-4">
        Customer Information
      </Heading>
      <Row className="text-gray-700">
        <Column className="w-1/2"><Text>Name</Text></Column>
        <Column className="w-1/2 text-right">
          <Text>{order.customer?.first_name} {order.customer?.last_name}</Text>
        </Column>
      </Row>
      <Row className="text-gray-700">
        <Column className="w-1/2"><Text>Email</Text></Column>
        <Column className="w-1/2 text-right"><Text>{order.email}</Text></Column>
      </Row>
    </Section>
  )
}

function EmailFooter({ isAdmin, order }: { isAdmin?: boolean; order: OrderDTO }) {
  return (
    <Section className="bg-[#fef3c7] p-6 mt-10 rounded-b">
      <Text className="text-center text-[#92400e] text-sm">
        {isAdmin
          ? "Automated status update from NUFATA'S admin panel."
          : "If you have any questions, reply to this email or reach out to our Facebook page"}
      </Text>
      <Text className="text-center text-[#a16207] text-sm">
        Order Token: {order.id}
      </Text>
      <Text className="text-center text-[#a3a3a3] text-xs mt-4">
        © {new Date().getFullYear()} NUFATA'S — Homemade Pithas & Desserts. Crafted with love in Bangladesh.
      </Text>
    </Section>
  )
}

/* ------------------------
   Main Component
-------------------------*/

function OrderStatusUpdateEmailComponent({ order, status, isAdmin }: OrderStatusUpdateEmailProps) {
  const formatPrice = usePriceFormatter(order.currency_code)

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
          {isAdmin && <AdminBanner />}
          <EmailHeader />
          <EmailMessage isAdmin={isAdmin} order={order} status={status} />

          <Container className="px-6">
            <OrderSummary order={order} formatPrice={formatPrice} />
            {isAdmin && <CustomerInfo order={order} />}
          </Container>

          <EmailFooter isAdmin={isAdmin} order={order} />
        </Body>
      </Html>
    </Tailwind>
  )
}

export const orderStatusUpdateEmail = (props: OrderStatusUpdateEmailProps) => (
  <OrderStatusUpdateEmailComponent {...props} />
)
