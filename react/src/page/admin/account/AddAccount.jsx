import { useEffect, useRef, useState } from "react";
import styles from 'styles/admin/account/AddAccount.module.scss';

import { FaRegSave, FaUndoAlt} from 'react-icons/fa';

function AddAccount() {
	const nameInput = useRef("");
	const emailInput = useRef("");
	const roleInput = useRef("");
	const contactInput = useRef("");
    const addressInput = useRef("");
	const usernameInput = useRef("");
	const passwordInput = useRef("");

    const addAccount = async () => {
		let account = {
			name: nameInput.current.value,
			email: emailInput.current.value,
            role: roleInput.current.value,
			contact: contactInput.current.value,
            address: addressInput.current.value,
			username: usernameInput.current.value,
			password: passwordInput.current.value,
		};

		const request = await fetch("http://localhost:8080/api/accounts/add", {
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

    return (
        <div>
            <h2 className={styles.header2}>Add New Account</h2>
            <h5 className={styles.header5}>Fill out the form to add new account.</h5>
        <div className={styles.body}>
            <div className={styles.form}>
                <form className={styles.formAccount}>
                    <div className={styles.wrapper}>
                        <div className={styles.box}>
                            <label>
                                Name
                                <input type="text" ref={nameInput} className={styles.inputData} name="name" placeholder="Farikha Dwi"/>
                            </label>
                        </div>
						<div className={styles.box}>
                            <label>
                                Username
                                <input type="text" ref={usernameInput} className={styles.inputData} name="username" placeholder="Enter Username"/>
                            </label>
                        </div>
                    </div>

                    <div className={styles.wrapper}>
						<div className={styles.box}>
                            <label>
                                Email
                                <input type="text" ref={emailInput} className={styles.inputData} name="email" placeholder="farikhadwi@gmail.com"/>
                            </label>
                        </div>
                        <div className={styles.box}>
                            <label>
                                Password
                                <input type="text" ref={passwordInput} className={styles.inputData} name="password" placeholder="Enter Password"/>
                            </label>
                        </div>
                    </div>

                    <div className={styles.wrapper}>
                        <div className={styles.box}>
                            <label>
                                Contact
                                <input type="text" ref={contactInput} className={styles.inputData} name="contact" placeholder="0895322807641"/>
                            </label>
                        </div>
                        <div className={styles.box}>
                        <label htmlFor="role">Role</label>
                        <select id="role" name="role" ref={roleInput}>
                            <option value="Manager">Manager</option>
                            <option value="Staff">Staff</option>
                            <option value="Admin">Admin</option>
                        </select>
                        </div>
                    </div>

                <label>
					Address
                    <textarea type="text-area" name="address" className={styles.inputTextArea} ref={addressInput} id="address" rows={9} placeholder="Enter Address"></textarea>
				</label>
                
                    <div className={styles.wrapper}>
                        <div className={styles.box}>
                            <p align="left">
                                <button type="submit" className={styles.clearButton}><FaUndoAlt />Reset</button>
                            </p>
                        </div>
                        <div className={styles.box}>
                            <p align="right">
                                <button type="submit" className={styles.updateButton} onClick={addAccount}><FaRegSave />Save</button>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default AddAccount;