import { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate, useOutletContext } from 'react-router-dom';

import styles from 'styles/common/vendor/ManageVendor.module.scss';

import Table from 'components/Table.component';
import PageHeader from 'components/PageHeader.component';

//message
import * as swal from "sweetalert";
import * as alertify from "alertifyjs";

function ManageVendor() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [user] = useOutletContext();

    const vendorData = {
        header: ["Company Name", "brand", "contact", "email", "Person in Charge", "Contact Number"],
        
        actions: [
            {
                icon: "FaEdit",
                callback: (n) => {
					navigate("/user/vendors/edit");
				},
                tooltip: "Edit",
            },
            {
                icon: "FaTrashAlt",
                callback: (id) => {
                    // console.log(id);
					deleteItem(id);
				},
                tooltip: "Delete",
            }
        ],
        colWidthPercent: ["15%", "10%", "10%", "15%", "15%", "15%"],
        centered: [false, true, true, true, true, true],
    };

    const deleteItem = async (id) => {

		const confirm = await swal({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: 'warning',
			buttons: {
				cancel: 'Cancel',
				delete: {
					text: 'Delete',
					value: 'delete',
				},
			},
		
		});

		if(confirm !== 'delete'){
			return;
		}

		// delete item with id from itemsData.items
		const request = await fetch(
			"http://localhost:8080/api/vendors/delete/" + id,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					authorization: "Bearer " + user.token,
				},
			}
		);

		if (request.status === 200) {
			await swal("Deleted", "Vendor Succesfully Deleted!", "error");
			const item = items.find(i => i[0] === id);

		} else {
			console.log(id, request);
			alertify.notify('Error deleting vendor', 'error');
		}
	};

    useEffect(() => {
        (async () => {

            if (!user) {
				return;
			}
            let request = await fetch(
                "http://localhost:8080/api/vendors/list",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "Bearer " + user.token,
                    },
                }
            );
    
            if (request.status === 200) {
                let response = await request.json();
    
                let rows = [];

                response.forEach(item => {
                    
                    rows.push([
                        item._id,
                        item.company_name,
                        item.brand,
                        item.contact,
                        item.email,
                        item.pic_name,
                        item.pic_contact
                    ]);
                });
    
                setItems(rows);
            }
    
        })();
    }, [user]);

    return (
        <div className={styles.container}>
            <PageHeader
                title="Manage Vendor"
                brief="This is the page to manage vendor"
                navs={[
                    {
                        icon: "FaReply",
                        name: "Issue new Vendor",
                        path: "/user/vendors/add",
                    },
                    
                ]}

            />
            <div className={styles.vendorTable}>
                <Table
                    title="Vendors"
                    headers={vendorData.header}
                    items={items}
                    centered={vendorData.centered}
                    colWidthPercent={vendorData.colWidthPercent}
                    actions={vendorData.actions}
                />
            </div>
        </div>
    )
}

export default ManageVendor;