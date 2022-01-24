import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as alertify from "alertifyjs";

import Parallax from "parallax-js";

import styles from "styles/common/Login.module.scss";
function Login() {
	const navigate = useNavigate();

	const bgRef = useRef();
	const usernameRef = useRef();
	const passwordRef = useRef();

	const login = async () => {
		try {
			let res, req;

			req = await fetch("http://localhost:8080/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: usernameRef.current.value,
					password: passwordRef.current.value,
				}),
			});

			if (req.status === 200) {
				res = await req.json();

				localStorage.setItem('user', JSON.stringify({
					username: res.username,
					role: res.role || 'staff',
					name: res.name,
					token: res.token,
				}));

				const path = res.role === 'admin' ? '/admin' : '/user/inventory';

				navigate(path, { state: { user: {
					username: res.username,
					role: res.role || 'staff',
					name: res.name,
					token: res.token,
				} }, replace: true })
			} else {
				alertify.error("Unauthorized access");
			}
		} catch (e) {
			alertify.error("Error logging in");
			console.log(e);
		}
	}

	const onEnter = (e) => {
		if (e.key === 'Enter') {
			login();
		}
	};

	useEffect(() => {
		try {
			const user = localStorage.getItem('user');

			if (user) {
				if (user.role === 'admin') {
					navigate("/admin", { state: { user: JSON.parse(user) }, replace: true });
				} else {
					navigate("/user/inventory", { state: { user: JSON.parse(user) }, replace: true });
				}
			}
		} catch (e) {
			console.log('log', e);
		}
	}, []);

	useEffect(() => {
		const parallax = new Parallax(bgRef.current, {
			relativeInput: true,
		});
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.whitecontainer}>
				<div className={styles.title}>
					Login
				</div>
				

				<form className={styles.formPassword}>
					
					<div>
						<input type="username" placeholder="Username" ref={usernameRef}/>
					</div>
                    
					<div>
						<input type="password" placeholder="Password" ref={passwordRef} onKeyPress={onEnter}/>
					</div>
					<div className={styles.button} onClick={login}>Login</div>
					<div className={styles.button} onClick={() => navigate('/register')}>Register</div>
					<a href="/ForgotPassword"> Forgot Password
					</a>
				</form>
			</div>

			<div
				ref={bgRef}
				data-scalar-y="1.5"
				data-scalar-x="3"
				className={styles.bg}
			>
				<div data-depth="0">
					<img src="/img/parallax/j4.png" alt="lol" />
				</div>
				<div data-depth="0.1">
					<img src="/img/parallax/j3.png" alt="lol" />
				</div>
				<div data-depth="0.4">
					<img src="/img/parallax/j2.png" alt="lol" />
				</div>
				<div data-depth="0.9">
					<img src="/img/parallax/j1.png" alt="lol" />
				</div>
			</div>
		</div>
	);
}

export default Login;
