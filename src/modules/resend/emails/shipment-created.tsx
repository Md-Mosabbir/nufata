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

type ShipmentCreatedEmailProps = {
  order: OrderDTO & {
    customer: CustomerDTO
  }
  tracking_number?: string
  tracking_url?: string
  isAdmin?: boolean
}

function ShipmentCreatedEmailComponent({
  order,
  tracking_number,
  tracking_url,
  isAdmin,
}: ShipmentCreatedEmailProps) {
  return (
    <Tailwind>
      <Html className="font-sans bg-[#fdf6ec]">
        <Head />
        <Preview>
          {isAdmin
            ? `Order #${order.display_id} Has Been Shipped`
            : "Your NUFATA’S Order Has Been Shipped!"}
        </Preview>
        <Body className="bg-white my-10 mx-auto w-full max-w-2xl rounded shadow-md border border-[#facc15]">
          {/* Header */}
          <Section className="bg-[#b91c1c] text-white px-6 py-4">
            <Heading className="text-xl font-bold tracking-wide">
              NUFATA’S
            </Heading>
          </Section>

          {/* Message */}
          <Container className="p-6">
            <Heading className="text-2xl font-bold text-center text-[#b91c1c]">
              {isAdmin
                ? `Order #${order.display_id} Has Been Shipped`
                : `Your Order Has Been Shipped!`}
            </Heading>
            <Text className="text-center text-gray-700 mt-2">
              {isAdmin
                ? `The order has been shipped to the customer.`
                : `Yay! Your order is on its way. Get ready to enjoy your homemade pitha or dessert!`}
            </Text>
          </Container>

          {/* Tracking Info */}
          <Container className="px-6">
            <Section className="mt-8">
              <Heading className="text-xl font-semibold text-gray-800 mb-4">
                Tracking Information
              </Heading>
              <Row className="text-gray-600">
                <Column className="w-1/2"><Text className="m-0">Order ID</Text></Column>
                <Column className="w-1/2 text-right"><Text className="m-0">#{order.display_id}</Text></Column>
              </Row>
              {tracking_number && (
                <Row className="text-gray-600">
                  <Column className="w-1/2"><Text className="m-0">Tracking Number</Text></Column>
                  <Column className="w-1/2 text-right"><Text className="m-0">{tracking_number}</Text></Column>
                </Row>
              )}
              {tracking_url && (
                <Row className="text-gray-600">
                  <Column className="w-1/2"><Text className="m-0">Tracking URL</Text></Column>
                  <Column className="w-1/2 text-right">
                    <Text className="m-0">
                      <a href={tracking_url} className="text-blue-600 underline">Track Package</a>
                    </Text>
                  </Column>
                </Row>
              )}
            </Section>

            {/* Admin-only: Customer Info */}
            {isAdmin && (
              <Section className="mt-8">
                <Heading className="text-xl font-semibold text-gray-800 mb-4">
                  Customer Information
                </Heading>
                <Row className="text-gray-600">
                  <Column className="w-1/2"><Text className="m-0">Name</Text></Column>
                  <Column className="w-1/2 text-right">
                    <Text className="m-0">{order.customer?.first_name} {order.customer?.last_name}</Text>
                  </Column>
                </Row>
                <Row className="text-gray-600">
                  <Column className="w-1/2"><Text className="m-0">Email</Text></Column>
                  <Column className="w-1/2 text-right"><Text className="m-0">{order.email}</Text></Column>
                </Row>
              </Section>
            )}
          </Container>

          {/* Footer */}
          <Section className="bg-[#fef3c7] p-6 mt-10 rounded-b">
            <Text className="text-center text-[#92400e] text-sm">
              {isAdmin
                ? "This is an automated shipment notification from NUFATA’S."
                : "If you have any questions, feel free to message us on our Facebook page."}
            </Text>
            <Text className="text-center text-[#a16207] text-sm">
              Order Token: {order.id}
            </Text>
            <Text className="text-center text-[#a3a3a3] text-xs mt-4">
              © {new Date().getFullYear()} NUFATA’S — Homemade Pithas & Desserts from the heart of Bangladesh.
            </Text>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  )
}

export const shipmentCreatedEmail = (props: ShipmentCreatedEmailProps) => (
  <ShipmentCreatedEmailComponent {...props} />
)
