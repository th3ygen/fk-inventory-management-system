import { useNavigate } from "react-router-dom";

import styles from "styles/common/Register.module.scss";
function Register() {
	const navigate = useNavigate();

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
					<div className={styles.button} onClick={() => navigate('/login')}>Login</div>
					<div className={styles.button}>Register</div>
				</form>
			</div>
		</div>
	);
}

export default Register;
