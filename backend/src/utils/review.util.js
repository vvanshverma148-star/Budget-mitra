const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

/**
 * Loads mock review summary by product_key from the CSV dataset.
 * @param {string} productKey 
 * @returns {Promise<Object>}
 */
async function getReviewSummary(productKey) {
    return new Promise((resolve, reject) => {
        const csvPath = path.join(__dirname, '../../../review_summaries.csv');
        let summary = null;
        
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (row) => {
                if (row.product_key === productKey) {
                    summary = row;
                }
            })
            .on('end', () => {
                if (summary) {
                    resolve(summary);
                } else {
                    resolve({
                        overall_sentiment: "Neutral",
                        top_pros: "N/A",
                        top_cons: "N/A",
                        common_complaints: "N/A",
                        ai_summary: "Not enough reviews to generate a summary.",
                        buying_advice: "Check platform reviews directly."
                    });
                }
            })
            .on('error', reject);
    });
}

module.exports = {
    getReviewSummary
};
