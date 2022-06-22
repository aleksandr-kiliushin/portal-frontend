import cx from "classnames"
import React from "react"

import classes from "./index.module.scss"

interface Props {
  className?: string
  title?: string | undefined
}

const RowGroup: React.FC<React.PropsWithChildren<Props>> = ({ children, className, title }) => (
  <div className={cx(classes.rowGroup, className)}>
    {title !== undefined && title !== "" && <h4>{title}</h4>}
    {children}
  </div>
)

export default RowGroup
