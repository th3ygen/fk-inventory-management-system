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

	const itemsData = {
		header: ["Name", "Quantity", "Unit price (RM)", "Barcode ID", "Vendor"],
		items: [],
		colWidthPercent: ["30%", "5%", "10%", "15%", "15%"],
		centered: [false, true, true, true],
		actions: [
			{
				icon: "FaEdit",
				callback: (n) => {
					navigate('/user/inventory/edit', { replace: true, state: { item: n } });
				},
			},
			{
				icon: "FaTrashAlt",
				callback: (n) => {
					deleteItem(n);
				},
			},
		],
	};

	const itemsSummary = [
		{
			title: "Total sold",
			label: "Sold",
			value: "1337",
		},
		{
			title: "Total Items",
			label: "Items",
			value: "1337",
		},
		{
			title: "Worth",
			label: "RM",
			value: "1337",
		},
		{
			title: "Average Price",
			label: "RM",
			value: "1337",
		},
	];

	const deleteItem = (id) => {
		// delete item with id from itemsData.items
		const newItems = items.filter((item) => item[0] !== id);

		setItems(newItems);
	};

	useEffect(() => {
		(async () => {
			let request = await fetch("http://localhost:8080/api/items/list", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (request.status === 200) {
				let response = await request.json();

				let rows = [];

				response.forEach((item) => {
					rows.push([
						item._id,
						item.name,
						item.quantity,
						item.unit_price,
						item.barcode_ID,
						item.vendor_name,
					]);
				});

				setItems(rows);
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
				{itemsSummary.map((item, i) => (
					<NumberWidget key={i} {...item} />
				))}
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
