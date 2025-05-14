import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, AdminOrder } from "@medusajs/framework/types"
import { Container, Heading, Table, Text } from "@medusajs/ui"

const OrderIngredientsWidget = ({ data }: DetailWidgetProps<AdminOrder>) => (
  <Container>
    <Heading level="h2" className="mb-4">Ingredients per Product</Heading>
    <Table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Ingredients</th>
        </tr>
      </thead>
      <tbody>
        {data.items.map((item: any) => (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>
              {Array.isArray(item.metadata?.ingredients) && item.metadata.ingredients.length > 0 ? (
                <ul>
                  {item.metadata.ingredients.map((ing: any) => (
                    <li key={ing.id}>
                      {ing.name}
                      {ing.grams ? ` (${ing.grams}g)` : ""}
                    </li>
                  ))}
                </ul>
              ) : (
                <Text>No custom ingredients</Text>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Container>
)

export const config = defineWidgetConfig({
  zone: "order.details.after",
})

export default OrderIngredientsWidget 