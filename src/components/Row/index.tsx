import cx from "classnames"
import React from "react"

import classes from "./index.module.css"

type Props = {
  className?: string
}

const Row: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => (
  <div className={cx(classes.row, className)}>{children}</div>
)

export default Row
