"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import {
  Badge,
  Button,
  Checkbox,
  createDataTableColumnHelper,
  DataTable,
  useDataTable,
} from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { getProductIngredients } from "@lib/data/products"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

const columnHelper = createDataTableColumnHelper<{
  id: string
  name: string
  grams: number
  removable: boolean
}>()

const ingredientColumns = (selectedIngredients, setSelectedIngredients) => [
  columnHelper.display({
    id: "select",
    header: "",
    cell: ({ row }) => (
      <Checkbox
        checked={!!selectedIngredients[row.original.id]}
        disabled={!row.original.removable}
        onCheckedChange={() =>
          setSelectedIngredients((prev) => ({
            ...prev,
            [row.original.id]: !prev[row.original.id],
          }))
        }
      />
    ),
  }),
  columnHelper.accessor("name", {
    header: "Ingredient",
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor("grams", {
    header: "Weight (g)",
    cell: ({ getValue }) => `${getValue()}g`,
  }),
  // columnHelper.display({
  //   id: "required",
  //   header: "",
  //   cell: ({ row }) =>
  //     !row.original.removable ? (
  //       <Badge color="grey" size="xsmall">
  //         Required
  //       </Badge>
  //     ) : null,
  // }),
]

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string
  const [ingredients, setIngredients] = useState<
    { id: string; name: string; grams: number; removable: boolean }[]
  >([])
  const [selectedIngredients, setSelectedIngredients] = useState<{
    [id: string]: boolean
  }>({})
  const [loadingIngredients, setLoadingIngredients] = useState(false)

  const ingredientTable = useDataTable({
    columns: ingredientColumns(selectedIngredients, setSelectedIngredients),
    data: ingredients,
    getRowId: (row) => row.id,
  })

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // Fetch ingredients for this product
  useEffect(() => {
    const fetchIngredients = async () => {
      setLoadingIngredients(true)
      try {
        const { ingredients } = await getProductIngredients({
          productId: product.id,
        })
        setIngredients(ingredients)
        // Default: all checked
        const defaultSelected: { [id: string]: boolean } = {}
        ingredients.forEach((ing: any) => {
          defaultSelected[ing.id] = true
        })
        setSelectedIngredients(defaultSelected)
      } catch (e) {
        setIngredients([])
      } finally {
        setLoadingIngredients(false)
      }
    }
    if (product.id) fetchIngredients()
  }, [product.id])

  // Add to cart with selected ingredients as metadata
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null
    setIsAdding(true)
    // Gather selected ingredients
    const selected = ingredients.filter((ing) => selectedIngredients[ing.id])
    const ingredientMeta = selected.map((ing) => ({
      id: ing.id,
      name: ing.name,
    }))
    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
      metadata: {
        ingredients: ingredientMeta,
      },
    })
    setIsAdding(false)
  }

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        {/* Ingredient selection UI */}
        {loadingIngredients ? (
          <div>Loading ingredients...</div>
        ) : ingredients.length > 0 ? (
          <div className="mb-6">
            <div className="font-semibold mb-3 text-lg">Ingredients</div>
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <DataTable instance={ingredientTable}>
                <DataTable.Table />
              </DataTable>
            </div>
          </div>
        ) : null}
        {/* End ingredient selection UI */}
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice product={product} variant={selectedVariant} />

        <Button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant
          }
          variant="primary"
          className="w-full h-10"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!selectedVariant && !options
            ? "Select variant"
            : !inStock || !isValidVariant
            ? "Out of stock"
            : "Add to cart"}
        </Button>
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
