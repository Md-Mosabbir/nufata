import {
  defineMiddlewares,
  authenticate,
  validateAndTransformBody,
  validateAndTransformQuery
} from "@medusajs/framework/http"
import { PostStoreReviewSchema } from "./store/reviews/route"
import { z } from "zod"

import { GetAdminReviewsSchema } from "./admin/reviews/route"
import { PostAdminUpdateReviewsStatusSchema } from "./admin/reviews/status/route"
import { GetStoreReviewsSchema } from "./store/products/[id]/reviews/route"




export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/email-notifications*",
      middlewares: [
        authenticate("user", ["session", "bearer"]),
      ],
    },

    {
      matcher: "/store/reviews",
      method: ["POST"],
      middlewares: [
        authenticate("customer", ["session", "bearer"]),
        validateAndTransformBody(PostStoreReviewSchema)
      ]
    },
    {
      matcher: "/store/products/:id/reviews",
      method: ["GET"],
      middlewares: [
        validateAndTransformQuery(GetStoreReviewsSchema, {
          isList: true,
          defaults: ["id", "rating", "title", "first_name", "last_name", "content", "created_at"]
        })
      ]
    },
    {
      matcher: "/admin/reviews",
      method: ["GET"],
      middlewares: [
        validateAndTransformQuery(GetAdminReviewsSchema, {
          isList: true,
          defaults: [
            "id",
            "title",
            "content",
            "rating",
            "product_id",
            "customer_id",
            "status",
            "created_at",
            "updated_at",
            "product.*",
          ]
        })
      ]
    },
    {
      matcher: "/admin/reviews/status",
      method: ["POST"],
      middlewares: [
        validateAndTransformBody(PostAdminUpdateReviewsStatusSchema)
      ]
    },
    {
      matcher: "/store/orders/:id/cancel",
      method: ["POST"],
      middlewares: [
        authenticate("customer", ["session", "bearer"])
      ]
    },
    {
      matcher: "/store/customers-reset-password",
      method: ["POST"],
      middlewares: [
        validateAndTransformBody(z.object({ identifier: z.string().email() }))
      ]
    },
    {
      matcher: "/store/customers-reset-password-confirm",
      method: ["POST"],
      middlewares: [
        validateAndTransformBody(z.object({ email: z.string().email(), password: z.string().min(8) }))
      ]
    },
    {
      matcher: "/admin/products/:product_id/ingredients",
      method: ["POST"],
      middlewares: [
        authenticate("user", ["session", "bearer"]),
      ]
    },
    {
      matcher: "/admin/products/:product_id/ingredients",
      method: ["GET"],
      middlewares: [
        authenticate("user", ["session", "bearer"])
      ]
    },
    {
      matcher: "/admin/products/:product_id/ingredients/:ingredient_id",
      method: ["PATCH"],
      middlewares: [
        authenticate("user", ["session", "bearer"]),
      ]
    },
    {
      matcher: "/admin/products/:product_id/ingredients/:ingredient_id",
      method: ["DELETE"],
      middlewares: [
        authenticate("user", ["session", "bearer"])
      ]
    },
    {
      matcher: "/store/products/:product_id/ingredients",
      method: ["GET"],
      middlewares: []
    }
    // Removed custom admin password reset endpoints. Use Medusa's built-in /auth/user/emailpass/reset-password and /auth/user/emailpass/reset-password-confirm endpoints for admin password reset.
  ]
})


