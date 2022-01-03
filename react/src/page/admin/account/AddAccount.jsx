import styles from 'styles/admin/account/UpdateAccount.module.scss';

import { FaRegSave, FaArrowLeft } from 'react-icons/fa';

// components
import Table from "components/Table.component";

function AddAccount() {
    return (
        <div>
            <h2 className={styles.header2}>Add New Account</h2>
            <h5 className={styles.header5}>Fill out the form to add new account.</h5>
        <body>
            <div className={styles.form}>
                <form className={styles.formAccount}>
                    <div className={styles.wrapper}>
                        <div className={styles.box}>
                            <label>
                                Name
                                <input type="text" className={styles.inputArea} name="name" placeholder="Farikha Dwi"/>
                            </label>
                        </div>
						<div className={styles.box}>
                            <label>
                                Username
                                <input type="text" className={styles.inputArea} name="username" placeholder="Enter Username"/>
                            </label>
                        </div>
                    </div>

                    <div className={styles.wrapper}>
						<div className={styles.box}>
                            <label>
                                Email
                                <input type="text" className={styles.inputArea} name="email" placeholder="farikhadwi@gmail.com"/>
                            </label>
                        </div>
                        <div className={styles.box}>
                            <label>
                                Password
                                <input type="text" className={styles.inputArea} name="password" placeholder="Enter Password"/>
                            </label>
                        </div>
                    </div>

                    <div className={styles.wrapper}>
                        <div className={styles.box}>
                            <label>
                                Contact
                                <input type="text" className={styles.inputArea} name="contact" placeholder="0895322807641"/>
                            </label>
                        </div>
                        <div className={styles.box}>
                        <label for="role">Role</label>
                        <select id="role" name="role">
                            <option value="manager">Manager</option>
                            <option value="staff">Staff</option>
                            <option value="Admin">Admin</option>
                        </select>
                        </div>
                    </div>

                <label>
					Address
                    <textarea type="text-area" name="address" className={styles.inputTextArea} id="address" rows={9} placeholder="Enter Address"></textarea>
					{/* <input type="text" className={styles.inputArea} name="address" placeholder="Enter Address"/> */}
				</label>

                    {/* <div className={styles.wrapper}>
                        <div className={styles.box}>
                            <label>
                                Created At
                                <input type="text" className={styles.inputArea} name="createdAt" />
                            </label>
                        </div>
                        <div className={styles.box}>
                            <label>
                                Updated At
                                <input type="text" className={styles.inputArea} name="updatedAt" />
                            </label>
                        </div>
                    </div> */}
                    <div className={styles.wrapper}>
                        <div className={styles.box}>
                            <p align="left">
                                <button type="submit" class={styles.backButton}><FaArrowLeft />Back</button>
                            </p>
                        </div>
                        <div className={styles.box}>
                            <p align="right">
                                <button type="submit" class={styles.updateButton}><FaRegSave />Save</button>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </body>
        </div>
    )
}

export default AddAccount;