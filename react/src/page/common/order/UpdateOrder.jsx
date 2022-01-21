import styles from 'styles/common/order/Order.module.scss';

import { FaEdit, FaReply, FaTrashAlt } from 'react-icons/fa';

import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

// components
import Table from "components/Table.component";

//message
import * as swal from "sweetalert";
import * as alertify from "alertifyjs";

function UpdateOrder() {

    const navigate = useNavigate();

    const location = useLocation();
    const [items, setItems] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [vendor, setVendor] = useState({});
    const [grandTotal, setGrandTotal] = useState(0);
    const [vendorPIC, setVendorPIC] = useState('');

    const [vendorName, setVendorName] = useState("Please select a vendor");
    const itemName = useRef('');
    const unitPrice = useRef(0);
    const quantity = useRef(0);
    const vendorIdInput = useRef('');
    const orderRemarks = useRef('');

    const [manager, setManager] = useState('');
    const [managerRemarks, setManagerRemarks] = useState('');

    const itemList = {
        header: ["Item", "Quantity", "Unit Price", "Sub Price"],
        colWidthPercent: ["30%", "15%", "15%", "15%"],
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

        setVendorName(vendor.brand);
        setVendorPIC(vendor.pic_name);
        setVendor(vendor);
        // replace key names
        // replace underscore with space
        // capitalize first letter
        Object.keys(vendor).forEach((key) => {
            vendor[
                key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
            ] = vendor[key];
            delete vendor[key];
        });


    };

    const genRandomHash = (len) => {
        // generate random 8byte hash
        let text = "";

        const possible =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < len; i++)
            text += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );

        return text;
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

                setItems(item.items.map(i => [
                    genRandomHash(8),
                    i.name,
                    i.quantity,
                    i.unit_price,
                    i.quantity * i.unit_price
                ]));

                const total = item.items.reduce((acc, i) => acc + i.quantity * i.unit_price, 0);

                setGrandTotal(total);
                /* setManager(item.manager_ID); */
                console.log(item.manager_remarks);
                console.log(item.manager_ID);
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

    const getItems = () => {
        let gTotal = grandTotal;
        let rows = items;

        if (itemName.length === 0 || isNaN(quantity.current.value) || isNaN(unitPrice.current.value)) {
            return;
        }

        let item = {
            itemName: itemName.current.value,
            qty: parseInt(quantity.current.value),
            unitPrice: parseFloat(unitPrice.current.value),
        };

        const subPrice = item.unitPrice * item.qty;

        gTotal += subPrice;

        rows.push([item.id || genRandomHash(8), item.itemName, item.qty, item.unitPrice, subPrice]);

        itemName.current.value = "";
        quantity.current.value = "";
        unitPrice.current.value = "";

        setItems(rows);
        setGrandTotal(gTotal);
    };


    useEffect(() => {
        loadData();
    }, []);

    useEffect(async () => {
        let request;

        if (location.state.status === 'rejected') {

            if (location.state.id) {
                request = await fetch('http://localhost:8080/api/orders/find/' + location.state.id);

                if (request.status === 200) {
                    const item = await request.json();

                    setManager(item.manager_ID);
                    setManagerRemarks(item.manager_remarks);

                }
            }
        } else {
            setManager('-');
            setManagerRemarks('Not Verify Yet');
        }

    }, [location.state.status]);

    const updateOrder = async () => {
        let order = {
            id: location.state.id,
            comment: orderRemarks.current.value,
            orderItems: items.map(item => {
                return {
                    name: item[1],
                    quantity: item[2],
                    unit_price: item[3],
                }
            })
        }

        const request = await fetch("http://localhost:8080/api/orders/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });

        if (request.status === 200) {
            await swal("Updated", "Order Detail Update Successfully!", "success");
			navigate("/user/orders");
        } else {
            console.log(request);
            alert("Error adding item");
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.order}>
                <div className={styles.formDetails}>
                    <div className={styles.manager}>
                        <div className={styles.managerTitle}>Manager Details</div>
                        <div className={styles.managerContent}>
                            <div className={styles.contSum}>
                                <label className={styles.managerLabel} for="managerLabel">Manager Name: </label>
                                <div className={styles.managerInput} /* useRef={managerID} */>
                                    {manager}
                                </div>
                            </div>
                            <div className={styles.contSum}>
                                <label className={styles.managerLabel} for="remarksLabel">Remarks: </label>
                                <div className={styles.managerInput} /* useRef={managerR} */>
                                    {managerRemarks}
                                </div>
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
                            <div className={styles.button} onClick={getItems}><FaReply /> Update List </div>

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
                                <div className={styles.vendor} for="gTotal">
                                    : RM {grandTotal.toFixed(2)}
                                </div>
                            </div>
                            <div className={styles.contSum}>
                                <label className={styles.formLabel} for="vendorSummary">Vendor: </label>
                                <div className={styles.vendorDetails} for="vendorS">
                                    <div className={styles.vendor}>
                                        : {vendorName}
                                    </div>
                                    <div className={styles.vendor}>
                                        : {vendorPIC}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.butOrder}>
                                <div
                                    className={styles.button}
                                    onClick={updateOrder}
                                >
                                    <FaEdit /> Update
                                </div>
                                <div className={styles.button}><FaTrashAlt />Request Delete</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default UpdateOrder;