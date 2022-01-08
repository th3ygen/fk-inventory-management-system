/* 
    TODO: fetch data
*/
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NumberWidget from "components/NumberWidget.component";
import Table from "components/Table.component";
import PageHeader from "components/PageHeader.component";

import styles from "styles/common/inventory/ManageInventory.module.scss";

function ManageInventory() {
	const navigate = useNavigate();

	const [items, setItems] = useState([]);
	const [totalItems, setTotalItems] = useState(0);
	const [totalWorth, setTotalWorth] = useState(0);
	const [totalSoldItems, setTotalSoldItems] = useState(0);
	const [totalSold, setTotalSold] = useState(0);
	const [mostSoldItem, setMostSoldItem] = useState({});
	const [leastSoldItem, setLeastSoldItem] = useState({});

	const itemsData = {
		header: ["Name", "Quantity", "Unit price (RM)", "Barcode ID", "Vendor"],
		colWidthPercent: ["30%", "5%", "10%", "15%", "15%"],
		centered: [false, true, true, true],
		actions: [
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
					navigate("/user/inventory/sell", {
						replace: true,
						state: { id: n },
					});
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
		],
	};

	const deleteItem = (id) => {
		// delete item with id from itemsData.items
		const newItems = items.filter((item) => item[0] !== id);

		setItems(newItems);
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

				console.log(rows);

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
					tSoldItems += item.quantity;
					tSold += item.item.unit_price * item.quantity;
				});

				// get most and least sold item
				const compare = {};

				response.forEach((item) => {
					if (!compare[item.item.name]) {
						compare[item.item.name] = item.quantity;
					} else {
						compare[item.item.name] += item.quantity;
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
				setTotalSold(tSold.toFixed(2));
			}
		})();
	}, []);

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
				<NumberWidget
					title="Total Items by Quantity"
					label="Sold"
					value={totalItems}
				/>
				<NumberWidget
					title="Worth"
					label="RM"
					value={totalWorth}
				/>
				<NumberWidget
					title="Total Sold Items by Quantity"
					label="Items"
					value={totalSoldItems}
				/>
				<NumberWidget
					title="Profit / Loss"
					label="RM"
					value={(totalSold - totalWorth).toFixed(2)}
				/>
				<NumberWidget
					title="Profit / Loss (%)"
					label="%"
					value={((totalSold - totalWorth) / totalWorth * 100).toFixed(2)}
				/>
				<NumberWidget
					title="Most Sold Item"
					label="Item"
					value={`${mostSoldItem.name} (${mostSoldItem.value})`}
					style={{fontSize: "14px"}}
				/>
				<NumberWidget
					title="Least Sold Item"
					label="Item"
					value={`${leastSoldItem.name} (${leastSoldItem.value})`}
					style={{fontSize: "14px"}}
				/>

			</div>
			<div className={styles.table}>
				<Table
					title="Inventory"
					headers={itemsData.header}
					items={items}
					centered={itemsData.centered}
					colWidthPercent={itemsData.colWidthPercent}
					actions={itemsData.actions}
				/>
			</div>
		</div>
	);
}

export default ManageInventory;
