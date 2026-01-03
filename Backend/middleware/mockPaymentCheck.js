const mockProcessPayment = (paymentMethod, totalAmount) => {
    // MOCK LOGIC FOR DEMO 
    
    // Simulate a failure for a specific case
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

        if (paymentMethod === 'Card' || paymentMethod === 'UPI') {
            paymentResult = mockProcessPayment(paymentMethod, totalAmount);
        } 

        if (paymentResult.status !== 'succeeded') {

            return res.status(402).json({ 
                success: false, 
                message: "Payment failed. Please check your details or try COD.",
                errorCode: paymentResult.errorCode || 'PAYMENT_DECLINED'
            });
        }

        req.paymentResult = paymentResult;
        
        next(); 

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