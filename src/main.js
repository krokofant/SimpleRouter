import pages from "./pages"

const traverseRoute = (route, paths = []) => {
  if (typeof route === "string") return route
  if (paths.length === 0) {
    if (typeof route.index !== "undefined") {
      return traverseRoute(route.index)
    } else return "404"
  }
  const nextRoute = route[paths[0]]
  if (typeof nextRoute === "undefined") return "404"
  return traverseRoute(nextRoute, paths.slice(1))
}

class Router {
  rootElement = document.querySelector("#root")
  pages = {}

  constructor(pages = {}) {
    this.pages = pages
  }

  init() {
    window.addEventListener("hashchange", this.navigate.bind(this))
    this.navigate()
  }

  navigate() {
    const content = traverseRoute(this.pages, this.paths)
    this.render(content)
  }

  render(content) {
    this.rootElement.innerHTML = content
  }

  get paths() {
    return location.hash
      .substring(1)
      .split("/")
      .filter(p => p.length > 0)
  }
}

new Router(pages).init()
