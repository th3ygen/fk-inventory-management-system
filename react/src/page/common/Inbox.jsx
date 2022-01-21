import { useNavigate } from "react-router-dom";

import * as alertify from "alertifyjs";
import * as swal from "sweetalert";

import styles from "styles/common/Inbox.module.scss";

import { useState, useEffect } from "react";

//component
import Wrapper from "components/FolderCard";

function Inbox() {
    const navigate = useNavigate();

	const [inbox, setInbox] = useState([]);

	useEffect(() => {
		(async () => {
			let request = await fetch(
				"http://localhost:8080/api/inbox/list?receiver=staff",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (request.status === 200) {
				let response = await request.json();

				setInbox(response);
			}
		})();
	}, []);

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
							Source
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
                                        if (item.msgType === 'request') {
                                            alertify
                                                .confirm(
                                                    "Confirm Title",
                                                    "Confirm Message",
                                                    async () => {
                                                        await swal('Success', 'You clicked Yes button', 'success');
														navigate('/user/orders');
                                                    },
                                                    () => {
                                                        navigate('/user/order/approve', { state: { id: item.orderId } });
                                                    }
                                                )
                                                .set({'invokeOnCloseOff': true})
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
										style={{ textAlign: "center" }}
									>
										Staff
									</div>
									<div
										className={styles.headCon}
										style={{ textAlign: "center" }}
									>
										12/1/2022
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
