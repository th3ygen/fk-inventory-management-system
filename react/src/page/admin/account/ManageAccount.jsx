import { useEffect, useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { useNavigate, useOutletContext } from 'react-router-dom';

import Swal from 'sweetalert';

// components
import Table from "components/Table.component";
import StatNumber from "components/StatNumber.component";
import StatWrapper from "components/StatWrapper.component";

import styles from "styles/admin/account/ManageAccount.module.scss";
import PageHeader from 'components/PageHeader.component';

function ManageAccount() {
	const [user] = useOutletContext();

	const navigate = useNavigate();
	const [totalAccounts, setTotalAccounts] = useState(0)
	const [totalManagers, setTotalManagers] = useState(0)
	const [totalStaffs, setTotalStaffs] = useState(0)
	const [totalAdmins, setTotalAdmins] = useState(0)
	const [accounts, setAccounts] = useState([]);

	const [basePath, setBasePath] = useState('/user');

	const accountData = {
		header: ["Name", "Role", "Username", "Contact"],
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
					navigate("/admin/accounts/update_account", { state: { id: n } })
				},
			},
			{
				icon: "FaTrashAlt",
				tooltip: "Delete Account",
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
					})

					if (!confirm) {
						return
					}

					const request = await fetch("http://localhost:8080/api/accounts/delete/" + n, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							authorization: "Bearer " + user.token,
						}
					})
					if (request.status === 200) {
						let list = accounts.filter(f => f[0] !== n)
						setAccounts(list)
						setTotalAccounts(list.length)
						setTotalManagers(list.filter(i => (i[2] === "Manager")).length)
						setTotalStaffs(list.filter(i => (i[2] === "Staff")).length)
						setTotalAdmins(list.filter(i => (i[2] === "Admin")).length)
					}
				},
			},
			{
				tooltip: 'Update password',
				icon: 'FaKey',
				callback: async (n) => {
					navigate("/admin/updatepassword", { state: { id: n } });
				}
			}
		]
	};

	useEffect(() => {
		if (!user) {
			return;
		}

		if (user.role === 'admin') {
			setBasePath('/admin')
		}

		(async () => {
			const request = await fetch("http://localhost:8080/api/accounts/get", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + user.token
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
				setTotalManagers(list.filter(i => (i[2] === "Manager")).length || "0")
				setTotalStaffs(list.filter(i => (i[2] === "Staff")).length || "0")
				setTotalAdmins(list.filter(i => (i[2] === "Admin")).length || "0")

				setAccounts(list);
			} else {
				console.log("Error:", request.status);
				alert("Error: " + request.status);
			}
		})();
	}, [user]);

	return (
		<div className={styles.header}>
			<PageHeader
				title="Manage Accounts"
				brief="Easily manage user accounts, add, update, and delete."
				navs={[
					{
						icon: "FaUserPlus",
						name: "Add Account",
						path: basePath + "/accounts/add_account",
					},
				]}
			/>
			<div className={styles.title}>
				<div className={styles.statNum}>
					<StatWrapper >
						<StatNumber 
							title="Total Accounts"
							label="Account"
							value={totalAccounts}
							unit="Accounts"
							icon="FaUsers"
							style={{ fontSize: "24px" }}
						/>
						<StatNumber
							title="Total Managers"
							label="Manager"
							value={totalManagers}
							unit="Accounts"
							icon="FaUserTie"
							style={{ fontSize: "24px" }}
						/>
						<StatNumber
							title="Total Staffs"
							label="Staff"
							value={totalStaffs}
							unit="Accounts"
							icon="FaUser"
							style={{ fontSize: "24px" }}
						/>
						<StatNumber
							title="Total Admins"
							label="Admin"
							value={totalAdmins}
							unit="Accounts"
							icon="FaUserEdit"
							style={{ fontSize: "24px" }}
						/>
					</StatWrapper>
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