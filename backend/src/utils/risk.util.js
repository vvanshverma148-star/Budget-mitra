/**
 * Calculates the product risk score out of 100 based on weighted factors.
 * Weights: 
 * - price volatility: 30%
 * - current price vs 12-month average: 20%
 * - rating: 15%
 * - review count: 10%
 * - delivery days: 10%
 * - discount reliability: 10%
 * - availability/return risk: 5%
 * 
 * @param {Object} product 
 * @param {Object} historyStats 
 * @param {Object} riskFactors 
 * @returns {Object}
 */
function calculateRiskScore(product, historyStats, riskFactors) {
    let score = 0;
    let breakdown = {};

    // 1. Price volatility (30% weight)
    let volatilityRisk = Math.min(100, historyStats.volatilityPercent || 0); 
    let volatilityScore = (volatilityRisk / 100) * 30;
    score += volatilityScore;
    breakdown.volatility = volatilityScore;

    // 2. Current price vs 12-month average (20% weight)
    let avgPrice = historyStats.averagePrice || product.price_inr;
    let priceRatio = product.price_inr / avgPrice;
    let priceScore = 0;
    if (priceRatio > 1.1) priceScore = 20;
    else if (priceRatio > 1.0) priceScore = 10;
    else priceScore = 0;
    score += priceScore;
    breakdown.priceVsAvg = priceScore;

    // 3. Rating (15% weight)
    let ratingRisk = (5 - (product.rating || 3)) / 4; 
    let ratingScore = ratingRisk * 15;
    score += ratingScore;
    breakdown.rating = ratingScore;

    // 4. Review count (10% weight)
    let reviewScore = product.reviews_count < 100 ? 10 : (product.reviews_count < 1000 ? 5 : 0);
    score += reviewScore;
    breakdown.reviewCount = reviewScore;

    // 5. Delivery days (10% weight)
    let deliveryScore = product.delivery_days > 7 ? 10 : (product.delivery_days > 3 ? 5 : 0);
    score += deliveryScore;
    breakdown.delivery = deliveryScore;

    // 6. Discount reliability (10% weight)
    let relScore = ((10 - parseFloat(riskFactors.discount_reliability || 5)) / 10) * 10;
    score += relScore;
    breakdown.discountReliability = relScore;

    // 7. Availability/Return risk (5% weight)
    let retScore = (parseFloat(riskFactors.return_risk || 3) / 5) * 5;
    score += retScore;
    breakdown.returnRisk = retScore;

    score = Math.min(100, Math.max(0, Math.round(score)));

    let riskLabel = "Low Risk";
    if (score > 66) riskLabel = "High Risk";
    else if (score > 33) riskLabel = "Medium Risk";

    return {
        riskScore: score,
        riskLabel: riskLabel,
        explanation: `Risk is ${riskLabel.toLowerCase()} with a score of ${score}/100 based on ${Object.keys(breakdown).length} factors.`,
        factorBreakdown: breakdown
    };
}

module.exports = {
    calculateRiskScore
};
