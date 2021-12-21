import { useLocation } from 'react-router-dom';

import styles from 'styles/component/Topbar.module.scss';

export default function Topbar() {
    const title = useLocation().pathname.split('/');

    return (
        <div className={`${styles.container}`} >
            <div className={styles.bar}>
                <div className={styles.head}>
                    <div className={styles.title}>
                        { (title[2]) ? title[2] : title[1] }
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