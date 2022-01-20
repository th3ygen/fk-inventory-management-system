/* 
    TODO: fetch data
*/
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Popup from "reactjs-popup";

import NumberWidget from "components/NumberWidget.component";
import Table from "components/Table.component";
import PageHeader from "components/PageHeader.component";

import StatNumber from "components/StatNumber.component";
import StatWrapper from "components/StatWrapper.component";

import styles from "styles/common/inventory/ManageInventory.module.scss";
import "reactjs-popup/dist/index.css";

/* 
	TODO: Popup for AddSold
	       - show item name and quantity
		   - input quantity
		   - validate input <= quantity
*/

function ManageInventory() {
	const navigate = useNavigate();

	const [items, setItems] = useState([]);
	const [totalItems, setTotalItems] = useState(0);
	const [totalWorth, setTotalWorth] = useState(0);
	const [totalSoldItems, setTotalSoldItems] = useState(0);
	const [totalSales, setTotalSales] = useState(0);
	const [mostSoldItem, setMostSoldItem] = useState({});
	const [leastSoldItem, setLeastSoldItem] = useState({});
	const [addSoldPopup, setAddSoldPopup] = useState(false);
	const [addSoldItem, setAddSoldItem] = useState("");
	const [addSoldQuantity, setAddSoldQuantity] = useState(0);
	const [err, setErr] = useState(false);

	const addSoldInputRef = useRef();

	const itemsData = {
		header: ["Name", "Quantity", "Unit price (RM)", "Barcode ID", "Vendor"],
		colWidthPercent: ["30%", "5%", "10%", "15%", "15%"],
		centered: [false, true, true, true],
	};

	const deleteItem = async (id) => {
		// delete item with id from itemsData.items
		const request = await fetch(
			"http://localhost:8080/api/inventory/item/delete/" + id,
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
				"http://localhost:8080/api/inventory/item/list",
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
				let tWorth = 0;

				response.forEach((item) => {
					tWorth += item.unit_price * item.quantity;

					rows.push([
						item._id,
						item.name,
						item.quantity,
						item.unit_price,
						item.barcode_ID,
						item.vendor_name || "DELETED:#4a5355",
					]);
				});

				// convert tWorth and aPrice to 2 decimal places
				tWorth = tWorth.toFixed(2);

				setTotalItems(rows.length);
				setTotalWorth(tWorth);

				setItems(rows);
			}

			request = await fetch(
				"http://localhost:8080/api/inventory/sold/list",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (request.status === 200) {
				let response = await request.json();

				let tSoldItems = 0;
				let tSold = 0;

				response.forEach((item) => {
					if (item.item) {
						tSoldItems += item.quantity;
						tSold += item.item.unit_price * item.quantity;
					}
				});

				// get most and least sold item
				const compare = {};

				response.forEach((item) => {
					if (item.item) {
						if (!compare[item.item.name]) {
							compare[item.item.name] = item.quantity;
						} else {
							compare[item.item.name] += item.quantity;
						}
					}
				});

				let mostSold = {};
				let leastSold = {};

				for (let [key, value] of Object.entries(compare)) {
					if (!mostSold.name || value > mostSold.value) {
						mostSold.name = key;
						mostSold.value = value;
					}

					if (!leastSold.name || value < leastSold.value) {
						leastSold.name = key;
						leastSold.value = value;
					}
				}

				setMostSoldItem(mostSold);
				setLeastSoldItem(leastSold);

				setTotalSoldItems(tSoldItems);
				setTotalSales(tSold.toFixed(2));
			}
		})();
	}, []);

	// sleep function
	const sleep = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	const errorBlink = async () => {
		setErr(true);
		await sleep(500);
		setErr(false);
	};

	const addSoldForm = async (id) => {
		try {
			let req, res;

			req = await fetch('http://localhost:8080/api/inventory/item/id/'+id, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (req.status === 200) {
				res = await req.json();

				setAddSoldItem(res.name);
				setAddSoldQuantity(res.quantity);
			}
				
			setAddSoldPopup(true);
		} catch (e) {
			console.log(e);
		}
	};

	const addSold = async (id) => {
		errorBlink();

		/* try {
			let req, res;

			const qnty = parseInt(addSoldInputRef.current.value);

			res = await fetch("http://localhost:8080/api/inventory/sold/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					item_id: id,
					quantity: qnty,
				}),
			});

			if (res.status === 200) {
				alert("done");
			}
		} catch (e) {
			console.log(e);
		} */
	};

	return (
		<div className={styles.container}>
			<PageHeader
				title="Manage Inventory"
				brief="Easily manage your inventory and item details in one page"
				navs={[
					{
						icon: "FaReply",
						name: "Add item",
						path: "/user/inventory/add",
					},
				]}
			/>
			<div className={styles.stats}>
				<StatWrapper>
					<StatNumber
						title="Total Items"
						value={totalItems}
						unit="Items"
						icon="FaBoxOpen"
					/>
					<StatNumber
						title="Inventory Worth"
						value={totalWorth}
						unit="MYR"
						icon="FaMoneyBillAlt"
					/>
					<StatNumber
						title="Total Sales"
						value={totalSales}
						unit="MYR"
						icon="FaMoneyBillAlt"
					/>
					<StatNumber
						title="Total Sold Items"
						value={totalSoldItems}
						unit="Items"
						icon="FaBoxOpen"
					/>

					<StatNumber
						title="Most Sold Item"
						value={`${mostSoldItem.name} (${mostSoldItem.value})`}
						unit="Items"
						icon="FaBoxOpen"
						valueSize={"1rem"}
					/>

					<StatNumber
						title="Least Sold Item"
						value={`${leastSoldItem.name} (${leastSoldItem.value})`}
						unit="Items"
						icon="FaBoxOpen"
						valueSize={"1rem"}
					/>
				</StatWrapper>
			</div>
			<div className={styles.table}>
				<Table
					title="Inventory"
					headers={itemsData.header}
					items={items}
					centered={itemsData.centered}
					colWidthPercent={itemsData.colWidthPercent}
					actions={[
						{
							icon: "FaEdit",
							callback: (n) => {
								navigate("/user/inventory/edit", {
									replace: true,
									state: { id: n },
								});
							},
							tooltip: "Edit",
						},
						{
							icon: "FaCoins",
							callback: (n) => {
								addSoldForm(n);
							},
							tooltip: "Add sold",
						},
						{
							icon: "FaTrashAlt",
							callback: (n) => {
								deleteItem(n);
							},
							tooltip: "Delete",
						},
					]}
				/>
			</div>

			<Popup open={addSoldPopup} onClose={() => setAddSoldPopup(false)}>
				<div className={`${styles.formpop} `}>
					<div className={styles.details}>
						<div className={styles.detail}>
							<label>Item name</label>
							<span>: {addSoldItem}</span>
						</div>
						<div className={styles.detail}>
							<label>Total available</label>
							<span>: {addSoldQuantity}</span>
						</div>
					</div>
					<div className={`${styles.input} ${err && styles.error}`}>
						<input type="text" ref={addSoldInputRef} />
						<div
							className={styles.btn}
							onClick={addSold}
						>
							Add
						</div>
					</div>
				</div>
			</Popup>
		</div>
	);
}

export default ManageInventory;
