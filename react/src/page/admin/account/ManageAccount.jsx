import { useEffect, useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// components
import Table from "components/Table.component";
import NumberWidget from "components/NumberWidget.component";

import styles from "styles/admin/account/ManageAccount.module.scss";

function ManageAccount() {
	const navigate = useNavigate();
	const [totalAccounts, setTotalAccounts] = useState(0)
	const [totalManagers, setTotalManagers] = useState(0)
	const [totalStaffs, setTotalStaffs] = useState(0)
	const [totalAdmins, setTotalAdmins] = useState(0)
	const [accounts, setAccounts] = useState([]);

	const accountData = {
		header: ["Name", "Role", "Username", "Contact"],
		items: [
			["1234", "Item 1", "Item 2", "Active", "Item 4"],
			["1234", "Farikha Dwi Nur Qossina Januar", "Manager", "farikha_dwi", "qossina321"],
		],
		colWidthPercent: ["20%", "20%", "20%", "20%"],
		isBadge: [false, false, false, false],
		badgeColor: [
			["", "", "#71e071", ""],
			["", "", "#ff7171", ""],
		],
		centered: [false, true, true, true],

		actions: [
			{
				icon: "FaEdit",
				tooltip: "Update Account",
				callback: (n) => {
					navigate("/admin/accounts/update_account", { replace: true, state: { id: n } })
				},
			},
			{
				icon: "FaTrashAlt",
				tooltip: "Delete Account",
				callback: (n) => {
					console.log('deleting', n);
				},
			},
		]
	};

	const stats = [
		{
			title: "Total Accounts",
			value: "31",
			label: "Accounts",
		},
		{
			title: "Total Managers",
			value: "10",
			label: "Managers",
		},
		{
			title: "Total Staffs",
			value: "20",
			label: "Staffs",
		},
		{
			title: "Total Admins",
			value: "1",
			label: "Admins",
		},
	];

	useEffect(() => {
		(async () => {
			const request = await fetch("http://localhost:8080/api/accounts/get", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (request.status === 200) {
				const data = await request.json();

				let list = [];
				data.forEach(item => {
					list.push([
						item._id,
						item.name,
						item.role,
						item.username,
						item.contact,
					]);
				});
				setTotalAccounts(list.length)
				setTotalManagers(list.length)
				setTotalStaffs(list.length)
				setTotalAdmins(list.length)

				setAccounts(list);
			} else {
				console.log("Error:", request.status);
				alert("Error: " + request.status);
			}
		})();
	}, []);

	return (
		<div className={styles.header}>
			<h2 className={styles.header2}>Manage Account</h2>
			<div className={styles.title}>
				<h5 className={styles.header5}>Easily manage the accounts details in one page</h5>
				<div className={styles.stats}>
					<NumberWidget
						title="Total Accounts"
						label="Account"
						value={totalAccounts}
						style={{ fontSize: "24px" }}
					/>
					<NumberWidget
						title="Total Managers"
						label="Manager"
						value={totalManagers}
						style={{ fontSize: "24px" }}
					/>
					<NumberWidget
						title="Total Staffs"
						label="Staff"
						value={totalStaffs}
						style={{ fontSize: "24px" }}
					/>
					<NumberWidget
						title="Total Admins"
						label="Admin"
						value={totalAdmins}
						style={{ fontSize: "24px" }}
					/>
				</div>
				<div className={styles.butAdd}>
					<button className={styles.button} onClick={() => navigate("/admin/accounts/add_account", { replace: true })}><FaUserPlus /> Add Account</button>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.accountTable}>
					<Table filterCol={[1, 2, 3]}
						title="Accounts"
						headers={accountData.header}
						items={accounts}
						centered={accountData.centered}
						colWidthPercent={accountData.colWidthPercent}
						actions={accountData.actions}
					/>
				</div>
			</div>
		</div>
	);
}

export default ManageAccount;