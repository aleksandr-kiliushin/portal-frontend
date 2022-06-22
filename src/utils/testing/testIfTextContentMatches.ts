// TODO: Refactor and add types.
// TODO: Try to use just `expect(document.body.textContent).toMatch("Ashley")` instead.

// @ts-ignore
const testIfTextContentMatches = (text: string) => (_content, node) => {
  // @ts-ignore
  const hasText = (node) => node.textContent === text
  const nodeHasText = hasText(node)
  const childrenDontHaveText = Array.from(node?.children || []).every((child) => !hasText(child))
  return nodeHasText && childrenDontHaveText
}

export default testIfTextContentMatches
