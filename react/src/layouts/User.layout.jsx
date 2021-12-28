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
            path: '/user/tests',
            name: 'Test',
        },
        {  
            path: '/user/manage',
            name: 'Manage',
        },

        {  
            path: '/user/add',
            name: 'Add',
        },

        {  
            path: '/user/update',
            name: 'Update',
        },

        {  
            path: '/user/order',
            name: 'Order',
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