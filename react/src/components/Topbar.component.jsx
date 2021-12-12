import { useResolvedPath } from 'react-router-dom';

import styles from 'styles/component/Topbar.module.scss';

export default function Topbar() {

    return (
        <div className={`${styles.container}`} >
            <div className={styles.bar}>
                <div className={styles.head}>
                    <div className={styles.title}>
                        Lorem itsum
                    </div>
                </div>
                <div className={styles['user-action']}>
                    <div className={styles.logout}>
                        Logout
                    </div>
                    <div className={styles.avatar}>

                    </div>
                </div>
            </div>
        </div>
    )
}