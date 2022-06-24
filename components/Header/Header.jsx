import styles from "./Header.module.scss"
import { Container } from "react-bootstrap"
import Link from "next/link"
import { useStateContext, useDispatchContext } from "../Context"
import { useRouter } from "next/router"

export default function Header() {
  const appState = useStateContext()
  const appDispatch = useDispatchContext()
  const router = useRouter()

  const logout = () => {
    appDispatch({ type: "logout" })
    localStorage.removeItem("auth_token")
    router.replace("/")
  }
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.logo}>
          <Link href="/">
            <h2>EXAM TIME</h2>
          </Link>
        </div>
        {!appState.isLoggedIn ? (
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
              <span>|</span>
              <li>
                <Link href="/register">
                  <a>Register</a>
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link href="/upload">
                  <a>Upload Paper</a>
                </Link>
              </li>
              <span>|</span>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
