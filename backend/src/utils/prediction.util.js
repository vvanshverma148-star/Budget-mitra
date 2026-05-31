const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

/**
 * Generates a Buy Now / Wait prediction using static CSV data.
 * @param {string} productKey 
 * @returns {Promise<Object>}
 */
async function generatePrediction(productKey) {
    return new Promise((resolve, reject) => {
        const history = [];
        const csvPath = path.join(__dirname, '../../../price_history_monthly.csv');
        
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (row) => {
                if (row.product_key === productKey) {
                    history.push(parseFloat(row.price_inr));
                }
            })
            .on('end', () => {
                if (history.length === 0) {
                    return resolve({ recommendation: "UNKNOWN", reason: "No historical data." });
                }

                let sum = history.reduce((a, b) => a + b, 0);
                let avg = sum / history.length;
                let min = Math.min(...history);
                let latest = history[history.length - 1];

                let expectedDrop = latest - min;
                let recommendation = "BUY";
                let reason = "Price is near its 12-month low. Great time to buy.";
                let waitTime = "None";
                let confidence = 85;

                if (latest > avg) {
                    recommendation = "WAIT";
                    reason = `Current price is above the 12-month average. Wait for a drop.`;
                    waitTime = "2-4 weeks";
                    confidence = 90;
                } else if (latest > min * 1.05) {
                    recommendation = "WAIT";
                    reason = `Price could potentially drop further based on historical lows.`;
                    waitTime = "1-2 weeks";
                    confidence = 75;
                }

                resolve({
                    twelveMonthAverage: Math.round(avg),
                    latestPrice: latest,
                    lowestPrice: min,
                    trendDirection: latest > avg ? "Up" : "Down",
                    volatility: Math.round((Math.max(...history) - min) / avg * 100),
                    expectedDropAmount: recommendation === "WAIT" ? Math.round(expectedDrop) : 0,
                    suggestedWaitTime: waitTime,
                    confidenceScore: confidence,
                    reason: reason,
                    recommendation: recommendation
                });
            })
            .on('error', reject);
    });
}

module.exports = {
    generatePrediction
};
