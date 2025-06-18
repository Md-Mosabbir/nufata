import { Metadata } from "next"

import HeroSection from "@modules/home/components/hero-section"
import BenefitsGrid from "@modules/home/components/benefits-grid"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import FeaturedProducts from "@modules/home/components/featured-products"
import QuickFacts from "@modules/home/components/facts"

export const metadata: Metadata = {
  title: "Nufata's",
  description: "Best Home-made Pitha ",
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

  return (
    <>
      <HeroSection />
      <div>
        <FeaturedProducts countryCode={countryCode} />
      </div>
      <BenefitsGrid />
      <QuickFacts />
    </>
  )
}
