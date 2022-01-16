import styles from 'styles/common/order/ManageOrder.module.scss';

import { FaTrashAlt,FaEdit,FaReply,FaCheckSquare } from 'react-icons/fa';

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// components
import Table from "components/Table.component";
import NumberWidget from 'components/NumberWidget.component';
import PageHeader from 'components/PageHeader.component';

function ManageOrder() {

    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    const orderData = {
		header: ["Order ID", "Vendor", "Order Status", "Last Updated"],
		items: [
			[1,"Item 1", "Item 2", "Active", "Item 4"],
			[2,"Item 1", "Item 2", "Item 3", "Item 4"],
			[3,"Item 1", "Item 2", "Item 3", "Item 4"],
            [4,"Item 1", "Item 2", "Item 3", "Item 4"],
			[5,"Item 1", "Item 2", "Item 3", "Item 4"],
			[6,"Item 1", "Item 2", "Item 3", "Item 4"],
			[7,"Item 1", "Item 2", "Item 3", "Item 4"],
			[8,"Item 1", "Item 2", "Item 3", "Item 4"],
			[9,"Item 1", "Item 2", "Item 3", "Item 4"],
			[10,"Item 1", "Item 2", "Item 3", "Item 4"],
			[11,"Item 1", "Item 2", "Item 3", "Item 4"],
			[12,"Item 1", "Item 2", "Item 3", "Item 4"],
			[13,"Item 1", "Item 2", "Item 3", "Item 4"],
			[14,"Item 1", "Item 2", "Item 3", "Item 4"],
			[15,"Item 1", "Item 2", "Item 3", "Item 4"],
			[16,"Item 1", "Item 2", "Item 3", "Item 4"],
			[17,"Item 1", "Item 2", "Item 3", "Item 4"],
			[18,"Item 1", "Item 2", "Item 3", "Item 4"],
			[19,"Item 1", "Item 2", "Item 3", "Item 4"],
			[20,"Item 1", "Item 2", "Item 3", "Item 4"],
			[21,"Item 1", "Item 2", "Item 3", "Item 4"],
			[22,"Item 1", "Item 2", "Item 3", "Item 4"],
			[23,"Item 1", "Item 2", "Item 3", "Item 4"],
			[24,"Item 1", "Item 2", "Item 3", "Item 4"],
			[25,"Item 1", "Item 2", "Item 3", "Item 4"],
		],
		colWidthPercent: ["30%", "20%", "10%", "10%"],
		centered: [false, true, true, true],
		actions: [
			{
				icon: "FaEdit",
				callback: (n) => {
					navigate("/user/order/update");
				},
				tooltip: "Edit",
			},
			{
				icon: "FaTrashAlt",
				callback: (n) => {
					console.log('deleting', n);
				},
				tooltip: "Delete",
			},
			{
				icon: "FaCheckSquare",
				callback: (n) => {
					navigate("/user/order/approve");
				},
				tooltip: "Approve",
			},

		]
	};

    const orderSummary = [
        {
            title: "Total Order",
            label: "Orders",
            value: "101",
        },
        {
            title: "Approve Order",
            label: "Today Approve",
            value: "5",
        },
        {
            title: "Progress Order",
            label: "Progress",
            value: "10",
        },

    ];

    useEffect(() => {
		setItems(orderData.items);
	}, []);

    return(
        <div className={styles.container}>
            <PageHeader
                title="Manage Order"
                brief="This is the Main Page of Order where you can manage all your order here."
                navs={[
                    {
                        icon: "FaReply",
                        name: "Issue New Order",
                        path: "/user/order/add",
                    },
                    
                ]}

            />

            <div className={styles.summary}>
                {orderSummary.map((item, i) => (
                    <NumberWidget key={i} {...item} />
                ))}
            </div>

            <div className={styles.orderTable}>
                <Table
					title="Orders"
					headers={orderData.header}
					items={items}
					centered={orderData.centered}
					colWidthPercent={orderData.colWidthPercent}
					actions={orderData.actions}
				/>
            </div>
        </div>
    )
}

export default ManageOrder;
