import styles from 'styles/common/order/Order.module.scss';

function UpdateOrder() {
    return (
        
            <div className={styles.content}>
                <div className={styles.order}>
                    <fieldset>
                        <legend>Order Details</legend>
                            <label for="vendor">Vendor </label>
                            <select id="vendor" name="vendor" value="RO SDN BHD" disabled>
                                <option>K2 SDN BHD</option>
                                <option>RO SDN BHD</option>
                                <option>LA INDUSTRY</option>
                            </select><br></br>
                            <textarea name="vendorDetail" id="vendorDetail" disabled></textarea><br></br>
                            <label for="remarks">Remarks </label>
                            <textarea name="remarks" id="remarks"></textarea><br></br>
                    </fieldset>

                    <fieldset>
                        <legend>Item Details</legend>
                            <label for="itemName">Item Name </label>
                            <input type="text"></input><br></br>
                            <label for="unitPrice">Unit Price </label>
                            <input type="number"></input><br></br>
                            <label for="quantity">Quantity </label>
                            <input type="number"></input><br></br>
                        <div className={styles.itemButton}>
                            <div className={styles.button}>ADD</div>
                        </div>
                    </fieldset>

                    <div className={styles.butOrder}>
                        <fieldset>
                            <legend>MANAGER APPROVAL</legend>
                            <label for="comments">Comments </label>
                            <textarea name="remarks" id="remarks" disabled></textarea><br></br>
                            <label for="status">Status </label>
                            <label for="result">Approve </label><br></br>
                            <label for="manager">Manager </label>
                            <label for="managerID">Zaman Rani </label>
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
                                <div className={styles.updateB} id="update"><i class='bx bx-redo'></i></div>
                            </div>
                        </div>
                        <div className={styles.sItem}>
                            <div className={styles.sItemDetail}>
                                <div className={styles.itemName}>Gula</div>
                                <div className={styles.subPrice}>23.00</div>
                            </div>
                            <div className={styles.sItemButton}>
                                <div className={styles.updateB} id="update"><i class='bx bx-redo'></i></div>
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