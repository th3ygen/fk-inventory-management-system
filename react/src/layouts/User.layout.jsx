import { Outlet } from 'react-router-dom';

import styles from 'styles/layout/User.module.scss';

import Navbar from 'components/Navbar.component';
import Topbar from 'components/Topbar.component';

export default function UserLayout() {
    const paths = [
        {
            path: '/user/productivity',
            name: 'Productivity',
            icon: 'FaBox',
        },
        {  
            path: '/user/visualization',
            name: 'Visualization',
            icon: 'FaReceipt',
        },
        {  

            path: '/user/facilities',
            name: 'Facilites',
            icon: 'FaShoppingBag',
        },
        {
            path: '/user/',
            name: 'Home',
            icon: 'FaClipboardList',
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