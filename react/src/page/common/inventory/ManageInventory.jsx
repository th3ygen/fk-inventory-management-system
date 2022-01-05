
/* 
    TODO: fetch data
*/
import { useState, useEffect } from "react";

import NumberWidget from "components/NumberWidget.component";
import Table from "components/Table.component";

import styles from "styles/common/inventory/ManageInventory.module.scss";

function ManageInventory() {
    const [items, setItems] = useState([]);

	const itemsData = {
		header: ["Header 1", "Header 2", "Header 3", "Header 4"],
		items: [
			[1, "Pencil", "Item 2", "Active:#71e071", "Item 4"],
			[2, "Item 1", "Item 2", "Disabled:#ff7171", "Item 4"],
			[3, "Item 1", "Item 2", "Item 3", "Item 4"],
			[4, "Item 1", "Item 2", "Item 3", "Item 4"],
			[5, "Item 1", "Item 2", "Item 3", "Item 4"],
			[6, "Item 1", "Item 2", "Item 3", "Item 4"],
			[7, "Test", "Item 2", "Item 3:#F1e071", "Item 4"],
			[8, "Item 1", "Item 2", "Item 3", "Item 4"],
			[9, "Item 1", "Item 2", "Item 3", "Item 4"],
			[10, "Item 1", "Item 2", "Item 3", "Item 4"],
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
    ]

    const deleteItem = (id) => {
        // delete item with id from itemsData.items
        const newItems = items.filter((item) => item[0] !== id);

        setItems(newItems);

    }

    useEffect(() => {
        setItems(itemsData.items);
    }, []);


	return (
		<div className={styles.container}>

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
