import styles from "styles/common/order/Add.module.scss";

import { FaUndo, FaReply, FaEraser, FaCheckSquare } from "react-icons/fa";

import { useState, useRef, useEffect } from "react";

// components
import Table from "components/Table.component";

function AddOrder() {
	const [items, setItems] = useState([]);
	const [vendorName, setVendorName] = useState("Please select a vendor");
	const vendorRef = useRef();
	const orderRemarks = useRef("");
	const itemName = useRef("");
	const unitPrice = useRef(0);
	const quantity = useRef(0);
	const [grandTotal, setGrandTotal] = useState(0);

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
			unitPrice: parseFloat(unitPrice.current.value),
		};

		const subPrice = item.unitPrice * item.qty;

		gTotal += subPrice;

		rows.push([item.id || genRandomHash(8), item.itemName, item.qty, item.unitPrice, subPrice]);

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

	const vendorSelect = () => {
		setVendorName(vendorRef.current.value);
	};

	const addOrder = async () => {
		let order = {
			vendor_ID : "61d7e9601481131149c1b34b",
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
			},
			body: JSON.stringify(order),
		});
		
		if (request.status === 200) {
			alert("Item added successfully");
		} else {
			console.log(request);
			alert("Error adding item");
		}
	};

	return (
		<div className={styles.content}>
			<div className={styles.order}>
				<div className={styles.fTitle}> Order Form</div>
				<div className={styles.orderForm}>
					<div className={styles.orderInput}>
						<label className={styles.formLabel} for="vendor">
							Vendor{" "}
						</label>
						<select
							className={styles.formSelect}
							id="vendor"
							name="vendor"
							ref={vendorRef}
							onChange={vendorSelect}
						>
							<option>K2 SDN BHD</option>
							<option>RO SDN BHD</option>
							<option>LA INDUSTRY</option>
						</select>
					</div>
					<div className={styles.orderInput}>
						<label className={styles.formLabel} for="remarks">
							Remarks{" "}
						</label>
						<textarea
							className={styles.remarks}
							id="remarks"
							ref={orderRemarks}
						></textarea>
					</div>
					<div className={styles.orderInput}>
						<label className={styles.formLabel} for="itemName">
							Item Name{" "}
						</label>
						<input
							className={styles.formInput}
							type="text"
							ref={itemName}
						/>
					</div>
					<div className={styles.orderInput}>
						<label className={styles.formLabel} for="unitPrice">
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
						<label className={styles.formLabel} for="quantity">
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
								className={styles.formLabel}
								for="grandTotal"
							>
								Grand Total
							</label>
							<label className={styles.formLabel} for="gTotal">
								: RM{grandTotal.toFixed(2)}
							</label>
						</div>
						<div className={styles.contSum}>
							<label
								className={styles.formLabel}
								for="vendorSummary"
							>
								Vendor
							</label>
							<p className={styles.formLabel} for="vendorS">
								: {vendorName}{" "}
							</p>
						</div>
						<div className={styles.butOrder}>
							<div className={styles.button} onClick={() => {
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
							<input
								type="hidden"
								name="status"
								id="status"
								value="Submit for Approval"
							></input>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddOrder;
