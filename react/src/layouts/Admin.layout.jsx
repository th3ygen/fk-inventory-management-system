import { Outlet } from 'react-router-dom';

import Navbar from 'components/Navbar.component';
import Topbar from 'components/Topbar.component';

import styles from 'styles/layout/Admin.module.scss';

export default function AdminLayout() {
    const paths = [
        {
            path: '/settings',
            name: 'Setting',
        },
        {  
            path: '/admin/test',
            name: 'Test',
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