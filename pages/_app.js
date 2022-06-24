import "bootstrap/dist/css/bootstrap.css"
import "../public/assets/icomoon/style.css"
import "../styles/globals.scss"
import { StateProvider, useDispatchContext } from "../components/Context"
import { useEffect } from "react"
import axios from "axios"

import Layout from "../components/Layout/Layout"
import Verify from "../components/VerifyUser"

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Verify>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Verify>
    </StateProvider>
  )
}

export default MyApp