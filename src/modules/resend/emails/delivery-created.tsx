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

type DeliveryCreatedEmailProps = {
  order: OrderDTO & {
    customer: CustomerDTO
  }
  isAdmin?: boolean
}

function DeliveryCreatedEmailComponent({ order, isAdmin }: DeliveryCreatedEmailProps) {
  return (
    <Tailwind>
      <Html className="font-sans bg-[#fdf6ec]">
        <Head />
        <Preview>
          {isAdmin
            ? `Order #${order.display_id} Has Been Delivered`
            : "Your Order from NUFATA'S Has Been Delivered!"}
        </Preview>
        <Body className="bg-white my-10 mx-auto w-full max-w-2xl rounded shadow-md border border-[#facc15]">
          {/* Header */}
          <Section className="bg-[#b91c1c] text-white px-6 py-4">
            <Heading className="text-xl font-bold tracking-wide">
              NUFATA'S
            </Heading>
          </Section>

          {/* Message */}
          <Container className="p-6">
            <Heading className="text-2xl font-bold text-center text-[#b91c1c]">
              {isAdmin
                ? `Order #${order.display_id} Has Been Delivered`
                : `Your Order Has Been Delivered!`}
            </Heading>
            <Text className="text-center text-gray-700 mt-2">
              {isAdmin
                ? `The order has been delivered to the customer.`
                : `Great news! Your order has arrived. We hope you enjoy the delicious taste of NUFATA'S!`}
            </Text>
          </Container>

          {/* Order Information */}
          <Container className="px-6">
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

            {/* Admin-only: Customer Info */}
            {isAdmin && (
              <Section className="mt-8">
                <Heading className="text-xl font-semibold text-gray-800 mb-4">
                  Customer Information
                </Heading>
                <Row className="text-gray-600">
                  <Column className="w-1/2"><Text className="m-0">Name</Text></Column>
                  <Column className="w-1/2 text-right">
                    <Text className="m-0">
                      {order.customer?.first_name} {order.customer?.last_name}
                    </Text>
                  </Column>
                </Row>
                <Row className="text-gray-600">
                  <Column className="w-1/2"><Text className="m-0">Email</Text></Column>
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
                ? "This is an automated delivery notification from NUFATA'S."
                : "If you have any questions, feel free to message us on our Facebook page."}
            </Text>
            <Text className="text-center text-[#a16207] text-sm">
              Order Token: {order.id}
            </Text>
            <Text className="text-center text-[#a3a3a3] text-xs mt-4">
              © {new Date().getFullYear()} NUFATA'S — Homemade Pithas & Desserts from the heart of Bangladesh.
            </Text>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  )
}

export const deliveryCreatedEmail = (props: DeliveryCreatedEmailProps) => (
  <DeliveryCreatedEmailComponent {...props} />
)
