import styles from 'styles/common/order/Order.module.scss';

function ApproveOrder() {
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

                    <div className={styles.butOrder}>
                        <fieldset>
                            <legend>MANAGER APPROVAL</legend>
                            <label for="comments">Comments </label>
                            <textarea name="remarks" id="remarks"></textarea><br></br>
                            <input type="hidden" name="status" id="status" value="APPROVE/REJECT"></input>
                            <input type="hidden" name="managerID" id="managerID" value="ManagerID"></input>
                            
                            <div className={styles.but}>
                                <div className={styles.button} id="button">REJECT</div>
                                <div className={styles.button} id="button">APPROVE</div>
                                <div className={styles.button} id="button">DELETE</div>
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
                        </div>
                        <div className={styles.sItem}>
                            <div className={styles.sItemDetail}>
                                <div className={styles.itemName}>Gula</div>
                                <div className={styles.subPrice}>23.00</div>
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

export default ApproveOrder;