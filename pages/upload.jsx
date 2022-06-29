import styles from "../styles/Upload.module.scss"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router"

import { useStateContext, useDispatchContext } from "../components/Context"
import { branches, courses } from "../components/data"

export default function Upload() {
  const appState = useStateContext()
  const dispatch = useDispatchContext()
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
    console.log(fileRef.current)
    if (fileRef.current.files.length > 0) {
      // Check the file size
      // If it exceed 500kb, show an error message
      if (fileRef.current.files[0].size > 500000) {
        dispatch({ type: "toastOn", payload: "File size should not exceed 500 kb" })
        return
      }
      // Checking file type
      // Only pdf is allowed
      if (fileRef.current.files[0].type !== "application/pdf") {
        dispatch({ type: "toastOn", payload: "Only pdf is allowed" })
        return
      }
    } else {
      // No file found
      dispatch({ type: "toastOn", payload: "Please upload a file" })
      return
    }

    // Checking for other attributes
    if (!title) {
      dispatch({ type: "toastOn", payload: "Please enter a title" })
      return
    }

    if (!semester) {
      dispatch({ type: "toastOn", payload: "Please enter a semester" })
      return
    }

    if (!year) {
      dispatch({ type: "toastOn", payload: "Please enter a year" })
      return
    } else {
      if (isNaN(year)) {
        dispatch({ type: "toastOn", payload: "Please enter a valid year" })
        return
      }
    }

    if (!branch) {
      dispatch({ type: "toastOn", payload: "Please enter a branch" })
      return
    }

    if (!course) {
      dispatch({ type: "toastOn", payload: "Please enter a course" })
      return
    }

    // If all the validations passed
    // Upload the paper
    const formData = new FormData()
    formData.append("files", file)
    dispatch({ type: "toggleLoader" })
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
            dispatch({ type: "toggleLoader" })

            dispatch({
              type: "toastOn",
              payload: "Successfully uploaded. It will be shown in the results after validations"
            })
            router.push("/")
          } else {
            dispatch({ type: "toggleLoader" })
            dispatch({
              type: "toastOn",
              payload: "Error uploading. Please try again later"
            })
            console.log()
          }
        } catch (err) {
          dispatch({ type: "toggleLoader" })
          dispatch({
            type: "toastOn",
            payload: "Error uploading. Please try again later"
          })
          console.log(err)
        }
      }
    } catch (err) {
      // Failed to upload the file
      dispatch({ type: "toggleLoader" })
      dispatch({
        type: "toastOn",
        payload: "Error uploading. Please try again later"
      })
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
                    ref={fileRef}
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
                <li>Only PDF format is allowed</li>
                <li>
                  Steps to scan pdf :-
                  <ul>
                    <li>Open Office Lens app</li>
                    <li>Click on the three dots on the top right corner</li>
                    <li>Click on Resolution</li>
                    <li>Choose 2.8M optimally, go lower if needed</li>
                    <li>Scan the pages</li>
                    <li>Crop the pages properly</li>
                    <li>Apply the document filter</li>
                    <li>Save the document</li>
                  </ul>
                </li>
                <li>
                  Please mention the full subject name in the title (eg. instead of writing dsad
                  write Data structures and algorithm design).
                </li>
                <li>Please ensure that other info are correctly mentioned.</li>
                <li>
                  And last, I request you to please keep the file size to minimum (max 500kb if
                  possible. Turn your camera megapixels down before capturing). <br></br> Your poor
                  homie can not pay for more server storage (&gt;o_o)&gt;
                </li>
                <li>
                  To add more courses and suggestions, please contact me{" "}
                  <a href="mailto:lalit.silwal@s.amity.edu" style={{ color: "#fff" }}>
                    here
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
