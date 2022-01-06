/* 
    TODO Update item form
    TODO fetch item details
    TODO client validation
*/
import { useLocation } from "react-router-dom";

import PageHeader from "components/PageHeader.component";

import styles from "styles/common/inventory/UpdateItem.module.scss";
import { useEffect } from "react";

function UpdateItem() {
	const location = useLocation();

    useEffect(() => {
        console.log(location.state);
    }, []);

	return (
		<div className={styles.container}>
			<PageHeader title="Update Item" brief="Update an item" />
			<div className={styles.form}>
				
			</div>
		</div>
	);
}

export default UpdateItem;
