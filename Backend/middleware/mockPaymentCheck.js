const mockProcessPayment = (paymentMethod, totalAmount) => {
    // --- MOCK LOGIC FOR DEMO ---
    
    // Simulate a failure for a specific case (e.g., if total is exactly 1.00 INR)
    if (paymentMethod === 'Card' && totalAmount <= 1.00) {
        return { status: 'failed', errorCode: 'INSUFFICIENT_FUNDS' };
    }
    
    // Assume success for all other valid payments
    return { status: 'succeeded', transactionId: 'MOCK_' + Date.now() };
};

const paymentCheck = async (req, res, next) => {
    const { paymentMethod, totalAmount } = req.body;

    if (!paymentMethod || !totalAmount) {
        return res.status(400).json({ success: false, message: "Payment method and total amount are required." });
    }

    try {
        let paymentResult = { status: 'succeeded' }; // Default for COD/Mock

        // 1. Process for Non-COD payments
        if (paymentMethod === 'Card' || paymentMethod === 'UPI') {
            // In a real application, you replace mockProcessPayment 
            // with calls to Stripe, Razorpay, or other gateway APIs.
            paymentResult = mockProcessPayment(paymentMethod, totalAmount);
        } 
        // 2. COD payments are assumed successful for initial order creation
        // but status is set to 'Pending' (handled in the route).
        
        
        // 3. Handle Payment Failure
        if (paymentResult.status !== 'succeeded') {
            // Stop the request here and send a failure response
            return res.status(402).json({ 
                success: false, 
                message: "Payment failed. Please check your details or try COD.",
                errorCode: paymentResult.errorCode || 'PAYMENT_DECLINED'
            });
        }

        // 4. Success: Attach result to request object and proceed
        req.paymentResult = paymentResult;
        
        next(); // Proceed to the final order creation route

    } catch (error) {
        console.error('Payment processing error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error during payment processing.',
            details: error.message
        });
    }
};

export default paymentCheck;