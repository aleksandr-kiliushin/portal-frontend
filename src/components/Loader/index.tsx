import { Spin } from "antd"
import cx from "classnames"
import React from "react"
import ReactDOM from "react-dom"

import classes from "./index.module.scss"

type Props = {
  isFullScreen?: boolean
}

const Loader: React.FC<Props> = ({ isFullScreen }) => {
  if (isFullScreen) {
    return ReactDOM.createPortal(<Spin className={cx(classes.loader, classes._fullScreen)} />, document.body)
  }

  return <Spin className={classes.loader} />
}

export default Loader
