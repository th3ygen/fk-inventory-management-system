import { trimLeft } from '@amcharts/amcharts5/.internal/core/util/Utils';
import { FaAlignRight, FaUserAlt } from 'react-icons/fa';
import styles from "styles/admin/account/test.scss";

function AddAccount(){
    return (
		<div className={styles.header}>
			<h2 className={styles.header2}>Add New Account</h2>
				<div className={styles.desc}>
					<h5 className={styles.header5}>Fill out the form to add new account.</h5>
				</div>
				<div className={styles.container}>
					{/* 
						TODO folder design 
					*/}
					<form>
						<div class={styles.newAccount}>
							<div class={styles.formAddAccount}>
								<label>
									Name
									<br /><input type="text" className={styles.inputArea} name="name" placeholder="Farikha Dwi"/>
								</label>
							</div>
							<div class={styles.formAddAccount}>
								<label>
									Email
									<br /><input type="text" className={styles.inputArea} name="email" placeholder="farikhadwi@gmail.com"/>
								</label>
							</div>
							<div class={styles.formAddAccount}>
							<label className={styles.role}>Role</label>
								<div className={styles.radio}>
									<label>
										<input type="radio" value="Manager" checked={true} />
										Manager
									</label>
								</div>
								<div className={styles.radio}>
									<label>
										<input type="radio" value="Staff" checked={true} />
										Staff
									</label>
								</div>
								<div className={styles.radio}>
									<label>
										<input type="radio" value="Admin" checked={true} />
										Admin
									</label>
								</div>  
       						</div>
							<div class={styles.formAddAccount}>
								<label>
									Contact
									<br /><input type="text" className={styles.inputArea} name="contact" placeholder="e.g. 0895322807641"/>
								</label>
							</div>
							<div class={styles.formAddAccount}>
								<label>
									Address
									<br /><input type="text" className={styles.inputArea} name="address" placeholder="Enter Address"/>
								</label>
							</div>
							<div class={styles.formAddAccount}>
								<label>
									Username
									<br /><input type="text" className={styles.inputArea} name="username" placeholder="Enter Username"/>
								</label>
							</div>
							<div class={styles.formAddAccount}>
								<label>
									Password
									<br /><input type="text" className={styles.inputArea} name="password" placeholder="Enter Password"/>
								</label>
							</div>
							<div class={styles.formAddAccount}>
								<center><button type="submit" class={styles.addButton}>Save</button></center>
							</div>
						</div>
                    </form>
				</div>
		</div>
	);
}

export default AddAccount;


import styles from 'styles/admin/account/UpdateAccount.module.scss';

import { FaUndo,FaReply,FaEraser,FaSpellCheck } from 'react-icons/fa';

// components
import Table from "components/Table.component";

function UpdateAccount() {
    return (
        <body>
            <div className={styles.form}>
                <form className={styles.formAccount}>
                <label>
                    Name
                    <input type="text" className={styles.inputArea} name="name" placeholder="Farikha Dwi"/>
				</label>
                <label>
					Email
					<input type="text" className={styles.inputArea} name="email" placeholder="farikhadwi@gmail.com"/>
				</label>
                <label>
					Username
					<input type="text" className={styles.inputArea} name="username" placeholder="Enter Username"/>
                </label>
                <label>
					Password
					<input type="text" className={styles.inputArea} name="password" placeholder="Enter Password"/>
				</label>
                <label>
					Contact
					<input type="text" className={styles.inputArea} name="contact" placeholder="0895322807641"/>
				</label>

                <label for="role">Role</label>
                <select id="role" name="role">
                    <option value="manager">Manager</option>
                    <option value="staff">Staff</option>
                    <option value="Admin">Admin</option>
                </select>

                <label>
					Address
                    <textarea type="text-area" name="address" className={styles.inputTextArea} id="address" rows={5} placeholder="Enter Address"></textarea>
					{/* <input type="text" className={styles.inputArea} name="address" placeholder="Enter Address"/> */}
				</label>

                <label>
					Created At
					<input type="text" className={styles.inputArea} name="createdAt" />
				</label>
                <label>
					Updated At
					<input type="text" className={styles.inputArea} name="updatedAt" />
				</label>
  
                <button type="submit" class={styles.updateButton}>Save</button>
                </form>
            </div>
        </body>
    )
}

export default UpdateAccount;