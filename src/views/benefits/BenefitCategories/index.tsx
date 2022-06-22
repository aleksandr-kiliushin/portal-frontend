import React from "react"
import { Link } from "react-router-dom"

import classes from "./index.module.scss"

type BenefitCategory = {
  discount_count: number
  name: string
  slug: string
}

const BenefitCategories: React.FC = () => {
  const [categories, setCategories] = React.useState<BenefitCategory[]>([])

  React.useEffect(() => {
    fetch("/api/benefits/categories/")
      .then((response) => response.json())
      .then((data) => setCategories(data.results))
  }, [])

  return (
    <div className={classes.benefitsCategories}>
      {categories.map(({ discount_count, name, slug }) => (
        <Link key={slug} to={`/${slug}`}>
          {name} ({discount_count} шт.)
        </Link>
      ))}
    </div>
  )
}

export default BenefitCategories
