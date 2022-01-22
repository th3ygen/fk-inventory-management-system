import styles from "styles/common/order/Approve.module.scss";

import { FaSave, FaTrashAlt } from "react-icons/fa";

import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, useOutletContext } from "react-router-dom";

//message
import * as swal from "sweetalert";
import * as alertify from "alertifyjs";

// components
import Table from "components/Table.component";

function ApproveOrder() {

	const [user] = useOutletContext();

	const [items, setItems] = useState([]);

	const location = useLocation();
	const navigate = useNavigate();

	const [vendor, setVendor] = useState("");
	const [grandTotal, setGrandTotal] = useState(0);
	const [vendorPIC, setVendorPIC] = useState("");
	const [orderRemarks, setOrderRemarks] = useState("");
	const [readOnly, setReadOnly] = useState(false);

	const [vendorName, setVendorName] = useState("Please select a vendor");
	const managerID = useRef("");
	const managerRemarks = useRef("");
	const approved = useRef("");
	const rejected = useRef("");

	const itemList = {
		header: ["Item", "Quantity", "Unit Price", "Sub Price"],
		colWidthPercent: ["30%", "20%", "15%", "15%"],
		centered: [false, true, true, true],
	};

	const deleteOrder = async () => {

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

		if (confirm !== 'delete') {
			return;
		}

		// delete item with id from itemsData.items
		const request = await fetch(
			"http://localhost:8080/api/orders/delete/" + location.state.id,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + user.token,
				},
			}
		);

		if (request.status === 200) {
			await swal("Deleted", "Order Has Been Deleted!", "error");
			navigate("/user/orders");
		} else {
			console.log(location.state.id, request);
			alertify.notify('Error deleting order', 'error');
		}
	};

	const genRandomHash = (len) => {
		// generate random 8byte hash
		let text = "";

		const possible =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (let i = 0; i < len; i++)
			text += possible.charAt(
				Math.floor(Math.random() * possible.length)
			);

		return text;
	};

	const loadData = async () => {
		let vendorId = "";
		let request;

		if (location.state.id) {
			request = await fetch("http://localhost:8080/api/orders/find/" + location.state.id, 
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + user.token,
				},
			});

			if (request.status === 200) {
				const item = await request.json();

				const oRemarks = item.comment;
				vendorId = item.vendor_ID;

				setItems(
					item.items.map((i) => [
						genRandomHash(8),
						i.name,
						i.quantity,
						i.unit_price,
						(i.quantity * i.unit_price).toFixed(2),
					])
				);

				const total = item.items.reduce(
					(acc, i) => acc + i.quantity * i.unit_price,
					0
				);

				setOrderRemarks(oRemarks);
				setGrandTotal(total);
			}
		}

		request = await fetch(
			"http://localhost:8080/api/vendors/get/" + vendorId,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + user.token,
				},
			});

		if (request.status === 200) {
			const vendor = await request.json();

			setVendor(vendor.company_name);
			setVendorName(vendor.brand);
			setVendorPIC(vendor.pic_name);
		}
	};

	/* useEffect(() => {
		loadData();
	}, []); */

	useEffect(() => {
		if (location.state.id) {
			loadData();
		}

		if (location.state.readOnly) {
			setReadOnly(true);
		}
	}, [location.state.id, location.state.readOnly, user]);

	const approveOrder = async () => {
		let order = {
			id: location.state.id,
			status: approved.current.checked === true ? "approved" : "rejected",
			managerID: user.id,
			managerRemarks: managerRemarks.current.value,
		};

		const request = await fetch(
			"http://localhost:8080/api/orders/verifiedOrder",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + user.token,
				},
				body: JSON.stringify(order),
			}
		);

		if (request.status === 200) {
			await swal("Verified", "Order Had Been Verified!", "success");
			navigate("/user/orders");
		} else {
			console.log(request);
			alertify.notify('Error verified order', 'error');
		}
	};

	return (
		<div className={styles.content}>
			<div className={styles.order}>
				<div className={styles.orderDetails}>
					<div className={styles.manager}>
						<div className={styles.managerTitle}>Order Details</div>
						<div className={styles.managerContent}>
							<div className={styles.contSum}>
								<label
									className={styles.managerLabel}
									htmlFor="orderIDLabel"
								>
									Order ID:{" "}
								</label>
								<label
									className={styles.managerLabel}
									htmlFor="orderID"
								>
									123abc123{" "}
								</label>
							</div>
							<div className={styles.contSum}>
								<label
									className={styles.managerLabel}
									htmlFor="vendorLabel"
								>
									Vendor:{" "}
								</label>
								<div className={styles.managerLabel}>
									{vendor}
								</div>
							</div>
							<div className={styles.contSum}>
								<label
									className={styles.managerLabel}
									htmlFor="detailLabel"
								>
									Vendor Details:{" "}
								</label>
								<div className={styles.details}>
									{vendorName}
								</div>
								<div className={styles.details}>
									{vendorPIC}
								</div>
							</div>
							<div className={styles.contSum}>
								<label
									className={styles.managerLabel}
									htmlFor="remarkLabel"
								>
									Remarks:{" "}
								</label>
								<div className={styles.details}>
									{" "}
									: {orderRemarks}{" "}
								</div>
							</div>
							<div className={styles.contSum}>
								<label
									className={styles.managerLabel}
									htmlFor="grandTotal"
								>
									Grand Total:{" "}
								</label>
								<div className={styles.managerLabel}>
									: RM {grandTotal.toFixed(2)}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.itemTable}>
					<Table
						title="Item List"
						headers={itemList.header}
						items={items}
						centered={itemList.centered}
						colWidthPercent={itemList.colWidthPercent}
					/>
				</div>

				<div className={styles.formDetails}>
					<div className={styles.fTitle}>Manager Verification</div>
					<div className={styles.orderForm}>
						<div className={styles.orderInput}>
							<label
								className={styles.formLabel}
								htmlFor="manager"
							>
								Manager:{" "}
							</label>
							<input
								className={styles.formInput}
								type="text"
								ref={managerID}
								disabled={readOnly}
								readOnly={readOnly}
							/>
						</div>
						<div className={styles.orderInput}>
							<label
								className={styles.formLabel}
								htmlFor="remarks"
							>
								Remarks{" "}
							</label>
							<textarea
								className={styles.remarks}
								ref={managerRemarks}
								disabled={readOnly}
								readOnly={readOnly}
							></textarea>
						</div>

						<div className={styles.orderInput}>
							<label
								className={styles.formLabel}
								htmlFor="verify"
							>
								Verify{" "}
							</label>
							<div className={styles.formRadioG}>
								<input
									className={styles.formRadio}
									type="radio"
									name="status"
									ref={approved}
									value="Approved"
									disabled={readOnly}
									readOnly={readOnly}
								/>
								<label
									className={styles.formLabel}
									htmlFor="approve"
								>
									Approved{" "}
								</label>
							</div>
							<div className={styles.formRadioG}>
								<input
									className={styles.formRadio}
									type="radio"
									name="status"
									ref={rejected}
									value="Rejected"
									disabled={readOnly}
									readOnly={readOnly}
								/>
								<label
									className={styles.formLabel}
									htmlFor="rejected"
								>
									Rejected{" "}
								</label>
							</div>
						</div>

						<div className={styles.verifyButton}>
							{!readOnly && (
								<>
									<div
										className={styles.button}
										onClick={deleteOrder}
									>
										<FaTrashAlt /> Delete{" "}
									</div>
									<div
										className={styles.button}
										onClick={approveOrder}
									>
										<FaSave /> Submit{" "}
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ApproveOrder;
