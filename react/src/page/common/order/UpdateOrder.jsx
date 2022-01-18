import styles from 'styles/common/order/Order.module.scss';

import { FaEdit,FaReply,FaTrashAlt } from 'react-icons/fa';

import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
// components
import Table from "components/Table.component";

function UpdateOrder() {

    const [items, setItems] = useState([]);

    const location = useLocation();

	const [vendors, setVendors] = useState([]);
	const [vendor, setVendor] = useState({});

	const itemName = useRef("");
	const unitPrice = useRef(0);
	const quantity = useRef(0);
	const [grandTotal, setGrandTotal] = useState(0);
	const vendorIdInput = useRef("");
    const orderRemarks = useRef("");

    const itemList = {
		header: ["Item", "Quantity", "Unit Price", "Sub Price"],
		colWidthPercent: ["30%", "20%", "10%", "10%"],
		centered: [false, true, true, true],
	};

    const selectVendor = (e) => {
		// find vendor by id

		let vendor;
		if (e.target) {
			vendor = Object.assign(
				{},
				vendors.find((v) => v._id === e.target.value)
			);
		} else {
			vendor = Object.assign({}, e);
		}

		delete vendor._id;
		delete vendor.__v;

		// replace key names
		// replace underscore with space
		// capitalize first letter
		Object.keys(vendor).forEach((key) => {
			vendor[
				key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
			] = vendor[key];
			delete vendor[key];
		});

		setVendor(vendor);
	};

	const loadData = async () => {
		let request = await fetch(
			"http://localhost:8080/api/vendors/list",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const v = await request.json();

		setVendors(v);

		if (location.state.id) {
			request = await fetch('http://localhost:8080/api/orders/find/' + location.state.id);
            
			if (request.status === 200) {
                const item = await request.json();

				orderRemarks.current.value = item.comment;
				vendorIdInput.current.selectedIndex = v.findIndex(i => i._id === item.vendor_ID);
                
				selectVendor(v.find(i => i._id === item.vendor_ID));
			}
		}
	}

    const editItem = (id) => {
        const item = items.find(item => item[0] === id);
        
        

        if (item) {
            itemName.current.value = item[1];
            quantity.current.value = item[2];
            unitPrice.current.value = item[3];
        }

        setItems(items.filter(item => item[0] !== id));
        setGrandTotal(grandTotal - item[4]);
    };


    useEffect(() => {
		loadData();
    }, []);

    return (
        <div className={styles.content}>
            <div className={styles.order}>
                <div className={styles.formDetails}>
                    <div className={styles.manager}>
                        <div className={styles.managerTitle}>Manager Details</div>
                        <div className={styles.managerContent}>
                            <div className={styles.contSum}>
                                <label className={styles.managerLabel} for="managerLabel">Manager Name: </label>
                                <label className={styles.managerInput} for="managerName">Laila Suriani </label>
                            </div>
                            <div className={styles.contSum}>
                                <label className={styles.managerLabel} for="remarksLabel">Remarks: </label>
                                <p className={styles.managerInput} for="remarks">Please change this info </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className={styles.formDetails}>
                    <div className={styles.fTitle}> Order Form</div>
                    <div className={styles.orderForm}>
                        <div className={styles.orderInput}>
                            <label className={styles.formLabel} for="vendor">Vendor </label>
                            <select 
                                className={styles.formSelect} 
							    onChange={selectVendor}
							    ref={vendorIdInput}
                                disabled
                            >
                                {vendors.map((v, i) => (
								    <option key={v._id} value={v._id}>
									    {v.company_name || `Vendor ${i + 1}`}
								    </option>
							    ))}
                            </select>
                        </div>
                        <div className={styles.orderInput}>
                            <label className={styles.formLabel} for="remarks">Remarks </label>
                            <textarea 
                                className={styles.remarks}
                                id="remarks"
                                ref={orderRemarks}
                            ></textarea>
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
                            <div className={styles.button}><FaReply/> Update List </div>
                        
                        </div>
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
                        actions={[
							{
								icon: "FaReply",
								callback: (id) => {
									editItem(id);
								},
								tooltip: "Edit",
							},
						]}
				    />
				</div>
                <div className={styles.summary}>
                    <div className={styles.sumDetails}>
                        <div className={styles.sumContent}>
                            <div className={styles.contSum}>
                                <label className={styles.formLabel} for="grandTotal">Grand Total: </label>
                                <label className={styles.formLabel} for="gTotal">RM 0.00 </label>
                            </div>
                            <div className={styles.contSum}>
                                <label className={styles.formLabel} for="vendorSummary">Vendor: </label>
                                <p className={styles.formInput} for="vendorS">K2 SDN BHD </p>
                            </div>
                            <div className={styles.butOrder}>
                                <div className={styles.button}><FaEdit/> Update</div>
                                <div className={styles.button}><FaTrashAlt/>Request Delete</div>
                                <input type="hidden" name="status" id="status" value="Submit for Approval"></input>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )

}

export default UpdateOrder;