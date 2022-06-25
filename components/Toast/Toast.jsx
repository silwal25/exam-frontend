import styles from "./Toast.module.scss"

export default function Toast() {
  return (
    <div className={styles.toast}>
      <div>
        <p>This is a message</p>
      </div>
    </div>
  )
}
