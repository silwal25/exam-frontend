import styles from "./Card.module.scss"

export default function Card({ data }) {
  console.log(data)
  return (
    <div className={styles.card}>
      <div className={styles.sem}>
        <p>{data.attributes.semester}</p>
      </div>
      <div className={styles.body}>
        <p className="d-flex flex-column">
          <span>
            {data.attributes.course.data.attributes.name} |{" "}
            {data.attributes.branch.data.attributes.name}
          </span>
          <span>{data.attributes.year}</span>
        </p>
        <p className={styles.title}>{data.attributes.title}</p>
        <button>
          <a
            className="icon-download"
            href={process.env.NEXT_PUBLIC_CMS_URL + data.attributes.file.data.attributes.url}
            download
          ></a>
        </button>
      </div>
    </div>
  )
}