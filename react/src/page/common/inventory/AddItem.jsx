/* 
    TODO add item form
    TODO client validation
    TODO fetch data from server
*/
import { useLocation } from "react-router-dom";

import styles from "styles/common/inventory/AddItem.module.scss";

function AddItem () {
    const location = useLocation();

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                {location.state && location.state.label }
            </div>
        </div>
    );
}

export default AddItem;