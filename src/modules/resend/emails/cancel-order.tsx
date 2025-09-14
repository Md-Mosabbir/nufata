import {
  Text,
  Column,
  Container,
  Heading,
  Html,
  Section,
  Tailwind,
  Head,
  Preview,
  Body,
  Row,
} from "@react-email/components"
import { CustomerDTO, OrderDTO } from "@medusajs/framework/types"

type OrderCancelledEmailProps = {
  order: OrderDTO & {
    customer: CustomerDTO
  }
  isAdmin?: boolean
}

/* ------------------------
   Reusable Components
-------------------------*/

function AdminBanner() {
  return (
    <Section className="bg-red-500 text-white px-6 py-2 text-center font-bold uppercase tracking-wider">
      ❌ Admin Cancellation Notification ❌
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

function EmailMessage({ isAdmin, order }: { isAdmin?: boolean; order: OrderDTO }) {
  return (
    <Container className="p-6">
      <Heading className="text-2xl font-bold text-center text-[#b91c1c]">
        {isAdmin
          ? `Order #${order.display_id} Has Been Cancelled`
          : `Your Order Has Been Cancelled`}
      </Heading>
      <Text className="text-center text-gray-700 mt-2">
        {isAdmin
          ? "This order has been cancelled. Please review the details below."
          : "We’re sorry to inform you that your order has been cancelled. If you have any questions, please contact us."}
      </Text>
    </Container>
  )
}

function OrderInfo({ order }: { order: OrderDTO }) {
  return (
    <Section className="mt-8">
      <Heading className="text-xl font-semibold text-gray-800 mb-4">
        Order Information
      </Heading>
      <Row className="text-gray-600">
        <Column className="w-1/2">
          <Text className="m-0">Order ID</Text>
        </Column>
        <Column className="w-1/2 text-right">
          <Text className="m-0">#{order.display_id}</Text>
        </Column>
      </Row>
    </Section>
  )
}

function CustomerInfo({ order }: { order: OrderDTO & { customer: CustomerDTO } }) {
  return (
    <Section className="mt-8">
      <Heading className="text-xl font-semibold text-gray-800 mb-4">
        Customer Information
      </Heading>
      <Row className="text-gray-600">
        <Column className="w-1/2"><Text>Name</Text></Column>
        <Column className="w-1/2 text-right">
          <Text>{order.customer?.first_name} {order.customer?.last_name}</Text>
        </Column>
      </Row>
      <Row className="text-gray-600">
        <Column className="w-1/2"><Text>Email</Text></Column>
        <Column className="w-1/2 text-right"><Text>{order.email}</Text></Column>
      </Row>
    </Section>
  )
}

function EmailFooter({ isAdmin, order }: { isAdmin?: boolean; order: OrderDTO }) {
  return (
    <Section className="bg-[#fee2e2] p-6 mt-10 rounded-b">
      <Text className="text-center text-[#b91c1c] text-sm">
        {isAdmin
          ? "This is an automated cancellation notification for administrators of NUFATA'S."
          : "If you have any questions, feel free to message us on our Facebook page."}
      </Text>
      <Text className="text-center text-[#a16207] text-sm">
        Order Token: {order.id}
      </Text>
      <Text className="text-center text-[#a3a3a3] text-xs mt-4">
        © {new Date().getFullYear()} NUFATA'S — Homemade Pithas & Desserts from the heart of Bangladesh.
      </Text>
    </Section>
  )
}

/* ------------------------
   Main Component
-------------------------*/

function OrderCancelledEmailComponent({ order, isAdmin }: OrderCancelledEmailProps) {
  return (
    <Tailwind>
      <Html className="font-sans bg-[#fef2f2]">
        <Head />
        <Preview>
          {isAdmin
            ? `Order #${order.display_id} Has Been Cancelled (Admin)`
            : "Your Order from NUFATA'S Has Been Cancelled"}
        </Preview>
        <Body className="bg-white my-10 mx-auto w-full max-w-2xl rounded shadow-md border border-[#fca5a5]">
          {isAdmin && <AdminBanner />}
          <EmailHeader />
          <EmailMessage isAdmin={isAdmin} order={order} />

          <Container className="px-6">
            <OrderInfo order={order} />
            {isAdmin && <CustomerInfo order={order} />}
          </Container>

          <EmailFooter isAdmin={isAdmin} order={order} />
        </Body>
      </Html>
    </Tailwind>
  )
}

export const orderCancelledEmail = (props: OrderCancelledEmailProps) => (
  <OrderCancelledEmailComponent {...props} />
)
