import * as React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

import styles from "styles/component/Navbar.module.scss";

function CustomLink({ children, to, ...props }: LinkProps) {
	let resolved = useResolvedPath(to);
	let match = useMatch({ path: resolved.pathname, end: true });

	return (
		<div>
			<Link
				style={{ color: match ? "#444444" : "#000" }}
				to={to}
				{...props}
			>
				{children}
			</Link>
		</div>
	);
}

export default function Navbar({ ...props }) {
	return (
		<div>
			<nav className={styles.nav}>
                <div className={styles['title-card']}>
                    <div className={styles.logo}>
                        {/* <Image src="/logo.png" width={100} height={100} alt=''/> */}
                    </div>
                    <div className={styles.text}>
                        <div className={`${styles.title} card-text`}>
                            Title here
                        </div>
                        <div className={`${styles.label} card-text`}>
                            Location
                        </div>
                    </div>
                </div>
				<div className={styles.links}>
					{props.paths.map((path, index) => (
						<div key={index} className={styles.link}>
							<CustomLink to={path.path}>
								{path.name}
							</CustomLink>
						</div>
					))}
				</div>
			</nav>
		</div>
	);
}
