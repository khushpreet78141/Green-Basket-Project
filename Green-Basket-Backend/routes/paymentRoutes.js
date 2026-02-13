import express from 'express'
import mongoose from 'mongoose'
import OrderDetails from '../models/orderSchema.js'
const router = express.Router()
import auth from '../middleware/authmiddleware.js'
//to make payment
router.post("/proceedPayment",auth, async (req, res) => {
    try {
        const { orderId , amount } = req.body
        const userId = req.userId
        if (!orderId || !amount) {
            return res.status(400).json({
                success: false,
                message: "orderId and amount are required"
            })
        }
        
        const paymentOrder = {
            paymentId: "order_test_" + Date.now(),
            userId,
            amount: amount * 100,   //razorpay uses paise
            currency: "INR",
            status: "SUCCESS"
        }
        
        res.status(200).json({
            success: true,
            paymentOrder
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            message: "Internal server Error"
        })
    }


})

// to verify successfull that payment has been done
router.post("/verify-payment",auth, async (req, res) => {

    try {

        const { paymentId, orderId, status } = req.body
        if (!paymentId || !orderId || !status) {
            return res.status(400).json({
                success: false,
                message: "invalid data"
            })
        }

        const updateStatus = await OrderDetails.findOneAndUpdate({ orderId }, { status: status === "SUCCESS" ? "PAID" : "FAILED" }, { new: true })
        if (!updateStatus) {
            return res.status(404).json({
                success: false,
                message: "product Not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "payment verified successfully",
            data: updateStatus
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            message: "payment verification failed"
        })
    }
}
);


export default router;

