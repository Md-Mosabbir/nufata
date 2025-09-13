// src/admin/widgets/order-ingredients-widget.tsx
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, AdminOrder } from "@medusajs/framework/types"
import { Container, Heading, Text } from "@medusajs/ui"
import { Table as UiTable } from "@medusajs/ui"

const OrderIngredientsWidget = ({ data }: DetailWidgetProps<AdminOrder>) => {
  const items = data.items || []
  if (!items.length) return null

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Ingredients per Product</Heading>
      </div>

      <div className="px-6 py-4">
        <UiTable>
          <UiTable.Header>
            <UiTable.Row>
              <UiTable.HeaderCell>Product</UiTable.HeaderCell>
              <UiTable.HeaderCell>Variant</UiTable.HeaderCell>
              <UiTable.HeaderCell>Ingredients</UiTable.HeaderCell>
            </UiTable.Row>
          </UiTable.Header>

          <UiTable.Body>
            {items.map((item) => {
              const ingredients = Array.isArray(item.metadata?.ingredients)
                ? (item.metadata!.ingredients as any[])
                : []

              return (
                <UiTable.Row key={item.id}>
                  <UiTable.Cell>
                    <Text className="txt-compact-medium">{item.title}</Text>
                    <Text className="text-ui-fg-subtle txt-small">Qty: {item.quantity}</Text>
                  </UiTable.Cell>
                  <UiTable.Cell>
                    <Text className="text-ui-fg-subtle txt-small">
                      {item.variant?.options?.map((o) => o.value).join(" · ") || "—"}
                    </Text>
                  </UiTable.Cell>
                  <UiTable.Cell>
                    {ingredients.length ? (
                      <div className="flex flex-wrap gap-2">
                        {ingredients.map((ing: any, i: number) => (
                          <span
                            key={ing.id ?? i}
                            className="rounded bg-ui-bg-field px-2 py-1 text-ui-fg-subtle txt-compact-small"
                          >
                            {ing.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <Text className="text-ui-fg-subtle txt-small">No custom ingredients</Text>
                    )}
                  </UiTable.Cell>
                </UiTable.Row>
              )
            })}
          </UiTable.Body>
        </UiTable>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.after",
})

export default OrderIngredientsWidget
