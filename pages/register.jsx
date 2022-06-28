import styles from "../styles/Register.module.scss"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/router"
import { useDispatchContext } from "../components/Context"

export default function Register() {
  const [userName, setName] = useState("")
  const [email, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCPassword] = useState("")
  const router = useRouter()
  const dispatch = useDispatchContext()

  const register = async (e) => {
    e.preventDefault()
    if (userName.length < 6) {
      dispatch({ type: "toastOn", payload: "Username must be 6 characters long" })
      return
    }
    if (password.length < 6) {
      dispatch({ type: "toastOn", payload: "Password must be 6 characters long" })
      return
    }
    if (password !== cpassword) {
      dispatch({ type: "toastOn", payload: "Password does not matched" })
      return
    }
    const data = {
      userName,
      email,
      password
    }
    try {
      const res = await axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "/register",
        data: data
      })
      if (res.data.status === 200) {
        dispatch({ type: "toastOn", payload: "Successfully registered" })
        router.push("/login")
      } else if (res.data.status === 400) {
        console.log(res.data.err)
        dispatch({ type: "toastOn", payload: res.data.message })
      } else {
        console.log(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className={styles.Register}>
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
                type="email"
                placeholder="Enter email"
                id="email"
                value={email}
                onChange={(e) => setMail(e.target.value)}
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
            <div className="form__group">
              <input
                type="password"
                placeholder="Confirm password"
                id="cpassword"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
                required
              />
            </div>
            <button onClick={register} className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
