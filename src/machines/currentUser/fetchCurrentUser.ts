export const fetchCurrentUser = async () => {
  const response = await fetch("/api/home/users/0/", {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    method: "GET",
  })

  if (response.ok) {
    return await response.json()
  }

  throw new Error("An error occured while fetching current user.")
}
