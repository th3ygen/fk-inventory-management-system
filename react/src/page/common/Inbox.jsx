import styles from 'styles/common/Inbox.module.scss';

//component
import Wrapper from 'components/FolderCard';

function Inbox() {
    return (
        <div className={styles.content}>
            <Wrapper className={styles.wrapper} title="Inbox">
                <div className={styles.table}>
                    <div className={styles.header}>
                        <div className={styles.headNum}>
                            #
                        </div>
                        <div className={styles.headTitle}>
                            Title
                        </div>
                        <div className={styles.headCon}>
                            Source
                        </div>
                        <div className={styles.headCon}>
                            Date
                        </div>
                    </div>
                    <div className={styles.tableCont}>
                        <div className={styles.row}>
                            <div className={styles.headNum}>
                                1
                            </div>
                            <div className={styles.headTitle}>
                                Order Need Approval
                            </div>
                            <div className={styles.headCon}>
                                Staff
                            </div>
                            <div className={styles.headCon}>
                                12/1/2022
                            </div>
                        </div>
                        
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default Inbox;