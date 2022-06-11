export const isTabSlugValid = ({ aTabSlug }: { aTabSlug: string | null }): boolean => {
  if (aTabSlug === null) return false
  const validTabSlugs = new Set(["achievements", "endorsements", "information", "publications"])
  return validTabSlugs.has(aTabSlug)
}
