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
	const [totalSold, setTotalSold] = useState(0);
	const [totalWorth, setTotalWorth] = useState(0);
	const [averagePrice, setAveragePrice] = useState(0);

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
					navigate("/user/inventory/edit", {
						replace: true,
						state: { id: n },
					});
				},
				tooltip: "Add sold quantity",
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
				let aPrice = 0;

				response.forEach((item) => {
					tWorth += item.unit_price * item.quantity;
					aPrice += item.unit_price;

					rows.push([
						item._id,
						item.name,
						item.quantity,
						item.unit_price,
						item.barcode_ID,
						item.vendor_name,
					]);
				});

				setTotalItems(rows.length);
				setTotalWorth(tWorth);
				setAveragePrice(aPrice / rows.length);

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

				let tSold = 0;

				response.forEach((item) => {
					tSold += item.quantity;
				});

				setTotalSold(tSold);
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
					title="Total sold"
					label="Sold"
					value={totalSold}
				/>
				<NumberWidget
					title="Total items"
					label="Items"
					value={totalItems}
				/>
				<NumberWidget
					title="Worth"
					label="RM"
					value={totalWorth}
				/>
				<NumberWidget
					title="Average price"
					label="RM"
					value={averagePrice}
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
