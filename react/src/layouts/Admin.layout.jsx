import { Outlet } from 'react-router-dom';

import Navbar from 'components/Navbar.component';
import Topbar from 'components/Topbar.component';

import styles from 'styles/layout/Admin.module.scss';

export default function AdminLayout() {
    const paths = [
        {
            path: '/admin/accounts',
            name: 'Accounts',
        },
        {
            path: '/admin/inventory',
            name: 'Inventory',
        },
        {
            path: '/admin/orders',
            name: 'Orders',
        },
        {
            path: '/admin/vendors',
            name: 'Vendors',
        },
        {
            path: '/admin/report',
            name: 'Report',
        },
        {
            path: '/admin/inbox',
            name: 'Inbox',
        },
    ];

    return (
        <div>
            <Topbar />
            <Navbar paths={ paths }/>
            <div className={ styles.content }>
                <Outlet />
            </div>
        </div>
    );
}