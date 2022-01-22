import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import styles from "styles/layout/User.module.scss";

import Navbar from "components/Navbar.component";
import Topbar from "components/Topbar.component";

export default function UserLayout(props) {
	const [user, setUser] = useState(null);

	const paths = [
		{
			path: "/user/inventory",
			name: "Inventory",
			icon: "FaBox",
		},
		{
			path: "/user/orders",
			name: "Orders",
			icon: "FaReceipt",
		},
		{
			path: "/user/vendors",
			name: "Vendors",
			icon: "FaShoppingBag",
		},
		{
			path: "/user/report",
			name: "Report",
			icon: "FaClipboardList",
		},
		{
			path: "/user/inbox",
			name: "Inbox",
			icon: "FaInbox",
		},
	];

	useEffect(() => {
		try {
			const u = JSON.parse(localStorage.getItem("user"));

			if (u) {
				setUser(u);
			}
		} catch (e) {	
			console.error(e);
		}
	}, []);

	return (
		<div>
			<Topbar />
			<Navbar paths={paths} />
			<div className={styles.content}>
				<Outlet context={[user]}/>
			</div>
		</div>
	);
}