import { getCollectionByHandle } from "@lib/data/collections"
import PaginatedProducts from "@modules/store/templates/paginated-products"

export default async function FeaturedProducts({
  countryCode,
}: {
  countryCode: string
}) {
  const collection = await getCollectionByHandle("featured")

  if (!collection || !collection.products?.length) {
    return null
  }

  return (
    <section className="bg-gradient-to-b from-white to-[#F4F1DE] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            {collection.title}
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Discover our most loved handcrafted creations, made with premium
            ingredients and lots of love.
          </p>
        </div>

        <PaginatedProducts
          sortBy="created_at"
          page={1}
          collectionId={collection.id}
          countryCode={countryCode}
        />

        <div className="mt-12 text-center">
          <a
            href="/store"
            className="inline-block bg-[#F2CC8F] hover:bg-[#EDB85F] text-black px-8 py-4 rounded-full text-lg font-medium shadow-md transition-all duration-300"
          >
            Shop All Products
          </a>
        </div>
      </div>
    </section>
  )
}
