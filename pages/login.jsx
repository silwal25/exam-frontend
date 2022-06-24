import styles from "../styles/Login.module.scss"
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router"

import { useStateContext } from "../components/Context"

export default function Login() {
  const appState = useStateContext()
  const [userName, setName] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const login = async (e) => {
    e.preventDefault()
    const data = {
      userName,
      password
    }
    try {
      const res = await axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "/login",
        data: data
      })
      localStorage.setItem("auth_token", res.data.auth_token)
      alert("Successfully Logged in")
      router.replace("/")
      router.reload()
    } catch (err) {
      console.log(err)
    }
  }

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
            <div className="form__group">
              <input
                type="text"
                placeholder="Enter username"
                id="username"
                value={userName}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form__group">
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
