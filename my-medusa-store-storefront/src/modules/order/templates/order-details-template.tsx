"use client"

import { XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import React, { useState } from "react"
import { cancelOrder } from "@lib/data/orders"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)



  const handleCancel = async () => {
    setLoading(true)
    setError(null)
    const res = await cancelOrder(order.id)
    setLoading(false)
    if (res.success) {
      setSuccess(true)
      window.location.reload()
    } else {
      setError(res.error || "Failed to cancel order.")
    }
  }

  return (
    <div className="flex flex-col justify-center gap-y-4">
      <div className="flex gap-2 justify-between items-center">
        <h1 className="text-2xl-semi">Order details</h1>
        <LocalizedClientLink
          href="/account/orders"
          className="flex gap-2 items-center text-ui-fg-subtle hover:text-ui-fg-base"
          data-testid="back-to-overview-button"
        >
          <XMark /> Back to overview
        </LocalizedClientLink>
      </div>
      <div
        className="flex flex-col gap-4 h-full bg-white w-full"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />
        <Items order={order} />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />
        {order.status === "pending" && order.fulfillment_status !== "delivered" && !success && (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleCancel}
            disabled={loading}
          >
            {loading ? "Cancelling..." : "Cancel Order"}
          </button>
        )}
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">Order cancelled.</div>}
        <Help />
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
