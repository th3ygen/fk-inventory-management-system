import { useState, useEffect } from "react";

// components
import Table from "components/Table.component";

import styles from "styles/admin/account/ManageAccount.module.scss";

function ManageAccount() {
	const accountData = {
		header: ["Name", "Role", "Username", "Password"],
		items: [
			["1234","Item 1", "Item 2", "Active", "Item 4"],
			["1234","Farikha Dwi Nur Qossina Januar", "Manager", "farikha_dwi", "qossina321"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Test", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
			["1234","Item 1", "Item 2", "Item 3", "Item 4"],
		],
		colWidthPercent: ["30%", "20%", "20%", "20%"],
		isBadge: [false, false, false, false],
		badgeColor: [
			["", "", "#71e071", ""],
			["", "", "#ff7171", ""],
		],
		centered: [false, true, true, true],

		actions: [
			{
				icon: "FaEdit",
				callback: (n) => {
					console.log('editing', n);
				},
			},
			{
				icon: "FaTrashAlt",
				callback: (n) => {
					console.log('deleting', n);
				},
			},
		]
	};

    return (
		<div className={styles.container}>
			{/* 
				TODO folder design 
			*/}
			<div className={styles.accountTable}>
				<Table title="Accounts" data={accountData} />
			</div>
		</div>
	);
}

    export default ManageAccount;