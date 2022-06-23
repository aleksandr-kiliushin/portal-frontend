import Breadcrumb from "antd/lib/breadcrumb"
import React from "react"

import classes from "./index.module.scss"

export const Breadcrumbs: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Breadcrumb className={classes.breadcrumbs}>
      {React.Children.map(children, (aChild, index) => (
        <Breadcrumb.Item key={index}>{aChild}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}
