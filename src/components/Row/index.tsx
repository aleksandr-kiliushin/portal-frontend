import cx from "classnames"
import React from "react"

import classes from "./index.module.scss"

type Props = {
  className?: string
}

export const Row: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => (
  <div className={cx(classes.row, className)}>{children}</div>
)
