import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from 'components/Navbar.component';
import Topbar from 'components/Topbar.component';

import styles from 'styles/layout/Admin.module.scss';

export default function AdminLayout() {
    const [user, setUser] = useState(null);

    const paths = [
        {
            path: '/admin/accounts',
            name: 'Accounts',
            icon: 'FaUserFriends',
        },
        {
            path: '/admin/inventory',
            name: 'Inventory',
            icon: 'FaBox',
        },
        {
            path: '/admin/orders',
            name: 'Orders',
            icon: 'FaReceipt',
        },
        {
            path: '/admin/vendors',
            name: 'Vendors',
            icon: 'FaShoppingBag',
        },
        {
            path: '/admin/report',
            name: 'Report',
            icon: 'FaClipboardList',
        },
        {
            path: '/admin/inbox',
            name: 'Inbox',
            icon: 'FaInbox',
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
            <Navbar paths={ paths } user={user}/>
            <div className={ styles.content }>
                <Outlet context={[user]}/>
            </div>
        </div>
    );
}