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
	const [totalOrders, setTotalOrders] = useState(0);

    const orderData = {
		header: ["Vendor", "Order Status", "issue date", "Last Updated"],
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

	const deleteItem = async (id) => {
		// delete item with id from itemsData.items
		const request = await fetch(
			"http://localhost:8080/api/order/delete/" + id,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (request.status === 200) {
			setItems(items.filter((i) => i._id !== id));
		} else {
			console.log(id, request);
			alert("Error deleting item");
		}
	};

	useEffect(() => {
		(async () => {
			let request = await fetch(
				"http://localhost:8080/api/order/get",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (request.status === 200) {
				let response = await request.json();

				let rows = [];

				response.forEach((item) => {

					rows.push([
						item._id,
						item.vendor_name,
						item.status,
						item.issue_date,
						item.approve_date || "DELETED:#4a5355",
					]);
				});

				setTotalOrders(rows.length);
				setItems(rows);
			}

			
		})();
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
				<NumberWidget
					title="Total Order"
					label="Orders"
					value={totalOrders}
					style={{fontSize: "24px"}}
				/>
				<NumberWidget
					title="Approve Order"
					label="Approve"
					value="5"
					style={{fontSize: "24px"}}
				/>
				<NumberWidget
					title="Progress Order"
					label="Progress"
					value="10"
					style={{fontSize: "24px"}}
				/>
				
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
