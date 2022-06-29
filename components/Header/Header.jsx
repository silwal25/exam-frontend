import styles from "./Header.module.scss"
import { Container } from "react-bootstrap"
import Link from "next/link"
import { useStateContext, useDispatchContext } from "../Context"
import { useRouter } from "next/router"
import { useRef } from "react"

export default function Header() {
  const appState = useStateContext()
  const appDispatch = useDispatchContext()
  const router = useRouter()
  const burgerRef = useRef()

  const logout = () => {
    appDispatch({ type: "logout" })
    localStorage.removeItem("auth_token")
    router.replace("/")
  }

  const burgerActive = () => {
    burgerRef.current.classList.toggle(styles.burgerActive)
  }

  return (
    <header className={styles.header}>
      <div className="container" style={{ position: "relative" }}>
        <div className={styles.logo}>
          <Link href="/">
            <h2>EXAM TIME</h2>
          </Link>
        </div>
        {!appState.isLoggedIn && (
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
        )}
        {appState.isLoggedIn && (
          <>
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

            {/**
             * <div className={styles.navMobile}>
              <div className={styles.burger} onClick={burgerActive} ref={burgerRef}>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <nav>
                <ul>
                  <li>Upload Paper</li>
                  <li>Logout</li>
                </ul>
              </nav>
            </div>
             */}
          </>
        )}
      </div>
    </header>
  )
}
