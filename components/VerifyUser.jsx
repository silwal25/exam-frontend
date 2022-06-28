import { useDispatchContext, useStateContext } from "./Context"
import { useEffect } from "react"
import axios from "axios"

export default function Verify({ children }) {
  const appDispatch = useDispatchContext()
  const appState = useStateContext()

  // Check whether the user is logged in or not.
  // If yes, then check the token for validations
  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      // Token is found
      // Now check the authenticity
      axios
        .get(process.env.NEXT_PUBLIC_BACKEND_URL + "/verify-token", {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then((response) => {
          // Token is verified
          // set isLoggedIn to true
          console.log("verified")
          appDispatch({ type: "login" })
        })
        .catch((error) => {
          // Token is invalid
          // Delete the token from local storage
          console.log(error)
          localStorage.removeItem("auth_token")
        })
    }
  }, [appDispatch])
  return <>{children}</>
}
