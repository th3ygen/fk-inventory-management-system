import styles from "styles/common/ForgotPassword.module.scss";
function ForgotPassword() {
	return (
		<div className={styles.container}>
			<div>
				<div>
					<div> Enter new password</div>
				</div>

				<form>
					<div>
						<input type="text" id="" placeholder="Username"></input>
					</div>

					<div>
						<input type="password" id="" placeholder="Password" />
					</div>
					<a href="login.html">Update</a>
				</form>
			</div>
		</div>
	);
}

export default ForgotPassword;
