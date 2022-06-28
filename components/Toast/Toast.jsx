import styles from "./Toast.module.scss"
import { useDispatchContext, useStateContext } from "../Context"
import { useEffect, useRef } from "react"

export default function Toast() {
  const appState = useStateContext()
  const dispatch = useDispatchContext()
  const toastRef = useRef(null)

  const hideToast = () => {
    dispatch({ type: "toastOff" })
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: "toastOff" })
    }, [5000])
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className={styles.toast} ref={toastRef} onClick={hideToast} s>
      <div>
        <p>{appState.toastMessage}</p>
      </div>
    </div>
  )
}
