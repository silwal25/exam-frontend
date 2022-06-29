import styles from "./Footer.module.scss"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Made by{" "}
        <a href="https://github.com/silwal25" target="_blank" rel="noopener noreferrer">
          Lalit Singh Silwal
        </a>
      </p>
      <p>MCA, AIIT</p>
    </footer>
  )
}
