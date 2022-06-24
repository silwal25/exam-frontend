import styles from "../styles/Home.module.scss"
import Card from "../components/Card/Card"
import { courses, branches } from "../components/data"
import axios from "axios"
import { useState, useEffect } from "react"
import qs from "qs"
import { useStateContext } from "../components/Context"

export default function Home() {
  const appState = useStateContext()
  const [data, setData] = useState([])
  const [searchData, setSearchData] = useState({
    course: "",
    branch: "",
    semester: ""
  })

  const search = async (e) => {
    e.preventDefault()
    const query = qs.stringify(
      {
        populate: "*",
        filters: {
          course: {
            name: searchData.course
          },
          branch: {
            name: searchData.branch
          },
          semester: searchData.semester
        }
      },
      {
        encodeValuesOnly: true
      }
    )
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_CMS_URL + `/api/papers?${query}`)
      console.log(res.data)
      if (res.status == 200) {
        setData(res.data.data)
        console.log(res.data)
      } else {
        console.log("Error fetching data")
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className={styles.home}>
      <div className="container">
        <form className={styles.form}>
          <select
            name="course"
            id="course"
            onChange={(e) =>
              setSearchData({ ...searchData, course: e.target.selectedOptions[0].value })
            }
          >
            <option value={null}>Select Course</option>
            {courses.map((item) => (
              <option
                value={item}
                style={{ textTransform: "uppercase" }}
                key={Math.random() * 100}
              >
                {item}
              </option>
            ))}
          </select>
          <select
            name="branch"
            id="branch"
            onChange={(e) =>
              setSearchData({ ...searchData, branch: e.target.selectedOptions[0].value })
            }
          >
            <option value={null}>Select Branch</option>
            {branches.map((item) => (
              <option value={item} key={Math.random() * 100}>
                {item}
              </option>
            ))}
          </select>
          <select
            name="sem"
            id="sem"
            onChange={(e) =>
              setSearchData({ ...searchData, semester: e.target.selectedOptions[0].value })
            }
          >
            <option value={null}>Select Semester</option>
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((item) => (
              <option value={item} key={Math.random() * 100}>
                {item}
              </option>
            ))}
          </select>
          <button onClick={search}>Search</button>
        </form>
        <div className={styles.cards}>
          {data && data.map((item) => <Card data={item} key={item.attributes._id} />)}
        </div>
      </div>
    </div>
  )
}
