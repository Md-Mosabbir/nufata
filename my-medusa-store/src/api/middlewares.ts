import {
  defineMiddlewares,
  authenticate,
  validateAndTransformBody,
  validateAndTransformQuery
} from "@medusajs/framework/http"
import { PostStoreReviewSchema } from "./store/reviews/route"
import { PostAdminCreateBrand } from "./admin/brands/validators"
import { z } from "zod"

import { GetAdminReviewsSchema } from "./admin/reviews/route"
import { PostAdminUpdateReviewsStatusSchema } from "./admin/reviews/status/route"
import { GetStoreReviewsSchema } from "./store/products/[id]/reviews/route"
export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/brands",
      method: "POST",
      middlewares: [
        validateAndTransformBody(PostAdminCreateBrand),
      ],
    },
    {
      matcher: "/admin/products",
      method: ["POST"],
      additionalDataValidator: {
        brand_id: z.string().optional(),
      },
    },
    {

      method: ["POST"],
      matcher: "/store/reviews",
      middlewares: [
        authenticate("customer", ["session", "bearer"]),
        validateAndTransformBody(PostStoreReviewSchema),
      ],
    },


{
      matcher: "/store/products/:id/reviews",
      method: ["GET"],
      middlewares: [
        validateAndTransformQuery(GetStoreReviewsSchema, {
          isList: true,
          defaults: [
            "id", 
            "rating", 
            "title", 
            "first_name", 
            "last_name", 
            "content", 
            "created_at",
          ],
        }),
      ],
    },


{
      matcher: "/admin/reviews/status",
      method: ["POST"],
      middlewares: [
        validateAndTransformBody(PostAdminUpdateReviewsStatusSchema),
      ],
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
          ],
        }),
      ],
    },








  ],
})


