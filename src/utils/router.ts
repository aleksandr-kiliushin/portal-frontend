import { NavigateFunction } from "react-router-dom"

type RouterPayload = {
  navigate: NavigateFunction
}

export class Router {
  private _navigate: NavigateFunction
  constructor(payload: RouterPayload) {
    this._navigate = payload.navigate
  }
  get navigate() {
    return this._navigate
  }
}

let router = new Router({ navigate: () => {} })

export const setRouter = (newRouter: Router) => {
  router = newRouter
}

const getRouter = (): Router => {
  return router
}

export default getRouter
