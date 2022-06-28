import styles from "./Layout.module.scss"

import Header from "../Header/Header"
import Toast from "../Toast/Toast"
import { useStateContext } from "../Context"
import HeaderLoggedIn from "../Header/HeaderLoggedIn"
import { useEffect, useState } from "react"

export default function Layout({ children }) {
  const appState = useStateContext()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (appState.isLoggedIn) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [appState])

  return (
    <div className={styles.layout}>
      {appState.toastVisible && <Toast />}
      <Header />
      <main>{children}</main>
    </div>
  )
}
