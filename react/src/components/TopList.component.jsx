import { useEffect, useState } from "react";

import FolderCard from "components/FolderCard";

import styles from "styles/component/TopList.module.scss";

function TopList(props) {
	const [data, setData] = useState([]);
	const [headers, setHeaders] = useState([]);

	const { title } = props;

	useEffect(() => {
		if (props.data && props.data.length > 0) {
			let h = Object.keys(props.data[0]);
			let d = props.data.map((item) => Object.values(item));

			setHeaders(h);
			setData(d);
		}
	}, [props.data]);

	return (
		<FolderCard className={styles.container} title={title}>
			<div className={styles.list}>
				<div className={styles.header}>
					{headers.map((item, index) => {
						return (
							<div key={index} className={styles.item}>
								{item}
							</div>
						);
					})}
				</div>
				<div className={styles.body}>
					{data.map((item, index) => (
						<div key={index} className={styles.item}>
							{item.map((value, index) => {
								return (
									<div key={index} className={styles.value}>
										{value}
									</div>
								);
							})}
						</div>
					))}
				</div>
			</div>
		</FolderCard>
	);
}

export default TopList;
