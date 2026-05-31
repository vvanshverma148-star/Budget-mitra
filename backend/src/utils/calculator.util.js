/**
 * Calculates the tax amount based on base price and tax percentage.
 * @param {number} basePrice 
 * @param {number} taxPercent 
 * @returns {number}
 */
function calculateTax(basePrice, taxPercent) {
    if (!taxPercent) return 0;
    return (basePrice * taxPercent) / 100;
}

/**
 * Applies a bank/card discount based on rules.
 * @param {number} basePrice 
 * @param {Object} offer 
 * @returns {Object}
 */
function calculateBankDiscount(basePrice, offer) {
    if (!offer || basePrice < offer.min_order_amount) {
        return { discountAmount: 0, explanation: "Minimum order amount not met or no offer available." };
    }

    let discount = 0;
    if (offer.discount_percent > 0) {
        discount = (basePrice * offer.discount_percent) / 100;
    } else if (offer.discount_amount > 0) {
        discount = offer.discount_amount;
    }

    if (offer.max_discount > 0 && discount > offer.max_discount) {
        discount = offer.max_discount;
    }

    return {
        discountAmount: discount,
        explanation: `Applied ${offer.bank_name} ${offer.card_type} offer.`
    };
}

/**
 * Calculates the final payable price.
 * @param {number} basePrice 
 * @param {Object} charges 
 * @param {Object} offer 
 * @returns {Object}
 */
function calculateFinalPrice(basePrice, charges, offer) {
    const taxAmount = calculateTax(basePrice, charges.tax_percent);
    const bankDiscountResult = calculateBankDiscount(basePrice, offer);
    
    let couponDiscount = offer && offer.coupon_discount ? parseFloat(offer.coupon_discount) : 0;

    const finalPrice = basePrice 
                     + parseFloat(charges.delivery_charge || 0) 
                     + parseFloat(charges.platform_fee || 0) 
                     + parseFloat(charges.packaging_fee || 0) 
                     + taxAmount 
                     - couponDiscount 
                     - bankDiscountResult.discountAmount;

    return {
        finalPrice: Math.max(0, finalPrice),
        taxAmount,
        bankDiscount: bankDiscountResult.discountAmount,
        couponDiscount,
        breakdown: {
            basePrice,
            deliveryCharge: parseFloat(charges.delivery_charge || 0),
            platformFee: parseFloat(charges.platform_fee || 0),
            packagingFee: parseFloat(charges.packaging_fee || 0),
            taxAmount,
            couponDiscount,
            bankDiscount: bankDiscountResult.discountAmount,
            explanation: bankDiscountResult.explanation
        }
    };
}

module.exports = {
    calculateTax,
    calculateBankDiscount,
    calculateFinalPrice
};
