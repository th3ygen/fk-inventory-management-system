import styles from "styles/common/Login.module.scss";
function Login() {
	return (
		<div className={styles.container}>
			<div className={styles.whitecontainer}>
				<div className={styles.title}>
					Login
				</div>
				<div className={styles.description}> 
				Please enter Username and Password.
				</div>

				<form className={styles.formPassword}>
					
					<div>
						<input type="username" placeholder="Username" />
					</div>
                    
					<div>
						<input type="password" placeholder="Password" />
					</div>
					<div className={styles.button} href="login.html">Login</div>
					<a href="/Register"> Register
					</a>
					<a href="/ForgotPassword"> Forgot Password
					</a>
				</form>
			</div>
		</div>
	);
}

export default Login;
