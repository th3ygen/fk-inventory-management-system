import { useState, useRef, useEffect } from 'react';
import { FaFileImport, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import PageHeader from "components/PageHeader.component";

import styles from 'styles/common/vendor/RegisterVendor.module.scss';

function EditVendor() {
    const [items, setItems] = useState([]);
    
    const companyName = useRef('');
    const brandName = useRef('');
    const contactNo = useRef('');
    const addressInput = useRef('');
    const email = useRef('');
    const picName = useRef('');
    const picContact = useRef('');

    const addVendor = async () => {
        
    }

    return (
        <div className={styles.container}>
            <PageHeader
				title="Edit Vendor"
				brief="Edit existing vendor"
				navs={[
					{
						icon: "FaReply",
						name: "Manage vendor",
						path: "/user/vendors",
					},
				]}
			/>

            <form className={styles.form}>
                <div className={`${styles.col} ${styles.half}`}>
                    <div className={styles.row}>
                        <div className={styles.label}>Company Name</div>
                        <input
                            className={styles.input}
                            type="text"
                            ref={companyName}
                        />
                    </div>
                    <div className={styles.row}>
                        <div className={styles.label}>Brand Name</div>
                        <input
                            className={styles.input}
                            type="text"
                            ref={brandName}
                        />
                    </div>
                    <div className={styles.row}>
                        <div className={styles.label}>Contact Number</div>
                        <input
                            className={styles.input}
                            type="text"
                            ref={contactNo}
                        />
                    </div>
                    <div className={styles.row}>
                        <div className={styles.label}>Address</div>
                        <input
                            className={styles.input}
                            type="text"
                            ref={addressInput}
                        />
                    </div>
                    <div className={styles.row}>
                        <div className={styles.label}>Email</div>
                        <input
                            className={styles.input}
                            type="text"
                            ref={email}
                        />
                    </div>
                    <div className={styles.row}>
                        <div className={styles.label}>Person In Charge</div>
                        <input
                            className={styles.input}
                            type="text"
                            ref={picName}
                        />
                    </div>
                    <div className={styles.row}>
                        <div className={styles.label}>Person In Charge (Number)</div>
                        <input
                            className={styles.input}
                            type="text"
                            ref={picContact}
                        />
                    </div>
                    <div className={styles.button} onClick={addVendor}>
                        <FaFileImport />
                        Add
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditVendor;