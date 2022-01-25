import { useRef } from "react";
import { useOutletContext, useLocation, useNavigate } from "react-router-dom";

import styles from "styles/common/UpdatePassword.module.scss";

import { FaRegSave, FaArrowLeft } from "react-icons/fa";

import * as alertify from "alertifyjs";
import Swal from "sweetalert";

// components
import Table from "components/Table.component";

function UpdateAccount() {
	const location = useLocation();
	const navigate = useNavigate();

	const [user] = useOutletContext();

	const newPassword = useRef();
	const confirmPassword = useRef();

	const updatePassword = async (e) => {
		e.preventDefault();
		try {
			if (confirmPassword.current.value !== newPassword.current.value) {
				alertify.error("Passwords do not match");
				return;
			}

			const req = await fetch(
				"http://localhost:8080/api/accounts/updatePassword/" +
					location.state.id,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						authorization: "Bearer " + user.token,
					},
					body: JSON.stringify({
						password: newPassword.current.value,
					}),
				}
			);

			if (req.status === 200) {
				await Swal({
					title: "Success",
					text: "Password updated successfully",
					icon: "success",
					button: "OK",
				});

				navigate(-1);
			}
		} catch (e) {
			console.error(e);
		}
	};

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
								<label>New Password</label>
								<input
									type="password"
									className={styles.inputArea}
									name="newpw"
									placeholder="Enter New Password"
									autoComplete="new-password"
									ref={newPassword}
								/>
							</div>
						</div>
						<div className={styles.wrapper}>
							<div className={styles.box}>
								<label>Confirm Password</label>
								<input
									type="password"
									className={styles.inputArea}
									name="repeat"
									placeholder="Confirm Password"
									autoComplete="new-password"
									ref={confirmPassword}
								/>
							</div>
						</div>

						<div className={styles.wrapper}>
							<div className={styles.box}>
								<p align="left">
									<button
										type="Submit"
										class={styles.backButton}
										onClick={(e) => {
											e.preventDefault();

											navigate(-1);
										}}
									>
										<FaArrowLeft />
										Back
									</button>
								</p>
							</div>
							<div className={styles.box}>
								<p align="right">
									<button
										type="Submit"
										class={styles.updateButton}
										onClick={updatePassword}
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
