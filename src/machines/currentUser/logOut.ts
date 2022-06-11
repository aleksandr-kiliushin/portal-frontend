const logOut = async () => {
  const response = await fetch("/api/logout/")

  if (response.ok) {
    return await response.json()
  }

  throw new Error("An error occured while logging out.")
}

export default logOut
