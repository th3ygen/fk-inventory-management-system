import { FaUserAlt } from 'react-icons/fa';
import styles from "styles/admin/account/AddAccount.module.scss";

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
									<br /><input type="text" className={styles.inputArea} name="name" placeholder="eg. Farikha Dwi"/>
								</label>
							</div>
							<div class={styles.formAddAccount}>
								<label>
									Email
									<br /><input type="text" className={styles.inputArea} name="email" placeholder="example@gmail.com"/>
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
									<br /><input type="text" className={styles.inputArea} name="contact" placeholder="0895322807641"/>
								</label>
							</div>
							<div class={styles.formAddAccount}>
								<label>
									Address
									<br /><input type="text" className={styles.inputArea} name="address" placeholder="Jl. Pondok Kampial Permai"/>
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
								<button type="submit" class={styles.addButton}>Save</button>
							</div>
						</div>
                    </form>
				</div>
		</div>
	);
}

export default AddAccount;