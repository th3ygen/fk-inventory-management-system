const mongoose = require('mongoose');

const Order = require('../models/Order');
const Vendor = require('../models/Vendors');

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
            console.log('[ERROR] ${e}');
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
            
            const { orderID, comment, orderItems } = req.body;
            const order = await Order.updateOrder(orderId, comment, orderItems);
            if(order){
                res.status(200).json(orders);
            }
            else{
                res.status(404).json({
                    error: 'Order not found'
                });
            }     
        }catch(e){
            console.log('[ERROR] ${e}');
            res.status(500).json({
                error: e
            });
        }
    },
    verifiedOrder: async function(req, res){
        try{
            
            const { orderID, status, managerRemarks, managerID } = req.body;
            const order = await Order.verifiedOrder(orderId, status, managerRemarks, managerID);
            if(order){
                res.status(200).json(orders);
            }
            else{
                res.status(404).json({
                    error: 'Order not found'
                });
            }     
        }catch(e){
            console.log('[ERROR] ${e}');
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
            console.log('[ERROR] ${e}');
            res.status(500).json({
                error: e
            });
        }
    } 
}

