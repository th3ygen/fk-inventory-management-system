import styles from 'styles/common/order/Add.module.scss';

import { FaUndo,FaReply,FaEraser,FaCheckSquare } from 'react-icons/fa';

import { useState, useRef, useEffect } from "react";

// components
import Table from "components/Table.component";

function AddOrder() {

    const [items, setItems] = useState([]);
    const itemName = useRef("");
	const unitPrice = useRef(0);
	const quantity = useRef(0);
    const [grandTotal, setGrandTotal] = useState(0);

    const itemList = {
		header: ["Item", "Sub Price"],
		colWidthPercent: ["30%", "20%", "10%", "10%"],
		centered: [false, true, true, true],
		actions: [
			{
				icon: "FaReply",
				callback: (n) => {
					console.log('editing', n);
				},
                tooltip: "Edit",
			},
		]
	};

    const getItems = () => {

        let gTotal = 0;
        let rows = [];

        let item = {
            itemName: itemName.current.value,
            qty: parseInt(quantity.current.value),
            unitPrice: parseInt(unitPrice.current.value),
        };

        const subPrice = item.unitPrice * item.qty;

        gTotal += subPrice;

        rows.push([
            item.id,
            item.itemName,
            subPrice
        ]);

        
        setItems(rows);
        setGrandTotal(gTotal);
    }

    return (
        <div className={styles.content}>
            <div className={styles.order}>
                <div className={styles.fTitle}> Order Form</div>
                <div className={styles.orderForm}>
                    <div className={styles.orderInput}>
                        <label className={styles.formLabel} for="vendor">Vendor </label>
                        <select className={styles.formSelect} id="vendor" name="vendor">
                            <option>K2 SDN BHD</option>
                            <option>RO SDN BHD</option>
                            <option>LA INDUSTRY</option>
                        </select>
                    </div>
                    <div className={styles.orderInput}>
                        <label className={styles.formLabel} for="remarks">Remarks </label>
                        <textarea className={styles.remarks} id="remarks"></textarea>
                    </div>
                    <div className={styles.orderInput}>
                        <label className={styles.formLabel} for="itemName">Item Name </label>
                        <input 
                            className={styles.formInput} 
                            type="text"
                            ref={itemName}
                        />
                    </div>
                    <div className={styles.orderInput}>
                        <label className={styles.formLabel} for="unitPrice">Unit Price </label>
                        <input 
                            className={styles.formInput} 
                            type="number" 
                            step="0.01"
                            ref={unitPrice} 
                        />
                    </div>
                    <div className={styles.orderInput}>
                        <label className={styles.formLabel} for="quantity">Quantity </label>
                        <input 
                            className={styles.formInput} 
                            type="number"
                            ref={quantity}
                        />
                    </div>
                    <div className={styles.itemButton}>
                        <div className={styles.button} onClick={getItems}><FaReply/> Update List </div>
                        
                    </div>
                </div>
            </div>

            <div className={styles.itemList}>
				<div className={styles.itemTable}>
                    <Table
					    title="Item List"
					    headers={itemList.header}
					    items={items}
					    centered={itemList.centered}
					    colWidthPercent={itemList.colWidthPercent}
                        actions={itemList.actions}
				    />
				</div>
                <div className={styles.summary}>
                    <div className={styles.sumContent}>
                        <div className={styles.contSum}>
                            <label className={styles.formLabel} for="grandTotal">Grand Total: </label>
                            <label className={styles.formLabel} for="gTotal" value={grandTotal}></label>
                        </div>
                        <div className={styles.contSum}>
                            <label className={styles.formLabel} for="vendorSummary">Vendor: </label>
                            <p className={styles.formLabel} for="vendorS">K2 SDN BHD </p>
                        </div>
                        <div className={styles.butOrder}>
                            <div className={styles.button} ><FaEraser/> Reset</div>
                            <div className={styles.button}><FaCheckSquare/>Submit for Approval</div>
                            <input type="hidden" name="status" id="status" value="Submit for Approval"></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AddOrder;