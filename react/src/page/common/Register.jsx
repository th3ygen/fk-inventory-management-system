import styles from "styles/common/Register.module.scss";
function Register() {
	return (
		<div className={styles.container}>
			<div className={styles.whitecontainer}>
				<div className={styles.title}>
					Register Account
				</div>
				<div className={styles.description}> 
				Please fill in the form.
				</div>

				<form className={styles.formPassword}>
					<div>
						<input type="text" placeholder="Email"></input>
					</div>

					<div>
						<input type="text" placeholder="Username"></input>
					</div>

					<div>
						<input type="text" placeholder="Contact"></input>
					</div>
					
					<div>
						<input type="password" placeholder="Password" />
					</div>
                    
					<div>
						<input type="password" placeholder="Repeat Password" />
					</div>
					<a href="/Login"> Login
					</a>
					<div className={styles.button} href="login.html">Register</div>
				</form>
			</div>
		</div>
	);
}

export default Register;
