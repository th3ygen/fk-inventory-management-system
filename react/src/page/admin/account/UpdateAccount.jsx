import { useRef, useEffect } from "react";
import styles from 'styles/admin/account/UpdateAccount.module.scss';
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { FaRegSave, FaUndoAlt } from 'react-icons/fa';

function UpdateAccount() {
    const navigate = useNavigate();
    const location = useLocation();
    const nameInput = useRef("");
    const emailInput = useRef("");
    const roleInput = useRef("");
    const contactInput = useRef("");
    const addressInput = useRef("");
    const usernameInput = useRef("");
    const passwordInput = useRef("");
    const createdAtInput = useRef("");
    const updatedAtInput = useRef("");

    const updateAccount = async () => {
        let account = {
            account_ID: location.state.id,
            name: nameInput.current.value,
            email: emailInput.current.value,
            role: roleInput.current.value,
            contact: contactInput.current.value,
            address: addressInput.current.value,
            username: usernameInput.current.value,
            password: passwordInput.current.value,
        };

        const request = await fetch("http://localhost:8080/api/accounts/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(account),
        });

        if (request.status === 200) {
            alert("Account added successfully");
        } else {
            console.log(request);
            alert("Error adding account");
        }
    }
    const load = async () => {
        const request = await fetch("http://localhost:8080/api/accounts/find/" + location.state.id)

        if (request.status === 200) {
            const response = await request.json()
            nameInput.current.value = response.name
            emailInput.current.value = response.email
            roleInput.current.selectedIndex = ["manager", "staff", "Admin"].indexOf(response.role)
            contactInput.current.value = response.contact
            addressInput.current.value = response.address
            usernameInput.current.value = response.username
            createdAtInput.current.value = response.createdAt
            updatedAtInput.current.value = response.updatedAt
            console.log(response);

        } else {
            console.log(request);
        }
    }
    useEffect(() => {
        if (!location.state) {
            navigate("/admin/accounts", { replace: true })
        } else {
            load();
        }
    }, []);
    return (
        <div>
            <h2 className={styles.header2}>Update Account</h2>
            <h5 className={styles.header5}>You can view and update the account.</h5>
            <div>
                <div className={styles.form}>
                    <form className={styles.formAccount}>
                        <div className={styles.wrapper}>
                            <div className={styles.box}>
                                <label>
                                    Name
                                    <input type="text" ref={nameInput} className={styles.inputData} name="name" placeholder="Farikha Dwi" />
                                </label>
                            </div>
                            <div className={styles.box}>
                                <label>
                                    Username
                                    <input type="text" ref={usernameInput} className={styles.inputData} name="username" placeholder="Enter Username" />
                                </label>
                            </div>
                        </div>

                        <div className={styles.wrapper}>
                            <div className={styles.box}>
                                <label>
                                    Email
                                    <input type="text" ref={emailInput} className={styles.inputData} name="email" placeholder="farikhadwi@gmail.com" />
                                </label>
                            </div>
                            <div className={styles.box}>
                                <label>
                                    Password
                                    <input type="text" ref={passwordInput} className={styles.inputData} name="password" placeholder="Enter Password" />
                                </label>
                            </div>
                        </div>

                        <div className={styles.wrapper}>
                            <div className={styles.box}>
                                <label>
                                    Contact
                                    <input type="text" ref={contactInput} className={styles.inputData} name="contact" placeholder="0895322807641" />
                                </label>
                            </div>
                            <div className={styles.box}>
                                <label for="role">Role</label>
                                <select id="role" name="role" ref={roleInput}>
                                    <option value="manager">Manager</option>
                                    <option value="staff">Staff</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <label>
                            Address
                            <textarea type="text-area" ref={addressInput} name="address" className={styles.inputTextArea} rows={5} placeholder="Enter Address"></textarea>
                        </label>

                        <div className={styles.wrapper}>
                            <div className={styles.box}>
                                <label>
                                    Created At
                                    <input type="text" ref={createdAtInput} className={styles.inputData} name="createdAt" disabled />
                                </label>
                            </div>
                            <div className={styles.box}>
                                <label>
                                    Updated At
                                    <input type="text" ref={updatedAtInput} className={styles.inputData} name="updatedAt" disabled />
                                </label>
                            </div>
                        </div>
                        <div className={styles.wrapper}>
                            <div className={styles.box}>
                                <p align="left">
                                    <div className={styles.clearButton} onClick={load}><FaUndoAlt />Reset</div>
                                </p>
                            </div>
                            <div className={styles.box}>
                                <p align="right">
                                    <div className={styles.updateButton} onClick={updateAccount}><FaRegSave />Save</div>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateAccount;