import styles from "styles/common/UpdatePassword.module.scss";

import { FaRegSave, FaArrowLeft } from "react-icons/fa";

// components
import Table from "components/Table.component";

function UpdateAccount() {
	return (
		<div>
			<h2 className={styles.header2}>Update Password</h2>
			<h5 className={styles.header5}>
				Please enter password that is not used at other sites.
			</h5>
			<body>
				<div className={styles.form}>
					<form className={styles.formAccount}>
						<div className={styles.wrapper}>
							<div className={styles.box}>
								<label>Old Password</label>
								<input
									type="password"
									className={styles.inputArea}
									name="oldpw"
									placeholder="Enter Old Password"
								/>
							</div>
						</div>
						<div className={styles.wrapper}>
							<div className={styles.box}>
								<label>New Password</label>
								<input
									type="password"
									className={styles.inputArea}
									name="newpw"
									placeholder="Enter New Password"
								/>
							</div>
						</div>
						<div className={styles.wrapper}>
							<div className={styles.box}>
								<label>Repeat Password</label>
								<input
									type="password"
									className={styles.inputArea}
									name="repeat"
									placeholder="Repeat Password"
								/>
							</div>
						</div>

						<div className={styles.wrapper}>
							<div className={styles.box}>
								<p align="left">
									<button
										type="submit"
										class={styles.backButton}
									>
										<FaArrowLeft />
										Back
									</button>
								</p>
							</div>
							<div className={styles.box}>
								<p align="right">
									<button
										type="submit"
										class={styles.updateButton}
									>
										<FaRegSave />
										Save
									</button>
								</p>
							</div>
						</div>
					</form>
				</div>
			</body>
		</div>
	);
}

export default UpdateAccount;
