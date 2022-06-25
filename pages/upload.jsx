import styles from "../styles/Upload.module.scss"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router"

import { useStateContext } from "../components/Context"
import { branches, courses } from "../components/data"

export default function Upload() {
  const appState = useStateContext()
  const [title, setTitle] = useState("")
  const [semester, setSemester] = useState("")
  const [year, setYear] = useState("")
  const [branch, setBranch] = useState("")
  const [course, setCourse] = useState("")
  const [file, setFile] = useState("")
  const fileRef = useRef(null)
  const router = useRouter()

  // Data for the upload
  const courseIds = {
    mca: 1,
    bca: 2,
    btech: 3,
    bsc: 4,
    msc: 5
  }

  const branchIds = {
    it: 1,
    cse: 2
  }

  const upload = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("files", file)
    try {
      const res = await axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_CMS_URL + "/api/upload",
        data: formData
      })
      if (res.data) {
        try {
          const res1 = await axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_CMS_URL + "/api/papers",
            data: {
              data: {
                title: title,
                semester: semester,
                year: year,
                course: courseIds[course],
                branch: branchIds[branch],
                file: res.data[0].id,
                publishedAt: null
              }
            }
          })
          if (res1.data) {
            alert("Successfully uploaded. It will be shown in the results after validations")
            router.push("/")
          }
        } catch (err) {
          console.log(err)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  // Check if the user is logged in
  // If not send him to the login page
  useEffect(() => {
    console.log("Here")
    if (!appState.isLoggedIn) {
      router.replace("/")
    }
  }, [appState, router])
  return (
    <>
      {appState.isLoggedIn && (
        <div className={styles.upload}>
          <div className="container">
            <div className={styles.form}>
              <form className="form">
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter Title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter year"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  />
                </div>
                <div className="form__group">
                  <select
                    name="semester"
                    id="semester"
                    onChange={(e) => setSemester(e.target.selectedOptions[0].value)}
                    required
                    value={semester}
                  >
                    <option value={null}>Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                      <option value={item} key={Math.random() * 100}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form__group">
                  <select
                    name="course"
                    id="course"
                    onChange={(e) => setCourse(e.target.selectedOptions[0].value)}
                    required
                    value={course}
                  >
                    <option value={null}>Select Course</option>
                    {courses.map((item) => (
                      <option value={item} key={Math.random() * 100}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form__group">
                  <select
                    name="branch"
                    id="branch"
                    onChange={(e) => setBranch(e.target.selectedOptions[0].value)}
                    required
                    value={branch}
                  >
                    <option value={null}>Select Branch</option>
                    {branches.map((item) => (
                      <option value={item} key={Math.random() * 100}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form__group">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <button onClick={upload} className="btn btn-primary">
                  Upload
                </button>
              </form>
            </div>
            <div className={styles.instructions}>
              It would really help us a lot if you follow these instructions while uploading...
              <ol>
                <li>
                  Please mention the full subject name in the title (eg. instead of writing dsad
                  write Data structures and algorithm design).
                </li>
                <li>Please ensure that other info are correctly mentioned.</li>
                <li>
                  And last, I request you to please keep the file size to minimum (max 200kb if
                  possible. Turn your camera megapixels down before capturing). <br></br> Your poor
                  homie can not pay for more server storage (&gt;o_o)&gt;
                </li>
                <li>
                  It is preferred to use office lens for scanning the documents, but regardless of
                  the app your use, just make sure to apply a document filter at the end so that
                  everything becomes more legible.
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
