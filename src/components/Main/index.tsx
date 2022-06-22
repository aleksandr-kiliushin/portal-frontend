import React from "react"

import classes from "./index.module.css"

const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={classes.main}>{children}</div>
}

export default Main
