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
    if (typeof price === "number") {
      return formatter.format(price)
    }

    if (typeof price === "string") {
      return formatter.format(parseFloat(price))
    }

    return price?.toString() || ""
  }

  const getStatusMessage = () => {
    switch (status) {
      case "updated":
        return "Your order status has been updated!"
      case "placed":
        return "Your order has been placed successfully!"
      case "completed":
        return "Your order has been completed!"
      case "fulfilled":
        return "Your order has been fulfilled and is on its way!"
      case "fulfillment_canceled":
        return "The fulfillment of your order has been canceled"

     
      case "canceled":
        return "Your order has been canceled"
      default:
        return `Your order status has been updated to ${status}`
    }
  }

  return (
    <Tailwind>
      <Html className="font-sans bg-gray-100">
        <Head />
        <Preview>
          {isAdmin 
            ? `Order #${order.display_id} Status Update: ${status}` 
            : `Order ${status}`}
        </Preview>
        <Body className="bg-white my-10 mx-auto w-full max-w-2xl">
          {/* Header */}
          <Section className="bg-[#27272a] text-white px-6 py-4">
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.2447 3.92183L12.1688 1.57686C10.8352 0.807712 9.20112 0.807712 7.86753 1.57686L3.77285 3.92183C2.45804 4.69098 1.63159 6.11673 1.63159 7.63627V12.345C1.63159 13.8833 2.45804 15.2903 3.77285 16.0594L7.84875 18.4231C9.18234 19.1923 10.8165 19.1923 12.15 18.4231L16.2259 16.0594C17.5595 15.2903 18.3672 13.8833 18.3672 12.345V7.63627C18.4048 6.11673 17.5783 4.69098 16.2447 3.92183ZM10.0088 14.1834C7.69849 14.1834 5.82019 12.3075 5.82019 10C5.82019 7.69255 7.69849 5.81657 10.0088 5.81657C12.3191 5.81657 14.2162 7.69255 14.2162 10C14.2162 12.3075 12.3379 14.1834 10.0088 14.1834Z" fill="currentColor"></path></svg>
          </Section>

          {/* Message */}
          <Container className="p-6">
            <Heading className="text-2xl font-bold text-center text-gray-800">
              {isAdmin 
                ? `Order #${order.display_id} Status Update: ${status}`
                : `Order Status Update: ${status}`}
            </Heading>
            <Text className="text-center text-gray-600 mt-2">
              {isAdmin
                ? `Order status has been updated to ${status}`
                : getStatusMessage()}
            </Text>
          </Container>

          {/* Order Summary */}
          <Container className="px-6">
            <Section className="mt-8">
              <Heading className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </Heading>
              <Row className="text-gray-600">
                <Column className="w-1/2">
                  <Text className="m-0">Order ID</Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text className="m-0">#{order.display_id}</Text>
                </Column>
              </Row>
              <Row className="text-gray-600">
                <Column className="w-1/2">
                  <Text className="m-0">Total</Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text className="m-0">{formatPrice(order.total)}</Text>
                </Column>
              </Row>
            </Section>

            {/* Customer Information - Only show for admin */}
            {isAdmin && (
              <Section className="mt-8">
                <Heading className="text-xl font-semibold text-gray-800 mb-4">
                  Customer Information
                </Heading>
                <Row className="text-gray-600">
                  <Column className="w-1/2">
                    <Text className="m-0">Name</Text>
                  </Column>
                  <Column className="w-1/2 text-right">
                    <Text className="m-0">
                      {order.customer?.first_name} {order.customer?.last_name}
                    </Text>
                  </Column>
                </Row>
                <Row className="text-gray-600">
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
          <Section className="bg-gray-50 p-6 mt-10">
            <Text className="text-center text-gray-500 text-sm">
              {isAdmin
                ? "This is an automated notification for an order status update."
                : "If you have any questions, reply to this email or contact our support team at support@medusajs.com."}
            </Text>
            <Text className="text-center text-gray-500 text-sm">
              Order Token: {order.id}
            </Text>
            <Text className="text-center text-gray-400 text-xs mt-4">
              © {new Date().getFullYear()} Medusajs, Inc. All rights reserved.
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