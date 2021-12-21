import { Outlet } from 'react-router-dom';

import styles from 'styles/layout/User.module.scss';

import Navbar from 'components/Navbar.component';
import Topbar from 'components/Topbar.component';

export default function UserLayout() {
    const paths = [
        {
            path: '/user/inventory',
            name: 'Inventory',
        },
        {  
            path: '/user/orders',
            name: 'Orders',
        },
        {  
            path: '/user/vendors',
            name: 'Vendors',
        },
        {  
            path: '/user/vendors',
            name: 'Vendors',
        },
        {
            path: '/user/report',
            name: 'Report',
        },
        {
            path: '/user/inbox',
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