const OrderModel = require('../model/orderModel')
const OrderItemsModel = require('../model/orderItemsModel')
const AddressModel = require('../model/addressMOdel')
const UserModel = require('../model/userModel')

// place order
exports.placeOrder = async (req, res) => {
    let orderItemsIds = await Promise.all(
        req.body.orderItems.map(async OrderItem => {
            let orderItem = await OrderItemsModel.create({
                product: OrderItem.product,
                quantity: OrderItem.quantity
            })
            if (!orderItem) {
                return res.status(400).json({ error: "Something went wrong." })
            }
            return orderItem._id
        })
    )
    let individual_total = await Promise.all(
        orderItemsIds.map(async item_id => {
            let item = await OrderItemsModel.findById(item_id).populate('product', 'price')
            return item.product.price * item.quantity
        })
    )
    let total = individual_total.reduce((acc, cur) => acc + cur)
    let address
    if (req.body.address) {
        address = await AddressModel.create({
            street: req.body.address.street,
            city: req.body.address.city,
            state: req.body.address.state,
            zipcode: req.body.address.zipcode,
            country: req.body.address.country,
            country_code: req.body.address.country_code,
            phone: req.body.address.phone
        })
    }
    let user = await UserModel.findById(req.body.user)

    let order = await OrderModel.create({
        orderItems: orderItemsIds,
        total: total,
        user: req.body.user,
        address: req.body.address ? address._id : user.address
    })

    if (!order) {
        return res.status(400).json({ error: "Failed to place order" })
    }

    res.send(order)

}

// to get all orders
exports.getAllOrders = async (req, res) => {
    let orders = await OrderModel.find().populate({ path: 'user', populate: 'address' })
        .populate({ path: 'orderItems', populate: { path: 'product', populate: 'category' } })
    if (!orders) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(orders)
}

// to get order details
exports.getOrderDetails = async (req, res) => {
    let order = await OrderModel.findById(req.params.id).populate({ path: 'user', populate: 'address' })
        .populate({ path: 'orderItems', populate: { path: 'product', populate: 'category' } })
    if (!order) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(order)
}

// to get orders of a user
exports.getOrdersByUser = async (req, res) => {
    let order = await OrderModel.find({user: req.params.user_id}).populate({ path: 'user', populate: 'address' })
        .populate({ path: 'orderItems', populate: { path: 'product', populate: 'category' } })
    if (!order) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(order)
}

// update order
exports.updateOrder = async (req,res) => {
    let order = await OrderModel.findByIdAndUpdate(req.params.id, {
        orderStatus: req.body.order_status
    },{new: true})
    if(!order){
        return res.status(40).json({error:"Something went wrong"})
    }
    res.send(order)
}

// delete Order
exports.deleteOrder = (req, res) => {
    OrderModel.findByIdAndDelete(req.params.id)
        .then(order=>{
            if(!order){
                return res.status(400).json({error:"Order not found"})
            }
            order.orderItems.map(orderItem=>{
                OrderItemsModel.findByIdAndDelete(orderItem)
                .then(orderitem=>{
                    if(!orderitem){
                        return res.status(400).json({error:"Something went wrong"})
                    }
                })
            })
            res.send({message:"Order deleted successfully"})
        })
        .catch(error=>{
            return res.status(400).json({error:error.message})
        })
}