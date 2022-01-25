import { useNavigate, useOutletContext } from "react-router-dom";

import * as alertify from "alertifyjs";
import swal from "sweetalert";

import styles from "styles/common/Inbox.module.scss";

import { useState, useEffect } from "react";

//component
import Wrapper from "components/FolderCard";
import { FaTrash } from "react-icons/fa";

function Inbox() {
	const navigate = useNavigate();

	const [user] = useOutletContext();

	const [inbox, setInbox] = useState([]);

	const deleteMsg = async (id) => {
		try {
			const req = await fetch(
				"http://localhost:8080/api/inbox/delete/" + id,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						authorization: "Bearer " + user.token,
					},
				}
			);

				console.log(id);

			if (req.status === 200) {
				alertify.success("Message Deleted");
				setInbox(inbox.filter((item) => item._id !== id));
			}

			console.log(req);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		(async () => {
			if (!user) {
				return;
			}

			let request = await fetch(
				`http://localhost:8080/api/inbox/list?receiver=${user.role}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${user.token}`,
					},
				}
			);

			if (request.status === 200) {
				let response = await request.json();

				setInbox(response);
			}
		})();
	}, [user]);

	/* useEffect(() => {
        
        if (inbox.length > 0) {
            document.querySelectorAll('button').forEach(element => {
                alertify.success('new message');
                element.addEventListener('click', () => {
                    alertify.success('Yo!!');
                });
            });
        }
   
    }, [inbox.length]) */

	return (
		<div className={styles.content}>
			<Wrapper className={styles.wrapper} title="Inbox">
				<div className={styles.table}>
					<div className={styles.header}>
						<div className={styles.headNum}>#</div>
						<div className={styles.headTitle}>Title</div>
						<div
							className={styles.headCon}
							style={{ textAlign: "center" }}
						>
							Type
						</div>
						<div
							className={styles.headCon}
							style={{ textAlign: "center" }}
						>
							Date
						</div>
					</div>
					<div className={styles.tableCont}>
						{inbox.map((item, index) => {
							return (
								<div
									key={index}
									className={styles.row}
									onClick={() => {
										if (item.msgType === "request") {
											alertify
												.confirm(
													item.title,
													item.content,
													async () => {
														await swal(
															"Success",
															"You clicked Yes button",
															"success"
														);
														navigate(
															"/user/orders"
														);
													},
													() => {
														navigate(
															"/user/order/approve",
															{
																state: {
																	id: item.orderId,
																},
															}
														);
													}
												)
												.set({ invokeOnCloseOff: true })
												.set("labels", {
													ok: "Approve",
													cancel: "Review",
												})
												.set("reverseButtons", true);
										}
									}}
								>
									<div className={styles.headNum}>
										{index + 1}
									</div>
									<div className={styles.headTitle}>
										{item.title}
									</div>
									<div
										className={styles.headCon}
										style={{
											textAlign: "center",
											textTransform: "capitalize",
										}}
									>
										{item.msgType || "none"}
									</div>
									<div
										className={styles.headCon}
										style={{ textAlign: "center" }}
									>
										12/1/2022
									</div>
									<div
										className={styles.actions}
										style={{ textAlign: "center" }}
									>
										<div
											className=""
											onClick={async () => {
												const id = item._id;

												const confirm = await swal({
													title: "Are you sure?",
													text: "You won't be able to revert this!",
													icon: "warning",
													buttons: true,
													dangerMode: true,
												});

												if (confirm) {
													await deleteMsg(id);

													swal(
														"Poof! Your message has been deleted!",
														{
															icon: "success",
														}
													);
												}
											}}
										>
											<FaTrash />
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</Wrapper>
		</div>
	);
}

export default Inbox;
