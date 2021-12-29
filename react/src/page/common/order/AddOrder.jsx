import styles from 'styles/common/order/Add.module.scss';

import { FaUndo } from 'react-icons/fa';

function AddOrder() {
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
                    .
                    <label className={styles.formLabel} for="itemName">Item Name </label>
                    <input className={styles.formInput} type="text"/><br className={styles.spacing}></br>
                    <label className={styles.formLabel} for="unitPrice">Unit Price </label>
                    <input className={styles.formInput} type="number" /><br className={styles.spacing}></br>
                    <label className={styles.formLabel} for="quantity">Quantity </label>
                    <input className={styles.formInput} type="number" /><br className={styles.spacing}></br>
                    <div className={styles.itemButton}>
                        <div className={styles.button}>ADD</div>
                    </div>
                </div>

                <div className={styles.butOrder}>
                    <div className={styles.button}>RESET</div>
                    <div className={styles.button}>SUBMIT FOR APPROVAL</div>
                    <input type="hidden" name="status" id="status" value="Submit for Approval"></input>
                </div>
            </div>

            <div className={styles.itemList}>
                <div className={styles.listTitle}>
                    ORDERED ITEMS
                </div>
                <div className={styles.items}>
                    <div className={styles.sItem}>
                        <div className={styles.sItemDetail}>
                            <div className={styles.itemName}>Gula</div>
                            <div className={styles.subPrice}>23.00</div>
                        </div>
                        <div className={styles.sItemButton}>
                            <div className={styles.updateB} id="update"><FaUndo/></div>
                        </div>
                    </div>
                
                    <div className={styles.sItem}>
                        <div className={styles.sItemDetail}>
                            <div className={styles.itemName}>Gula</div>
                            <div className={styles.subPrice}>23.00</div>
                        </div>
                        <div className={styles.sItemButton}>
                            <div className={styles.updateB} id="update"><FaUndo/></div>
                        </div>
                    
                    </div>
                </div>
            
                <div className={styles.gTotal}>
                    <div className={styles.grand}>GRAND TOTAL = </div>
                    <div className={styles.result}> RM 0.00 </div>
                </div>
            </div>
        </div>
    )

}

export default AddOrder;