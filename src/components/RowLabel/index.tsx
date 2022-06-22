import cx from "classnames"
import React from "react"

import classes from "./index.module.css"

type Props = {
  className?: string
  htmlFor?: string
}

const RowLabel: React.FC<React.PropsWithChildren<Props>> = ({ children, className, htmlFor }) => (
  <label className={cx(classes.rowLabel, className)} htmlFor={htmlFor}>
    {children}
  </label>
)

export default RowLabel
