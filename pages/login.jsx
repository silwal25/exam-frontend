import styles from "../styles/Login.module.scss"
import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useRouter } from "next/router"

import { useStateContext, useDispatchContext } from "../components/Context"

export default function Login() {
  const appState = useStateContext()
  const dispatch = useDispatchContext()
  const [userName, setName] = useState("")
  const [password, setPassword] = useState("")
  // const nameRef = useRef(null)
  // const passRef = useRef(null)
  const router = useRouter()

  const login = async (e) => {
    e.preventDefault()
    if (userName.length < 6) {
      dispatch({ type: "toastOn", payload: "Username must be 6 characters long" })
      return
    }
    if (password.length < 6) {
      dispatch({ type: "toastOn", payload: "Password must be 6 characters long" })
      return
    }
    const data = {
      userName,
      password
    }
    dispatch({ type: "toggleLoader" })
    try {
      const res = await axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "/login",
        data: data
      })
      if (res.data.status === 200) {
        dispatch({ type: "toggleLoader" })
        localStorage.setItem("auth_token", res.data.auth_token)
        dispatch({ type: "toastOn", payload: "Logged in successfully" })
        router.reload("/")
      } else {
        dispatch({ type: "toggleLoader" })
        dispatch({ type: "toastOn", payload: res.data.message })
      }
    } catch (err) {
      dispatch({ type: "toggleLoader" })
      dispatch({ type: "toastOn", payload: "An error has occurred. Please try again later" })
      console.log(err)
    }
  }

  // To verify the entered username
  // useEffect(() => {
  //   if (userName.length < 6) {
  //     nameRef.current.innerHTML = "Must be at least 6 characters long"
  //   } else {
  //     nameRef.current.innerHTML = ""
  //   }
  // }, [userName])

  // useEffect(() => {
  //   if (password.length < 6) {
  //     passRef.current.innerHTML = "Must be at least 6 characters long"
  //   } else {
  //     passRef.current.innerHTML = ""
  //   }
  // }, [password])

  // If the user is already logged in
  // No need to show him this page
  // Send him to the home page
  useEffect(() => {
    if (appState.isLoggedIn) router.replace("/")
  }, [appState, router])
  return (
    <div className={styles.login}>
      <div className="container">
        <div className={styles.form}>
          <form className="form">
            <div className="form__group d-flex flex-column align-items-center">
              <input
                type="text"
                placeholder="Enter username"
                id="username"
                value={userName}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form__group d-flex flex-column align-items-center">
              <input
                type="password"
                placeholder="Enter password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button onClick={login} className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
