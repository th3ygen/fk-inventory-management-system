import { useState, useRef, useEffect } from 'react';
import { FaFileImport, FaTrashAlt } from "react-icons/fa";
import { useNavigate, useOutletContext } from 'react-router-dom';

import Swal from "sweetalert";

import PageHeader from "components/PageHeader.component";

import styles from 'styles/common/vendor/RegisterVendor.module.scss';

function RegisterVendor() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const [user] = useOutletContext();
    
    const companyName = useRef('');
    const brandName = useRef('');
    const contactNo = useRef('');
    const addressInput = useRef('');
    const email = useRef('');
    const picName = useRef('');
    const picContact = useRef('');

    const [basePath, setBasePath] = useState('/user');

    const addVendor = async () => {
        let item = {
            company_name: companyName.current.value,
            brand: brandName.current.value,
            contact: contactNo.current.value,
            address: addressInput.current.value,
            email: email.current.value,
            pic_name: picName.current.value,
            pic_contact: picContact.current.value,
        };

        const request = await fetch("http://localhost:8080/api/vendors/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: "Bearer " + user.token,
			},
			body: JSON.stringify(item),
		});

        if (request.status === 200) {
			await Swal({
				title: "Success",
				text: "Item added successfully",
				icon: "success",
				button: "OK",
			});

			navigate(basePath + "/vendors");
		} else {
			alert("Error adding vendor");
		}
    }

    const clearInput = () => {
        companyName.current.value = "";
        brandName.current.value = "";
        contactNo.current.value = "";
        addressInput.current.value = "";
        email.current.value = "";
        picName.current.value = "";
        picContact.current.value = "";
    }

    useEffect(() => {
        if (!user) return;

        if (user.role === 'admin') {
            setBasePath('/admin');
        }
    }, [user]);

    return (
        <div className={styles.container}>
            <PageHeader
				title="Add Vendor"
				brief="Add new vendor"
				navs={[
					{
						icon: "FaReply",
						name: "Manage vendor",
						path: basePath + "/vendors",
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
                    <div className={`${styles.col} ${styles.full}`}>
                        <div className={styles.row} style={{ alignItems: "flex-start" }}>

                            <div className={styles.buttons}>
                                <div className={`${styles.button} ${styles.invert}`} onClick={clearInput}>
                                    <FaTrashAlt />
                                    Clear
                                </div>
                                <div className={styles.button} onClick={addVendor}>
                                    <FaFileImport />
                                    Add
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </form>
        </div>
    )
}

export default RegisterVendor;