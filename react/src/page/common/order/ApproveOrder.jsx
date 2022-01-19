import styles from 'styles/common/order/Approve.module.scss';

import { FaSave,FaTrashAlt } from 'react-icons/fa';

import { useState, useEffect } from "react";

// components
import Table from "components/Table.component";

function ApproveOrder() {

    const [items, setItems] = useState([]);

    const itemList = {
		header: ["Item", "Quantity", "Sub Price"],
		items: [
			[1,"Item 1", "Item 2", "Active"],
			[2,"Item 1", "Item 2", "Item 3"],
			[3,"Item 1", "Item 2", "Item 3"],
            [4,"Item 1", "Item 2", "Item 3"],
			[5,"Item 1", "Item 2", "Item 3"],
		],
		colWidthPercent: ["30%", "20%", "10%", "10%"],
		centered: [false, true, true, true]
	};

    useEffect(() => {
		setItems(itemList.items);
	}, []);

    return (
        <div className={styles.content}>
            <div className={styles.order}>
                <div className={styles.orderDetails}>
                    <div className={styles.manager}>
                        <div className={styles.managerTitle}>Order Details</div>
                        <div className={styles.managerContent}>
                            <div className={styles.contSum}>
                                <label className={styles.managerLabel} for="orderIDLabel">Order ID: </label>
                                <label className={styles.managerLabel} for="orderID">123abc123 </label>
                            </div>
                            <div className={styles.contSum}>
                                <label className={styles.managerLabel} for="vendorLabel">Vendor: </label>
                                <label className={styles.managerLabel} for="managerName">K2 SDN BHD </label>
                            </div>
                            <div className={styles.contSum}>
                                <label className={styles.managerLabel} for="detailLabel">Vendor Details: </label>
                                <p className={styles.details} for="managerName">K2 SDN BHD <br/> No Tel: 0322456122 </p>
                            </div>
                            <div className={styles.contSum}>
                                <label className={styles.managerLabel} for="remarkLabel">Remarks: </label>
                                <p className={styles.details} for="remarks">No remarks </p>
                            </div>
                            <div className={styles.contSum}>
                                <label className={styles.managerLabel} for="grandTotal">Grand Total: </label>
                                <label className={styles.managerLabel} for="gTotal">RM 0.00 </label>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.itemTable}>
                    <Table
					    title="Item List"
					    headers={itemList.header}
					    items={items}
					    centered={itemList.centered}
					    colWidthPercent={itemList.colWidthPercent}
				    />
				</div>
                
                <div className={styles.formDetails}>
                    <div className={styles.fTitle}>Manager Verification</div>
                    <div className={styles.orderForm}>
                        <div className={styles.orderInput}>
                            <label className={styles.formLabel} for="manager">Manager: </label>
                            <input className={styles.formInput} type="text"/>
                        </div>
                        <div className={styles.orderInput}>
                            <label className={styles.formLabel} for="remarks">Remarks </label>
                            <textarea className={styles.remarks} id="remarks"></textarea>
                        </div>
                        
                        <div className={styles.orderInput}>
                            <label className={styles.formLabel} for="verify">Verify </label>
                            <div className={styles.formRadioG}>
                                <input className={styles.formRadio} type="radio" id="status" name="status" value="Approved" />
                                <label className={styles.formLabel} for="approve">Approved </label>
                            </div>
                            <div className={styles.formRadioG}>
                                <input className={styles.formRadio} type="radio" id="status" name="status" value="Rejected" />
                                <label className={styles.formLabel} for="rejected">Rejected </label>
                            </div>
                            
                        </div>
                        
                        <div className={styles.verifyButton}>
                            
                            <div className={styles.button}><FaTrashAlt/> Delete </div>
                            <div className={styles.button}><FaSave/> Submit </div>

                        </div>
                    </div>
                </div> 
                
            </div>
        </div>
    )

}

export default ApproveOrder;