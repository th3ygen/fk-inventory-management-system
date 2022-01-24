import { useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import * as alertify from "alertifyjs";
import Swal from "sweetalert";

import Parallax from "parallax-js";

import styles from "styles/common/Register.module.scss";
function Register() {
	const navigate = useNavigate();

	const emailRef = useRef();
	const nameRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const usernameRef = useRef();
	const contactRef = useRef();
	const bgRef = useRef();
	const parallaxRef = useRef(null);

	const register = async (name, email, username, password, contact) => {
		try {
			const response = await fetch(
				"http://localhost:8080/api/auth/register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name,
						email,
						username,
						password,
						contact,
					}),
				}
			);

			if (response.status === 200) {
				await Swal({
					title: "Success",
					text: "You have successfully registered",
					icon: "success",
					button: "OK",
				});
				navigate("/login");
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const passwordConfirm = passwordConfirmRef.current.value;
		const username = usernameRef.current.value;
		const contact = contactRef.current.value;

		if (password !== passwordConfirm) {
			alertify.error("Passwords do not match");
			return;
		}

		register(name, email, username, password, contact);
	};

	useEffect(() => {
		const parallax = new Parallax(bgRef.current, {
			relativeInput: true,
		});
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.whitecontainer}>
				<div className={styles.title}>Register Account</div>
				{/* <div className={styles.description}>
					Please fill in the form.
				</div> */}

				<form className={styles.formPassword} onSubmit={handleSubmit}>
					<div>
						<input
							type="text"
							placeholder="Name"
							ref={nameRef}
						></input>
					</div>

					<div>
						<input
							type="email"
							placeholder="Email"
							ref={emailRef}
						></input>
					</div>

					<div>
						<input
							type="text"
							placeholder="Username"
							ref={usernameRef}
						></input>
					</div>

					<div>
						<input
							type="text"
							placeholder="Contact"
							ref={contactRef}
						></input>
					</div>

					<div>
						<input
							type="password"
							placeholder="Password"
							autoComplete="new-password"
							ref={passwordRef}
						/>
					</div>

					<div>
						<input
							type="password"
							placeholder="Repeat Password"
							autoComplete="new-password"
							ref={passwordConfirmRef}
						/>
					</div>
					<button className={styles.button} type="submit">
						Register
					</button>
					<div className={styles.back} onClick={() => {
						navigate('/login');
					}}>Go to login page</div>
				</form>
			</div>
			<div
				ref={bgRef}
				data-scalar-y="1.5"
				data-scalar-x="2"
				className={styles.bg}
			>
				<div data-depth="0">
					<img src="/img/parallax/s4.png" alt="lol" />
				</div>
				<div data-depth="0.1">
					<img src="/img/parallax/s2.png" alt="lol" />
				</div>
				<div data-depth="0.4">
					<img src="/img/parallax/s3.png" alt="lol" />
				</div>
				<div data-depth="0.9">
					<img src="/img/parallax/s1.png" alt="lol" />
				</div>
			</div>
		</div>
	);
}

export default Register;
