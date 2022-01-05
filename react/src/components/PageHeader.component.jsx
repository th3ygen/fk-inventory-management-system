import styles from "styles/component/PageHeader.module.scss";

function PageHeader(props) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {props.title || "Unknown"}
            </div>
            <div className={styles.brief}>
                {props.brief || "Unknown"}
            </div>
        </div>
    )
}

export default PageHeader;