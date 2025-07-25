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

type OrderPlacedEmailProps = {
  order: OrderDTO & {
    customer: CustomerDTO
  }
  email_banner?: {
    body: string
    title: string
    url: string
  }
  isAdmin?: boolean
}

function OrderPlacedEmailComponent({ order, email_banner, isAdmin }: OrderPlacedEmailProps) {
  const shouldDisplayBanner = email_banner && "title" in email_banner

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

  return (
    <Tailwind>
      <Html className="font-sans bg-[#fdf6ec]">
        <Head />
        <Preview>
          {isAdmin
            ? `New Order #${order.display_id} Received`
            : "Thank you for your order from NUFATA'S"}
        </Preview>
        <Body className="bg-white my-10 mx-auto w-full max-w-2xl rounded shadow-lg border border-[#facc15]">
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
                ? `New Order #${order.display_id} Received`
                : `Thank you for your order, ${order.customer?.first_name || order.shipping_address?.first_name}`}
            </Heading>
            <Text className="text-center text-gray-700 mt-2">
              {isAdmin
                ? `A new order has been placed by ${order.customer?.first_name || order.shipping_address?.first_name}`
                : "We're processing your order and will notify you when it's ready to enjoy!"}
            </Text>
          </Container>

          {/* Promotional Banner - Customers only */}
          {!isAdmin && shouldDisplayBanner && (
            <Container className="mb-4 rounded-lg p-7" style={{
              background: 'linear-gradient(to right, #facc15, #f59e0b)'
            }}>
              <Section>
                <Row>
                  <Column align="left">
                    <Heading className="text-[#78350f] text-xl font-semibold">
                      {email_banner.title}
                    </Heading>
                    <Text className="text-[#78350f] mt-2">{email_banner.body}</Text>
                  </Column>
                  <Column align="right">
                    <Link href={email_banner.url} className="font-semibold px-2 text-white bg-[#b91c1c] py-1 rounded">
                      Shop Now
                    </Link>
                  </Column>
                </Row>
              </Section>
            </Container>
          )}

          {/* Order Items */}
          <Container className="px-6">
            <Heading className="text-xl font-semibold text-[#15803d] mb-4">
              {isAdmin ? "Order Details" : "Your Items"}
            </Heading>
            <Row>
              <Column>
                <Text className="text-sm m-0 my-2 text-gray-500">Order ID: #{order.display_id}</Text>
              </Column>
            </Row>
            {order.items?.map((item) => (
              <Section key={item.id} className="border-b border-gray-200 py-4">
                <Row>
                  <Column className="w-1/3">
                    <Img
                      src={item.thumbnail ?? ''}
                      alt={item.product_title ?? ''}
                      className="rounded-lg"
                      width="100%"
                    />
                  </Column>
                  <Column className="w-2/3 pl-4">
                    <Text className="text-lg font-semibold text-gray-800">
                      {item.product_title}
                    </Text>
                    <Text className="text-gray-600">{item.variant_title}</Text>
                    <Text className="text-gray-800 mt-2 font-bold">
                      {formatPrice(item.total)}
                    </Text>
                  </Column>
                </Row>
              </Section>
            ))}

            {/* Order Summary */}
            <Section className="mt-8">
              <Heading className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </Heading>
              <Row className="text-gray-600">
                <Column className="w-1/2">
                  <Text className="m-0">Subtotal</Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text className="m-0">{formatPrice(order.item_total)}</Text>
                </Column>
              </Row>
              {order.shipping_methods?.map((method) => (
                <Row className="text-gray-600" key={method.id}>
                  <Column className="w-1/2">
                    <Text className="m-0">{method.name}</Text>
                  </Column>
                  <Column className="w-1/2 text-right">
                    <Text className="m-0">{formatPrice(method.total)}</Text>
                  </Column>
                </Row>
              ))}
              <Row className="text-gray-600">
                <Column className="w-1/2">
                  <Text className="m-0">Tax</Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text className="m-0">{formatPrice(order.tax_total || 0)}</Text>
                </Column>
              </Row>
              <Row className="border-t border-gray-200 mt-4 text-gray-800 font-bold">
                <Column className="w-1/2">
                  <Text>Total</Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text>{formatPrice(order.total)}</Text>
                </Column>
              </Row>
            </Section>

            {/* Customer Information (admin only) */}
            {isAdmin && (
              <Section className="mt-8">
                <Heading className="text-xl font-semibold text-gray-800 mb-4">
                  Customer Information
                </Heading>
                <Row className="text-gray-600">
                  <Column className="w-1/2"><Text className="m-0">Name</Text></Column>
                  <Column className="w-1/2 text-right"><Text className="m-0">{order.customer?.first_name} {order.customer?.last_name}</Text></Column>
                </Row>
                <Row className="text-gray-600">
                  <Column className="w-1/2"><Text className="m-0">Email</Text></Column>
                  <Column className="w-1/2 text-right"><Text className="m-0">{order.email}</Text></Column>
                </Row>
                <Row className="text-gray-600">
                  <Column className="w-1/2"><Text className="m-0">Phone</Text></Column>
                  <Column className="w-1/2 text-right"><Text className="m-0">{order.shipping_address?.phone}</Text></Column>
                </Row>
              </Section>
            )}
          </Container>

          {/* Footer */}
          <Section className="bg-[#fef3c7] p-6 mt-10 rounded-b">
            <Text className="text-center text-[#92400e] text-sm">
              {isAdmin
                ? "New order alert from NUFATA'S. Please prepare for delivery."
                : "Questions? Message us directly on our Facebook page — we’d love to help!"}
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

export const orderPlacedEmail = (props: OrderPlacedEmailProps) => (
  <OrderPlacedEmailComponent {...props} />
)
