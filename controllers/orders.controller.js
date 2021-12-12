const Order = require('../models/Order');

module.exports = {
    getOrders: async function(req, res){
        try{
            const orders = await Order.getOrders();
            res.status(200).json(orders);

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

            const order = await Order.getOrder();
            res.status(200).json(orders);

        }catch(e){
            console.log('[ERROR] ${e}');
            res.status(500).json({
                error: e
            });
        }
    },
    addOrder: function(req, res){
        try{

            const { vendor_ID, comment, orderItems } = req.body;

            const order = await Order.addOrder(vendor_ID, comment, orderItems);

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
    approveOrder: async function(req, res){
        try{
            
            const { orderID, status, managerRemarks, managerID } = req.body;
            const order = await Order.approveOrder(orderId, status, managerRemarks, managerID);
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
    deleteOrder: function(req, res){
        try{
            const { id } = req.params;
            const order = Order.deleteOrder(id);
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

