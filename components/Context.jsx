import { useReducer, useContext, createContext, useState } from "react"

const StateContext = createContext()
const DispatchContext = createContext()

const initialState = {
  isLoggedIn: false,
  toastVisible: false,
  toastMessage: ""
}

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return Object.assign({}, state, { isLoggedIn: true })
    case "logout":
      return Object.assign({}, state, { isLoggedIn: false })
    case "toastOn":
      return Object.assign({}, state, { toastVisible: true, toastMessage: action.payload })
    case "toastOff":
      return Object.assign({}, state, { toastVisible: false })
    default:
      throw new Error(`Unknown action ${action.type}`)
  }
}

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
export const useDispatchContext = () => useContext(DispatchContext)
