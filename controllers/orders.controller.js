const mongoose = require('mongoose');

const Order = require('../models/Order');
const Vendor = require('../models/Vendors');
const Message = require('../models/Message');

module.exports = {
    getOrders: async function(req, res){
        try{
            let orders = await Order.getOrders();

            let result = [];

            for (let x = 0; x < orders.length; x++) {
                let vendor = await Vendor.findById(orders[x].vendor_ID);

                result.push({
                    ...orders[x]._doc,
                    vendor_name: vendor.company_name
                });;
            }

            res.status(200).json(result);

        }catch(e){
            console.log('[ERROR] ${e}');
            res.status(500).json({
                error: e
            });
        }
    },
    getOrder: async function(req, res){
        try{

            const { id } = req.params;

            const order = await Order.getOrder(id);
            res.status(200).json(order);

        }catch(e){
            console.log(`[ERROR] ${e.message}`);
            res.status(500).json({
                error: e
            });
        }
    },
    addOrder: async function(req, res){
        try{

            const { vendor_ID, comment, orderItems } = req.body;

            const order = await Order.addOrder(vendor_ID, comment, orderItems);

            if(order){
                /* render items as a list of ul li */
                let items = '';
                for(let x = 0; x < order.items.length; x++){
                    items += `<li>${order.items[x].name}, ${order.items[x].quantity}, RM${order.items[x].unit_price} per unit</li>`;
                }

                const vendor = await Vendor.findById(order.vendor_ID);

                const content = `<p>Order from vendor ${vendor.company_name}</p>
                                <p>Items:</p>
                                <ul>${items}</ul>`;

                const msg = await Message.add('New order request', content, ['manager', 'admin'], 'request');

                await msg.attachOrder(order._id);

                res.status(200).json(order);
            }
            else{
                res.status(404).json({
                    error: 'Order not found'
                });
            }        
        }catch(e){
            console.log(`[ERROR] ${e.message}`);
            res.status(500).json({
                error: e
            });
        }
    },
    updateOrder: async function(req, res){
        try{
            
            const { id, comment, orderItems } = req.body;
            const order = await Order.updateOrder(id, comment, orderItems);
            
            if(order){
                res.status(200).json(order);
            }
            else{
                res.status(404).json({
                    error: 'Order not found'
                });
            }

        }catch(e){
            console.log(`[ERROR] ${e}`);
            res.status(500).json({
                error: e
            });
        }
    },
    verifiedOrder: async function(req, res){
        try{
            
            const { id, status, managerRemarks } = req.body;
            const order = await Order.verifiedOrder(id, status, managerRemarks, req.user._id);
            if(order){
                res.status(200).json(order);
            }
            else{
                res.status(404).json({
                    error: 'Order not found'
                });
            }     
        }catch(e){
            console.log(`[ERROR] ${e}`);
            res.status(500).json({
                error: e
            });
        }
    },
    requestDelete: async function(req, res){
        try{
            
            const { id } = req.params;
            const order = await Order.requestDelete(id);
            
            if(order){
                res.status(200).json(order);
            }
            else{
                res.status(404).json({
                    error: 'Order not found'
                });
            }

        }catch(e){
            console.log(`[ERROR] ${e}`);
            res.status(500).json({
                error: e
            });
        }
    },
    deleteOrder: async function(req, res){
        try{
            const { id } = req.params;
            const order = await Order.deleteOrder(id);

            res.status(200).json({
                message: 'Order deleted'
            });
        }catch(e){
            console.log(`[ERROR] ${e}`);
            res.status(500).json({
                error: e
            });
        }
    } 
}

