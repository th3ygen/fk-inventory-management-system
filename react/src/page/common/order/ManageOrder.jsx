import styles from 'styles/common/order/ManageOrder.module.scss';

import { FaTrashAlt, FaEdit, FaReply, FaCheckSquare } from 'react-icons/fa';

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// components
import Table from "components/Table.component";
import StatNumber from "components/StatNumber.component";
import StatWrapper from "components/StatWrapper.component";
import PageHeader from 'components/PageHeader.component';

//message
import * as swal from "sweetalert";
import * as alertify from "alertifyjs";

function ManageOrder() {

	const navigate = useNavigate();
	const [items, setItems] = useState([]);
	const [totalOrders, setTotalOrders] = useState(0);
	const [totalApproved, setTotalApproved] = useState(0);
	const [totalReject, setTotalReject] = useState(0);
	const [totalReqDelete, setTotalReqDelete] = useState(0);
	const [totalProgress, setTotalProgress] = useState(0);

	const [disableDelete, setDisableDelete] = useState([]);
	const [readOnly, setReadOnly] = useState([]);
	const [orderStatus, setOrderStatus] = useState({});

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
					navigate("/user/order/approve", {
						replace: true,
						state: { id: n },
					});
				},
				tooltip: "Approve",
			},

		]
	};

	const deleteItem = async (id) => {

		const confirm = await swal({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: 'warning',
			buttons: {
				cancel: 'Cancel',
				delete: {
					text: 'Delete',
					value: 'delete',
				},
			},
		
		});

		if(confirm !== 'delete'){
			return;
		}

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
			await swal("Deleted", "Order Succesfully Deleted!", "error");
			const item = items.find(i => i[0] === id);

			setTotalOrders(totalOrders - 1);

			const status = item[2].split(':')[0];

			if (status === 'Approved') {

				setTotalApproved(totalApproved - 1);


			} else if (status === 'Rejected') {

				setTotalReject(totalReject - 1);


			} else if (status === 'Request Delete') {

				setTotalReqDelete(totalReqDelete - 1);


			} else {

				setTotalProgress(totalProgress - 1);


			}
			setItems(items.filter((i) => i[0] !== id));

		} else {
			console.log(id, request);
			alertify.notify('Error deleting order', 'error');
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
				let tReject = 0;
				let tPending = 0;
				let tReqDel = 0;
				let dDelete = [];
				let dRead = [];
				let oStatus = {};

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
					oStatus[item._id] = item.status;
					let status = 'Pending:#888';
					if (item.status) {
						if (item.status === 'approved') {
							status = item.status.charAt(0).toUpperCase() + item.status.slice(1) + ':#00c853';
							dDelete.push(item._id);


							tApproved++;
						} else if (item.status === 'rejected') {
							status = item.status.charAt(0).toUpperCase() + item.status.slice(1) + ':#e63946';

							dRead.push(item._id);

							tReject++;
						} else if (item.status === 'Request Delete') {
							status = item.status + ':#e63946';

							dRead.push(item._id);

							tReqDel++;
						} else {
							status = item.status.charAt(0).toUpperCase() + item.status.slice(1) + ':#888';
							dRead.push(item._id);

							tPending++;
						}
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
				setTotalReject(tReject);
				setTotalReqDelete(tReqDel);
				setItems(rows);
				setDisableDelete(dDelete);
				setReadOnly(dRead);
				setOrderStatus(oStatus);
			}


		})();
	}, []);

	return (
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
				<StatWrapper >
					<StatNumber
						title="Total Order"
						value={totalOrders || '0'}
						unit="Orders"
						icon="FaShoppingCart"
					/>

					<StatNumber
						title="Progress Order"
						value={totalProgress || '0'}
						unit="Orders"
						icon="FaSpinner"
					/>

					<StatNumber
						title="Approve Order"
						value={totalApproved || '0'}
						unit="Orders"
						icon="FaCheckSquare"
					/>

					<StatNumber
						title="Reject Order"
						value={totalReject || '0'}
						unit="Orders"
						icon="FaTrash"
					/>

					<StatNumber
						title="Request Delete"
						value={totalReqDelete|| '0'}
						unit="Orders"
						icon="FaTrash"
					/>
				</StatWrapper>

			</div>

			<div className={styles.orderTable}>
				<Table
					title="Orders"
					headers={orderData.header}
					items={items}
					centered={orderData.centered}
					colWidthPercent={orderData.colWidthPercent}
					actions={[
						{
							icon: "FaEdit",
							callback: (n) => {
								navigate("/user/order/update", {
									replace: true,
									state: { id: n, status: orderStatus[n] || 'unknown' },
								});
							},
							tooltip: "Edit",
							disabled: disableDelete,
						},
						{
							icon: "FaEye",
							callback: (n) => {
								navigate("/user/order/approve", {
									replace: true,
									state: { id: n, readOnly: true },
								});
							},
							tooltip: "View order",
							disabled: readOnly,
						},
						{
							icon: "FaTrashAlt",
							callback: (n) => {
								deleteItem(n);
							},
							tooltip: "Delete",
							disabled: disableDelete,
						},
						{
							icon: "FaCheckSquare",
							callback: (n) => {
								navigate("/user/order/approve", {
									replace: true,
									state: { id: n },
								});
							},
							tooltip: "Approve",
							disabled: disableDelete,
						},

					]}
				/>
			</div>
		</div>
	)
}

export default ManageOrder;
