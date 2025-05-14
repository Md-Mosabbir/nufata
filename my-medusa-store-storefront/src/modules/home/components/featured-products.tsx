import { getCollectionByHandle } from "@lib/data/collections"
import PaginatedProducts from "@modules/store/templates/paginated-products"

export default async function FeaturedProducts({ countryCode }: { countryCode: string }) {
  // Use the handle you set in Medusa admin, e.g., "featured"
  const collection = await getCollectionByHandle("featured")

  if (!collection || !collection.products?.length) {
    return null
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">{collection.title}</h2>
      <PaginatedProducts
        sortBy="created_at"
        page={1}
        collectionId={collection.id}
        countryCode={countryCode}
      />
    </section>
  )
} 