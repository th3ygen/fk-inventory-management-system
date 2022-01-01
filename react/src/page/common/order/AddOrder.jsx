import styles from 'styles/common/order/Add.module.scss';

function AddOrder() {
    return (
        
            <div className={styles.content}>
                <div className={styles.order}>
                    <fieldset>
                        <legend>ORDER DETAILS</legend>
                            <label for="vendor">Vendor </label>
                            <select id="vendor" name="vendor">
                                <option>K2 SDN BHD</option>
                                <option>RO SDN BHD</option>
                                <option>LA INDUSTRY</option>
                            </select><br></br>
                            <textarea name="vendorDetail" id="vendorDetail"></textarea><br></br>
                            <label for="remarks">Remarks </label>
                            <textarea name="remarks" id="remarks"></textarea><br></br>
                    </fieldset>

                    <fieldset>
                        <legend>ITEM DETAILS</legend>
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

export default AddOrder;