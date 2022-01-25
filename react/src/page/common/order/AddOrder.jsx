import styles from "styles/common/order/Add.module.scss";

import { FaUndo, FaReply, FaEraser, FaCheckSquare } from "react-icons/fa";

import { useState, useRef, useEffect } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';

import Swal from "sweetalert";

// components
import Table from "components/Table.component";

//message
import * as swal from "sweetalert";
import * as alertify from "alertifyjs";

function AddOrder() {

	const [user] = useOutletContext();
	
	const navigate = useNavigate();
	
	const [items, setItems] = useState([]);
	const [vendors, setVendors] = useState([]);
	const [vendor, setVendor] = useState({});
	const [vendorPIC, setVendorPIC] = useState("");

	const [vendorName, setVendorName] = useState("Please select a vendor");
	const vendorRef = useRef();
	const orderRemarks = useRef("");
	const itemName = useRef("");
	const unitPrice = useRef(0);
	const quantity = useRef(0);
	const [grandTotal, setGrandTotal] = useState(0);

	const [basePath, setBasePath] = useState('/user');

	const itemList = {
		header: ["Item", "Quantity", "Unit Price", "Sub Price"],
		colWidthPercent: ["30%", "15%", "15%", "15%"],
		centered: [false, true, true, true],
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

	const getItems = () => {
		let gTotal = grandTotal;
		let rows = items;

        if (itemName.length === 0 || isNaN(quantity.current.value) || isNaN(unitPrice.current.value)) {
            return;
        }

		let item = {
			itemName: itemName.current.value,
			qty: parseInt(quantity.current.value),
			unitPrice: parseFloat(unitPrice.current.value).toFixed(2),
		};

		const subPrice = item.unitPrice * item.qty;

		
		gTotal += subPrice;

		rows.push([item.id || genRandomHash(8), item.itemName, item.qty, item.unitPrice, subPrice.toFixed(2)]);

		itemName.current.value = "";
		quantity.current.value = "";
		unitPrice.current.value = "";

		setItems(rows);
		setGrandTotal(gTotal);
	};

	const editItem = (id) => {
        const item = items.find(item => item[0] === id);

        if (item) {
            itemName.current.value = item[1];
            quantity.current.value = item[2];
            unitPrice.current.value = item[3];
        }

        setItems(items.filter(item => item[0] !== id));
        setGrandTotal(grandTotal - item[4]);
    };

	const addOrder = async () => {
		let order = {
			vendor_ID : vendorRef.current.value,
			comment: orderRemarks.current.value,
			orderItems: items.map(item => {
				return {
					name: item[1],
					quantity: item[2],
					unit_price: item[3],
				}
			})
		}

		const request = await fetch("http://localhost:8080/api/orders/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: "Bearer " + user.token,
			},
			body: JSON.stringify(order),
		});
		
		if (request.status === 200) {
			await swal("Success", "Wait for Manager Verification!", "success");
			navigate(basePath + "/orders");
		} else {
			console.log(request);
			alertify.notify('Error adding order', 'error');
		}
	};

	const selectVendor = (e) => {
		// find vendor by id

		try {
			let vendor;
			if (e.target) {
				vendor = Object.assign(
					{},
					vendors.find((v) => v._id === e.target.value)
				);
			} else {
				vendor = Object.assign({}, e);
			}
	
			delete vendor._id;
			delete vendor.__v;
	
			setVendorName(vendor.brand);
			setVendorPIC(vendor.pic_name);
			setVendor(vendor);
			// replace key names
			// replace underscore with space
			// capitalize first letter
			Object.keys(vendor).forEach((key) => {
				vendor[
					key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
				] = vendor[key];
				delete vendor[key];
			});

		} catch (e) {
			console.log(e);
		}

	};

	useEffect(() => {
		(async () => {
			if (!user) {
				return;
			}

			let path = '/user';
			if (user.role === 'admin') {
				setBasePath('/admin');
				path = '/admin';
			}

			let request = await fetch(
				"http://localhost:8080/api/vendors/list",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						authorization: "Bearer " + user.token,
					},
				}
			);

			const v = await request.json();

			if (v.length === 0) {
				await Swal({
					title: "No vendors found",
					text: "Please add a vendor first",
					icon: "warning",
					button: "OK",
				});

				navigate(path + "/vendors/add");
			}

			selectVendor(v[0]);

			setVendors(v);
			setVendorName(v[0].brand);
			setVendorPIC(v[0].pic_name);

		})();
	}, [user]);

	return (
		<div className={styles.content}>
			<div className={styles.order}>
				<div className={styles.fTitle}> Order Form</div>
				<div className={styles.orderForm}>
					<div className={styles.orderInput}>
						<label className={styles.formLabel} htmlFor="vendor">
							Vendor{" "}
						</label>
						<select
							className={styles.formSelect}
							ref={vendorRef}
							onChange={selectVendor}

						>
							{vendors.map((v, i) => (
								<option key={v._id} value={v._id}>
									{v.company_name || `Vendor ${i + 1}`}
								</option>
							))}
						</select>
					</div>
					<div className={styles.orderInput}>
						<label className={styles.formLabel} htmlFor="remarks">
							Remarks{" "}
						</label>
						<textarea
							className={styles.remarks}
							id="remarks"
							ref={orderRemarks}
						></textarea>
					</div>
					<div className={styles.orderInput}>
						<label className={styles.formLabel} htmlFor="itemName">
							Item Name{" "}
						</label>
						<input
							className={styles.formInput}
							type="text"
							ref={itemName}
						/>
					</div>
					<div className={styles.orderInput}>
						<label className={styles.formLabel} htmlFor="unitPrice">
							Unit Price{" "}
						</label>
						<input
							className={styles.formInput}
							type="number"
							step="0.01"
							ref={unitPrice}
						/>
					</div>
					<div className={styles.orderInput}>
						<label className={styles.formLabel} htmlFor="quantity">
							Quantity{" "}
						</label>
						<input
							className={styles.formInput}
							type="number"
							ref={quantity}
						/>
					</div>
					<div className={styles.itemButton}>
						<div className={styles.button} onClick={getItems}>
							<FaReply /> Update List{" "}
						</div>
					</div>
				</div>
			</div>

			<div className={styles.itemList}>
				<div className={styles.itemTable}>
					<Table
						title="Item List"
						headers={itemList.header}
						items={items}
						centered={itemList.centered}
						colWidthPercent={itemList.colWidthPercent}
						actions={[
							{
								icon: "FaReply",
								callback: (id) => {
									editItem(id);
								},
								tooltip: "Edit",
							},
						]}
					/>
				</div>
				<div className={styles.summary}>
					<div className={styles.sumContent}>
						<div className={styles.contSum}>
							<label
								className={styles.sLabel}
								htmlFor="grandTotal"
							>
								Grand Total 
							</label>
							<div className={styles.vendor} htmlFor="gTotal">
								: RM {grandTotal.toFixed(2)}
							</div>
						</div>
						<div className={styles.contSum}>
							<label
								className={styles.sLabel}
								htmlFor="vendorSummary"
							>
								Vendor
							</label>
							<div className={styles.vendorDetails} htmlFor="vendorS">
								<div className={styles.vendor}>
									: {vendorName}
								</div>
								<div className={styles.vendor}>
									: {vendorPIC}
								</div>
							</div>
						</div>
						<div className={styles.butOrder}>
							<div className={styles.button} onClick={() => {
                                itemName.current.value = "";
								quantity.current.value = "";
								unitPrice.current.value = "";
								setVendorName("");
								orderRemarks.current.value = "";
                                setItems([]);
                                setGrandTotal(0);
                            }}>
								<FaEraser /> Reset
							</div>
							<div className={styles.button} onClick={addOrder}>
								<FaCheckSquare />
								Submit for Approval
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddOrder;
