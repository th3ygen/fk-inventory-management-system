import { useState, useRef, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useLocation } from "react-router-dom";

import { FaFileImport, FaTrashAlt } from "react-icons/fa";

import PageHeader from "components/PageHeader.component";

//message
import * as swal from "sweetalert";
import * as alertify from "alertifyjs";

import styles from 'styles/common/vendor/RegisterVendor.module.scss';

function EditVendor() {

    const [user] = useOutletContext();

    const navigate = useNavigate();
    const location = useLocation();

    const [items, setItems] = useState([]);
    
    const companyName = useRef('');
    const brandName = useRef('');
    const contactNo = useRef('');
    const addressInput = useRef('');
    const email = useRef('');
    const picName = useRef('');
    const picContact = useRef('');

    const loadData = async () => {
        let vendorId = "";
		let request;

        if (location.state.id) {
            request = await fetch("http://localhost:8080/api/vendors/get/" + location.state.id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + user.token,
                },
            });

            if (request.status === 200) {
				const item = await request.json();

				companyName.current.value = item.company_name;
                brandName.current.value = item.brand;
                contactNo.current.value = item.contact;
                addressInput.current.value = item.address;
                email.current.value = item.email;
                picName.current.value = item.pic_name;
                picContact.current.value = item.pic_contact;
			}
        }
    };

    const updateVendor = async () => {
        let item = {
            id: location.state.id,
            company_name: companyName.current.value,
            brand: brandName.current.value,
            contact: contactNo.current.value,
            address: addressInput.current.value,
            email: email.current.value,
            pic_name: picName.current.value,
            pic_contact: picContact.current.value,
        };

        const request = await fetch("http://localhost:8080/api/vendors/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + user.token,
            },
            body: JSON.stringify(item),
        });

        if (request.status === 200) {
            await swal("Updated", "Vendor detail Update Successfully!", "success");
			navigate("/user/vendors");
        } else {
            console.log(request);
            alertify.notify('Error updating vendor', 'error');
        }
    };

    useEffect(() => {
        if (!user) {
            return;
        }
		loadData();
	}, [user]);

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
                    <div className={styles.button} onClick={updateVendor}>
                        <FaFileImport />
                        Update
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditVendor;