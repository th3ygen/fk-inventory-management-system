import { useState, useEffect, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import * as alertify from "alertifyjs";
import Swal from "sweetalert";

import Popup from "reactjs-popup";

import NumberWidget from "components/NumberWidget.component";
import Table from "components/Table.component";
import PageHeader from "components/PageHeader.component";

import StatNumber from "components/StatNumber.component";
import StatWrapper from "components/StatWrapper.component";

import styles from "styles/common/inventory/ManageInventory.module.scss";
import "reactjs-popup/dist/index.css";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";

/* 
	TODO: Popup for AddSold
	       - show item name and quantity
		   - input quantity
		   - validate input <= quantity
*/

function ManageInventory() {
	const navigate = useNavigate();

	const [user] = useOutletContext();

	const [items, setItems] = useState([]);
	const [totalItems, setTotalItems] = useState(0);
	const [totalWorth, setTotalWorth] = useState(0);
	const [totalSoldItems, setTotalSoldItems] = useState(0);
	const [totalSales, setTotalSales] = useState(0);
	const [mostSoldItem, setMostSoldItem] = useState({});
	const [leastSoldItem, setLeastSoldItem] = useState({});
	const [addSoldPopup, setAddSoldPopup] = useState(false);
	const [addSoldItem, setAddSoldItem] = useState("");
	const [addSoldId, setAddSoldId] = useState("");
	const [addSoldQuantity, setAddSoldQuantity] = useState(0);
	const [err, setErr] = useState(false);
	const [refresh, setRefresh] = useState(false);

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
					authorization: "Bearer " + user.token,
				},
			}
		);

		if (request.status === 200) {
			setItems(items.filter((i) => i[0] !== id));

			Swal({
				title: "Deleted",
				text: "Item has been deleted!",
				icon: "success",
				button: "Ok",
			})
		} else {
			console.log(id, request);
			alert("Error deleting item");
		}
	};

	useEffect(() => {
		(async () => {
			if (!user) {
				return;
			}

			let request = await fetch(
				"http://localhost:8080/api/inventory/item/list",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						authorization: "Bearer " + user.token,
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
						authorization: "Bearer " + user.token,
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
						tSold += item.total;
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
	}, [user, refresh]);

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

			req = await fetch(
				"http://localhost:8080/api/inventory/item/id/" + id,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						authorization: "Bearer " + user.token,
					},
				}
			);

			if (req.status === 200) {
				res = await req.json();

				setAddSoldItem(res.name);
				setAddSoldQuantity(res.quantity);
				setAddSoldId(id);
			} else {
				console.log(req);
				alert("Error getting item");
			}

			setAddSoldPopup(true);
		} catch (e) {
			console.log(e);
		}
	};

	const addSold = async (id) => {
		try {
			let req, res;

			const qnty = parseInt(addSoldInputRef.current.value);

			if (qnty > addSoldQuantity) {
				errorBlink();
				alertify.error("Insufficient available items");

				return; 
			}


			req = await fetch("http://localhost:8080/api/inventory/sold/add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + user.token,
				},
				body: JSON.stringify({
					item_ID: addSoldId,
					quantity: qnty,
				}),
			});

			if (req.status === 200) {
				const i = items.findIndex((item) => item[0] === addSoldId);

				items[i][2] -= qnty;

				setItems([...items]);
				setRefresh(!refresh);
				setAddSoldPopup(false);

				await Swal({
					title: "Success",
					text: "Item sold",
					icon: "success",
					button: "OK",
				});

			}
		} catch (e) {
			console.log(e);
		}
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
							callback: async (n) => {
								const confirm = await Swal({
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

								if (confirm === 'delete') {
									deleteItem(n);
								}
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
						<div className={styles.btn} onClick={addSold}>
							Add
						</div>
					</div>
				</div>
			</Popup>
		</div>
	);
}

export default ManageInventory;
