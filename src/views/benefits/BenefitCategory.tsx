import React from "react"
import { useParams } from "react-router-dom"

import Loader from "portal-frontend-sdk/dist/components/Loader"

type Benefit = {
  company: {
    logo: number
    name: number
  }
  id: number
}

type IBenefitCategory = {
  discounts: Benefit[]
  name: string
}

const BenefitCategory: React.FC = () => {
  const params = useParams<{ categorySlug: string }>()

  const [benefitCategory, setBenefitCategory] = React.useState<IBenefitCategory | null>(null)

  React.useEffect(() => {
    fetch(`/api/benefits/categories/${params.categorySlug}/`)
      .then((response) => response.json())
      .then(setBenefitCategory)
  }, [])

  if (benefitCategory === null) return <Loader isFullScreen />

  return (
    <>
      {benefitCategory.discounts.map((aCategory) => {
        return <p key={aCategory.id}>{aCategory.company.name}</p>
      })}
    </>
  )
}

export default BenefitCategory
