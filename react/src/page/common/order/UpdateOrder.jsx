import styles from 'styles/common/order/Order.module.scss';

import { FaUndo } from 'react-icons/fa';

function UpdateOrder() {
    return (
        <div className={styles.content}>
            <div className={styles.order}>
                <fieldset>
                    <legend>Order Details</legend>
                    <label className={styles.formLabel} for="vendor">Vendor </label>
                    <select className={styles.formSelect} id="vendor" name="vendor" value="RO SDN BHD" disabled>
                        <option>K2 SDN BHD</option>
                        <option>RO SDN BHD</option>
                        <option>LA INDUSTRY</option>
                    </select><br className={styles.spacing}></br>
                    <textarea className={styles.vendorDetail} id="vendorDetail" disabled></textarea><br className={styles.spacing}></br>
                    <label className={styles.formLabel} for="remarks">Remarks </label>
                    <textarea className={styles.remarks} id="remarks"></textarea><br className={styles.spacing}></br>
                </fieldset>

                <fieldset>
                    <legend>Item Details</legend>
                    <label className={styles.formLabel} for="itemName">Item Name </label>
                    <input className={styles.formInput} type="text" /><br className={styles.spacing}></br>
                    <label className={styles.formLabel} for="unitPrice">Unit Price </label>
                    <input className={styles.formInput} type="number" /><br className={styles.spacing}></br>
                    <label className={styles.formLabel} for="quantity">Quantity </label>
                    <input className={styles.formInput} type="number" /><br className={styles.spacing}></br>
                    <div className={styles.itemButton}>
                        <div className={styles.button}>ADD</div>
                    </div>
                </fieldset>

                <div className={styles.butOrder}>
                    <fieldset>
                        <legend>MANAGER APPROVAL</legend>
                        <label className={styles.formLabel} for="comments">Comments </label>
                        <textarea className={styles.remarks} id="remarks" disabled></textarea><br className={styles.spacing}></br>
                        <label className={styles.formLabel} for="status">Status </label>
                        <label className={styles.formLabel} for="result">Approve </label><br className={styles.spacing}></br>
                        <label className={styles.formLabel} for="manager">Manager </label>
                        <label className={styles.formLabel} for="managerID">Zaman Rani </label>
                        <div className={styles.but}>
                            <div className={styles.button} id="butUpdate">UPDATE</div>
                            <div className={styles.button} id="butUpdate">REQUEST DELETE</div>
                        </div>
                    </fieldset>
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

export default UpdateOrder;