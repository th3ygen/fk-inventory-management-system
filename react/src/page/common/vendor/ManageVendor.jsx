import { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import styles from 'styles/common/vendor/ManageVendor.module.scss';

import Table from 'components/Table.component';
import PageHeader from 'components/PageHeader.component';

function ManageVendor() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const vendorData = {
        header: ["Company Name", "brand", "contact", "email", "Person in Charge", "Contact Number"],
        items: [
            [1,"company 1", "brand 1", "contact 1", "email 1", "pic 1", "contact 1"],
            [2,"company 2", "brand 2", "contact 2", "email 2", "pic 2", "contact 2"]
        ],
        actions: [
            {
                icon: "FaEdit",
                callback: (n) => {
					navigate("/user/vendors/edit");
				},
                tooltip: "Edit",
            },
            {
                icon: "FaTrashAlt",
                callback: (n) => {
					console.log('deleting', n);
				},
                tooltip: "Delete",
            }
        ],
        colWidthPercent: ["20%", "10%", "10%", "10%", "20%", "15%"],
        centered: [false, true, true, true, true, true],
    };

    useEffect(() => {
        setItems(vendorData.items);
    });
    return (
        <div className={styles.container}>
            <PageHeader
                title="Manage Vendor"
                brief="This is the page to manage vendor"
                navs={[
                    {
                        icon: "FaReply",
                        name: "Issue new Vendor",
                        path: "/user/vendors/add",
                    },
                    
                ]}

            />
            <div className={styles.vendorTable}>
                <Table
                    title="Vendors"
                    headers={vendorData.header}
                    items={vendorData.items}
                    centered={vendorData.centered}
                    colWidthPercent={vendorData.colWidthPercent}
                    actions={vendorData.actions}
                />
            </div>
        </div>
    )
}

export default ManageVendor;