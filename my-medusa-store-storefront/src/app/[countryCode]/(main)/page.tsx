import { Metadata } from "next"

import HeroSection from "@modules/home/components/hero-section"
import ProductHighlights from "@modules/home/components/product-highlights"
import BenefitsGrid from "@modules/home/components/benefits-grid"
import InfoSection from "@modules/home/components/info-section"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import Testimonials from "@modules/home/components/testimonials"
import FeaturedProducts from "@modules/home/components/featured-products"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }
  console.log(collections, region, countryCode, "hello")

  return (
    <>
      <HeroSection />
      <div className="py-12">
        {/* <FeaturedProductsWrapper countryCode={countryCode} /> */}
        <FeaturedProducts countryCode={countryCode} />
      </div>
      <BenefitsGrid />

      <Testimonials />
    </>
  )
}
