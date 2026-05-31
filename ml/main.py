from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(title="BudgetMitra ML Service")

class HistoryItem(BaseModel):
    date: str
    price: float

class PredictionRequest(BaseModel):
    productId: str
    history: List[HistoryItem]

@app.get("/")
def read_root():
    return {"status": "ML Service is running"}

@app.post("/ml/predict")
def predict_price(request: PredictionRequest):
    if not request.history:
        return {
            "recommendation": "WAIT",
            "confidence": 0,
            "dealScore": 0,
            "dealLabel": "NO DATA",
            "explanation": "Not enough historical data to make a recommendation.",
            "expectedDropWindow": "N/A"
        }

    # Sort history by date just in case
    sorted_history = sorted(request.history, key=lambda x: x.date)
    prices = [item.price for item in sorted_history]
    
    current_price = prices[-1]
    min_price = min(prices)
    avg_price = sum(prices) / len(prices)
    
    # Calculate Deal Score (0-100)
    score = 50  # Base score
    
    # Factor 1: Current vs Average
    if current_price < avg_price:
        diff_pct = (avg_price - current_price) / avg_price
        score += min(30, diff_pct * 100 * 2) # max 30 points
    else:
        diff_pct = (current_price - avg_price) / avg_price
        score -= min(20, diff_pct * 100 * 2)
        
    # Factor 2: Current vs All Time Low
    if current_price <= min_price * 1.05: # Within 5% of all time low
        score += 20
        
    # Cap score between 0 and 100
    score = max(0, min(100, int(score)))
    
    # Determine Labels
    if score >= 75:
        recommendation = "BUY"
        label = "GREAT DEAL"
        explanation = f"Current price is significantly below the average of ₹{int(avg_price)}. It's very close to the all-time low."
        drop_window = "N/A"
    elif score >= 50:
        recommendation = "WAIT"
        label = "AVERAGE DEAL"
        explanation = f"Price is average. It might drop lower during upcoming sales."
        drop_window = "1-2 weeks"
    else:
        recommendation = "WAIT"
        label = "POOR DEAL"
        explanation = f"Price is currently very high compared to the historical average."
        drop_window = "3-4 weeks"

    return {
        "recommendation": recommendation,
        "confidence": round(score / 100, 2),
        "dealScore": score,
        "dealLabel": label,
        "explanation": explanation,
        "expectedDropWindow": drop_window
    }
