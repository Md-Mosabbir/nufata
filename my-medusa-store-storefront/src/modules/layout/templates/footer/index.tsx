import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({ fields: "*products" })
  const productCategories = await listCategories()

  return (
    <footer className="bg-[#000000] pt-16 pb-8 w-full">
      <div className="content-container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-extrabold text-[#FFFFFF] tracking-wide uppercase">
              NUFATAH'S
            </h3>
          </div>

          {productCategories?.length > 0 && (
            <div>
              <h4 className="font-bold text-[#FFFFFF] mb-4">Categories</h4>
              <ul className="space-y-2">
                {productCategories.slice(0, 6).map((category) => {
                  if (category.parent_category) return null
                  return (
                    <li key={category.id}>
                      <LocalizedClientLink
                        href={`/categories/${category.handle}`}
                        className="text-[#9CA3AF] hover:text-[#F2CC8F] transition-colors"
                      >
                        {category.name}
                      </LocalizedClientLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {collections?.length > 0 && (
            <div>
              <h4 className="font-bold text-[#FFFFFF] mb-4">Collections</h4>
              <ul className="space-y-2">
                {collections.slice(0, 6).map((collection) => (
                  <li key={collection.id}>
                    <LocalizedClientLink
                      href={`/collections/${collection.handle}`}
                      className="text-[#9CA3AF] hover:text-[#F2CC8F] transition-colors"
                    >
                      {collection.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t border-[#1F2937] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#6B7280] mb-4 md:mb-0 text-sm">
            &copy; {new Date().getFullYear()} Nufatah's. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href={process.env.NEXT_PUBLIC_MESSENGER_URL}
              className="text-[#9CA3AF] hover:text-[#F2CC8F] transition-colors"
            >
              <span className="sr-only">Facebook</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5a3.5 3.5 0 013.7-3.9c1 0 2 .1 2 .1v2.3h-1.3c-1.3 0-1.7.8-1.7 1.6V12H17l-.5 3h-2.5v7A10 10 0 0022 12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
