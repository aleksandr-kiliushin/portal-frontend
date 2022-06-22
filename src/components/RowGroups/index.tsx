import cx from "classnames"
import React from "react"

import classes from "./index.module.css"

interface Props {
  className?: string
}

const RowGroups: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => (
  <div className={cx(classes.rowGroups, className)}>{children}</div>
)

export default RowGroups
