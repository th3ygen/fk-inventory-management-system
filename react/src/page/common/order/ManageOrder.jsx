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
	const [totalApproved, setTotalApproved] = useState(0);
	const [totalProgress, setTotalProgress] = useState(0);

    const orderData = {
		header: ["Vendor", "Order Status", "Issue Date", "Approve Date"],
		colWidthPercent: ["30%", "20%", "10%", "10%"],
		centered: [false, true, true, true],
		actions: [
			{
				icon: "FaEdit",
				callback: (n) => {
					navigate("/user/order/update", {
						replace: true,
						state: { id: n },
					});
				},
				tooltip: "Edit",
			},
			{
				icon: "FaTrashAlt",
				callback: (n) => {
					deleteItem(n);
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
			"http://localhost:8080/api/orders/delete/" + id,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (request.status === 200) {
			const item = items.find(i => i[0] === id);

			setTotalOrders(totalOrders - 1);
			if(item[2] === 'Approved'){
				setTotalApproved(totalApproved -1);
			}
			setItems(items.filter((i) => i[0] !== id));
			
		} else {
			console.log(id, request);
			alert("Error deleting item");
		}
	};

	useEffect(() => {
		(async () => {
			let request = await fetch(
				"http://localhost:8080/api/orders/get",
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

				let tApproved = 0;
				let tPending = 0;

				response.forEach((item) => {

					let date = new Date(item.createdAt);

					const createdAt = `${date.getHours()}.${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

					// convert updatedAt to date string
					// dd/mm/yyyy
					let approvedAt = '-';

					if (item.approvedAt) {
						date = new Date(item.updatedAt);
						approvedAt = `${date.getHours()}.${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
					}

					let status = 'Pending:#888';
					if (item.status) {
						if (item.status === 'Approved') {
							status = item.status + ':#00c853';

							tApproved++;
						}
					}else{

						tPending++;
					}

					rows.push([
						item._id,
						item.vendor_name,
						status,
						createdAt,
						approvedAt,
					]);
				});

				setTotalOrders(rows.length);
				setTotalApproved(tApproved);
				setTotalProgress(tPending);
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
					value={totalApproved}
					style={{fontSize: "24px"}}
				/>
				<NumberWidget
					title="Progress Order"
					label="Progress"
					value={totalProgress}
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
