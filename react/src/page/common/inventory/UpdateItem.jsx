/* 
    TODO Update item form
    TODO client validation
*/
import { useLocation } from "react-router-dom";

import styles from "styles/common/inventory/UpdateItem.module.scss";

function UpdateItem () {
    const location = useLocation();

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                {location.state && location.state.label }
            </div>
        </div>
    );
}

export default UpdateItem;