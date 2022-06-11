import cookie from "cookie"
import { User } from "portal-frontend-sdk/dist/types/user"

const logIn = async ({ username }: { username: User["username"] }) => {
  const response = await fetch("/api/login/", {
    body: JSON.stringify({ password: "wer", username }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-CSRFToken": cookie.parse(document.cookie).csrftoken,
    },
    method: "POST",
  })

  if (response.ok) {
    return await response.json()
  }

  throw new Error("An error occured while logging in.")
}

export default logIn
