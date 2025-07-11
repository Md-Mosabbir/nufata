"use server"

import { sdk } from "@lib/config"
import { sortProducts } from "@lib/util/sort-products"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { getRegion, retrieveRegion } from "./regions"
import { StoreProductReview } from "types/global"

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const _pageParam = Math.max(pageParam, 1)
  const offset = (_pageParam - 1) * limit

  let region: HttpTypes.StoreRegion | undefined | null

  if (countryCode) {
    region = await getRegion(countryCode)
  } else {
    region = await retrieveRegion(regionId!)
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("products")),
  }

  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        method: "GET",
        query: {
          limit,
          offset,
          region_id: region?.id,
          fields:
            "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
          ...queryParams,
        },
        headers,
        next: {
          ...next,
          revalidate: 600, // Revalidate every 10 minutes
          tags: ['products'] // For manual revalidation when needed
        }
      }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
}

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
  countryCode,
}: {
  page?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
  sortBy?: SortOptions
  countryCode: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams
}> => {
  const limit = queryParams?.limit || 12

  const {
    response: { products, count },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    countryCode,
  })

  const sortedProducts = sortProducts(products, sortBy)

  const pageParam = (page - 1) * limit

  const nextPage = count > pageParam + limit ? pageParam + limit : null

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit)

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  }
}

export const getProductReviews = async ({
  productId,
  limit = 10,
  offset = 0,
}: {
  productId: string
  limit?: number
  offset?: number
}) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions(`product-reviews-${productId}`)),
  }

  return sdk.client.fetch<{
    reviews: StoreProductReview[]
    average_rating: number
    limit: number
    offset: number
    count: number
  }>(`/store/products/${productId}/reviews`, {
    headers,
    query: {
      limit,
      offset,
      order: "-created_at",
    },
    next: {
      ...next,
      revalidate: 300, // Revalidate every 5 minutes
      tags: [`product-reviews-${productId}`]
    }
  })
}

export const addProductReview = async (input: {
  title?: string
  content: string
  first_name: string
  last_name: string
  rating: number
  product_id: string
}) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return sdk.client.fetch(`/store/reviews`, {
    method: "POST",
    headers,
    body: input,
    next: {
      ...(await getCacheOptions(`product-reviews-${input.product_id}`)),
    },
    cache: "no-store",
  })
}

export const getProductIngredients = async ({
  productId,
}: {
  productId: string
}) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions(`product-ingredients-${productId}`)),
  }

  return sdk.client.fetch<{ ingredients: any[] }>(
    `/store/products/${productId}/ingredients`,
    {
      headers,
      next: {
        ...next,
        revalidate: 3600, // Revalidate every hour
        tags: [`product-ingredients-${productId}`]
      },
    }
  )
}
