import { Outlet } from 'react-router-dom';

import styles from 'styles/layout/User.module.scss';

import Navbar from 'components/Navbar.component';
import Topbar from 'components/Topbar.component';

export default function UserLayout() {
    const paths = [
        {
            path: '/user',
            name: 'User',
        },
        {  
            path: '/user/profile',
            name: 'Profile',
        }
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