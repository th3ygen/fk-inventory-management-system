import styles from 'styles/common/order/Order.module.scss';

function ApproveOrder() {

    return (
        <div className={styles.content}>
            <div className={styles.order}>
                <div className="fTitle">
                    
                </div>
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

                <div className={styles.butOrder}>
                    <fieldset>
                        <legend>MANAGER APPROVAL</legend>
                        <label className={styles.formLabel} for="comments">Comments </label>
                        <textarea className={styles.remarks} id="remarks"></textarea><br className={styles.spacing}></br>
                        <input className={styles.formInput} type="hidden" name="status" id="status" value="APPROVE/REJECT"></input>
                        <input className={styles.formInput} type="hidden" name="managerID" id="managerID" value="ManagerID"></input>
                            
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