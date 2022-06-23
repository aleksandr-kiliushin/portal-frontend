import cx from "classnames"
import React from "react"

import classes from "./index.module.scss"

interface Props {
  className?: string
}

export const RowGroups: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => (
  <div className={cx(classes.rowGroups, className)}>{children}</div>
)
