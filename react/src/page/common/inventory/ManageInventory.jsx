
/* 
    TODO: inventory stats
    TODO: inventory management table
*/
import { useState } from "react";

import NumberWidget from "components/NumberWidget.component";
import Table from "components/Table.component";

import styles from "styles/common/inventory/ManageInventory.module.scss";

function ManageInventory() {
	const itemsData = {
		header: ["Header 1", "Header 2", "Header 3", "Header 4"],
		items: [
			[1337, "Pencil", "Item 2", "Active:#71e071", "Item 4"],
			[12, "Item 1", "Item 2", "Disabled:#ff7171", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[14, "Test", "Item 2", "Item 3:#F1e071", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
			[12, "Item 1", "Item 2", "Item 3", "Item 4"],
		],
		colWidthPercent: ["30%", "10%", "10%", "10%"],
		centered: [false, true, true, true],
		actions: [
			{
				icon: "FaEdit",
				callback: (n) => {
					console.log("editing", n);
				},
			},
			{
				icon: "FaTrashAlt",
				callback: (n) => {
					console.log("deleting", n);
				},
			},
		],
	};


	return (
		<div className={styles.container}>
			<div className={styles.table}>
				<Table
					title="Inventory"
					headers={itemsData.headers}
					items={itemsData.items}
					centered={itemsData.centered}
					colWidthPercent={itemsData.colWidthPercent}
					actions={itemsData.actions}
				/>
			</div>
		</div>
	);
}

export default ManageInventory;
