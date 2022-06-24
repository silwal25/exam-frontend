import styles from "./Layout.module.scss"

import Header from "../Header/Header"

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
    </div>
  )
}
