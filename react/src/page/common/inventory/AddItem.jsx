/* 
    TODO add item form
    TODO client validation
    TODO fetch data from server
*/
import { useRef } from "react";
import { FaFileImport, FaTrashAlt } from "react-icons/fa";
import BarcodeScanner from "javascript-barcode-reader";

import PageHeader from "components/PageHeader.component";

import styles from "styles/common/inventory/AddItem.module.scss";

function AddItem() {
	const nameInput = useRef("");
	const unitPriceInput = useRef(0);
	const barcodeNumInput = useRef("");
	const barcodeImage = useRef(null);
	const barcodeType = useRef("");
	const barcodeImageInput = useRef(null);
	const vendorIdInput = useRef("");

	const scan = async (flag) => {
		if (barcodeImageInput.current && barcodeImageInput.current.files[0]) {
			const reader = new FileReader();

			reader.onload = async (e) => {
				const image = new Image(reader.result);

				image.crossOrigin = "Anonymous";
				image.src = reader.result;

				barcodeImage.current.src = reader.result;

				image.onload = async () => {
					let code = "";
					if (flag) {
						const encodings = [
							"ean-13",
							"ean-8",
							"code-39",
							"code-93",
							"code-2of5",
							"codabar",
							"code-128",
						];
						try {
							// decode barcode using all types
							// find a barcode that is valid
							for await (let encoding of encodings) {
								code = await BarcodeScanner({
									image,
									barcode: encoding,
									options: {
										useAdaptiveThreshold: true,
									},
								});

								// check barcode using regex
								// the code should not contains any special characters
								// or white space, or blank
								// the code should atleast be 6 characters long
								if (code.match(/^[a-zA-Z0-9]{6,}$/)) {
									barcodeType.current.selectedIndex =
										encodings.indexOf(encoding);
									break;
								}

								code = "Unable to read barcode image";
							}
						} catch (e) {
							code = "Unable to read barcode image";
						}
					} else {
						try {
							code = await BarcodeScanner({
								image,
								barcode: barcodeType.current.value,
								options: {
									useAdaptiveThreshold: true,
								},
							});
						} catch (e) {
							code = "Unable to read barcode image";
						}
					}

					barcodeNumInput.current.value = code;
				};
			};

			reader.readAsDataURL(barcodeImageInput.current.files[0]);
		}
	};

	return (
		<div className={styles.container}>
			<PageHeader
				title="Add Item"
				brief="Add new item to inventory"
				navs={[
					{
						icon: "FaReply",
						name: "Manage inventory",
						path: "/user/inventory",
					},
				]}
			/>
			<form className={styles.form}>
				<div className={`${styles.col} ${styles.half}`}>
					<div className={styles.row}>
						<div className={styles.label}>Item name</div>
						<input
							className={styles.input}
							type="text"
							ref={nameInput}
						/>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Unit price</div>
						<input
							className={`${styles.input} ${styles.noArrow}`}
							type="number"
							ref={unitPriceInput}
						/>
					</div>

					<div className={styles.row}>
						<div className={styles.label}>Vendor ID</div>
						<select className={styles.input} ref={vendorIdInput}>
							<option value="1">Vendor 1</option>
							<option value="2">Vendor 2</option>
							<option value="3">Vendor 3</option>
						</select>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Barcode number</div>
						<input
							className={styles.input}
							type="text"
							ref={barcodeNumInput}
						/>
					</div>
				</div>
				<div className={`${styles.col} ${styles.half}`}>
					<div className={styles.row}>
						<div className={styles.label}>Barcode encoding</div>
						<select
							className={styles.input}
							ref={barcodeType}
							onChange={() => scan(false)}
						>
							<option value="ean-13">EAN-13</option>
							<option value="ean-8">EAN-8</option>
							<option value="code-39">Code-39</option>
							<option value="code-93">Code-93</option>
							<option value="code-2of5">Code-2of5</option>
							<option value="codabar">Codabar</option>
							<option value="code-128">Code-128</option>
						</select>
					</div>
					<div className={styles.row}>
						<div className={styles.barcode}>
							<img
								ref={barcodeImage}
								src="/img/placeholder.png"
								alt="No barcode loaded"
							/>
						</div>
					</div>
					<div className={styles.row}>
						<div className={styles.label}>Barcode image</div>
						<input
							className={styles.input}
							type="file"
							accept="image/*"
							ref={barcodeImageInput}
							onChange={() => scan(true)}
						/>
					</div>
				</div>
				<div className={`${styles.col} ${styles.full}`}>
					<div
						className={styles.row}
						style={{ alignItems: "flex-end" }}
					>
						<div className={styles.buttons}>
							<div
								className={`${styles.button} ${styles.invert}`}
							>
								<FaTrashAlt />
								Clear
							</div>
							<div className={styles.button}>
								<FaFileImport />
								Add
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddItem;
