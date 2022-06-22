import React from "react"

import classes from "./index.module.scss"

const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={classes.main}>{children}</div>
}

export default Main
