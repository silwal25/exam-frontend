import styles from "./Loader.module.scss"

export default function Loader() {
  return (
    <div className={styles.loader}>
      <div></div>
      <p>Loading</p>
    </div>
  )
}
