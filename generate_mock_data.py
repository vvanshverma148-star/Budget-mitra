import csv
import random

product_keys = [
    "apple-iphone-15-128gb-black",
    "samsung-galaxy-s24-256gb-onyx-black",
    "oneplus-12-256gb-flowy-emerald",
    "xiaomi-redmi-note-13-pro-256gb",
    "google-pixel-8-128gb-hazel",
    "nothing-phone-2-256gb-dark-grey",
    "apple-airpods-pro-2nd-gen",
    "sony-wh-1000xm5-black",
    "jbl-tune-770nc-blue",
    "boat-airdopes-141-black",
    "oneplus-buds-3-splendid-blue",
    "apple-watch-se-gps-44mm",
    "samsung-galaxy-watch-6-44mm",
    "jbl-flip-6-portable-speaker",
    "lenovo-ideapad-slim-5-16gb-512gb",
    "hp-victus-gaming-laptop-i5-16gb-512gb",
    "nike-club-men-hoodie-black",
    "adidas-men-running-shoes-duramo-sl",
    "levi-s-men-511-slim-jeans-blue",
    "puma-unisex-essential-logo-tee"
]

platforms = ["Amazon", "Flipkart", "Myntra", "Croma"]

# 1. product_charges.csv
with open('product_charges.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['product_key', 'platform', 'platform_fee', 'delivery_charge', 'packaging_fee', 'tax_percent'])
    for pk in product_keys:
        for plat in platforms:
            plat_fee = random.choice([0, 19, 29, 49])
            del_charge = random.choice([0, 0, 40, 50, 100])
            pack_fee = random.choice([0, 0, 25, 49])
            tax = 18.0
            writer.writerow([pk, plat, plat_fee, del_charge, pack_fee, tax])

# 2. product_offers.csv
offers = [
    ("ICICI Credit Card", "Credit Card", "ICICI", 50000, 1000, 0, 1000),
    ("SBI Debit Card", "Debit Card", "SBI", 20000, 500, 0, 500),
    ("HDFC Credit Card", "Credit Card", "HDFC", 0, 0, 10, 1500),
    ("Axis Bank Card", "Credit Card", "Axis", 30000, 750, 0, 750),
    ("UPI", "UPI", "Any", 0, 0, 5, 200)
]
with open('product_offers.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['product_key', 'platform', 'coupon_code', 'coupon_discount', 'bank_name', 'payment_method', 'card_type', 'min_order_amount', 'discount_amount', 'discount_percent', 'max_discount'])
    for pk in product_keys:
        for plat in platforms:
            num_offers = random.randint(1, 3)
            selected_offers = random.sample(offers, num_offers)
            for off in selected_offers:
                coupon = random.choice(['', 'SAVE10', 'FESTIVAL'])
                c_disc = random.choice([0, 100, 500]) if coupon else 0
                writer.writerow([pk, plat, coupon, c_disc, off[2], off[1], off[0], off[3], off[4], off[5], off[6]])

# 3. review_summaries.csv
with open('review_summaries.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['product_key', 'overall_sentiment', 'top_pros', 'top_cons', 'common_complaints', 'ai_summary', 'buying_advice'])
    for pk in product_keys:
        sentiment = random.choice(['Positive', 'Highly Positive', 'Mixed'])
        pros = "Great battery life | Excellent display | Fast performance"
        cons = "A bit heavy | Expensive | No charger in box"
        complaints = "Heating issues during gaming | Late delivery"
        summary = f"Users generally love the {pk.replace('-', ' ')} for its performance and screen, though some note it gets warm under load."
        advice = "Wait for a sale if price is an issue, otherwise a solid buy right now."
        writer.writerow([pk, sentiment, pros, cons, complaints, summary, advice])

# 4. risk_factors.csv
with open('risk_factors.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['product_key', 'platform', 'return_risk', 'delivery_risk', 'discount_reliability', 'availability_risk'])
    for pk in product_keys:
        for plat in platforms:
            rr = round(random.uniform(1.0, 5.0), 1)
            dr = round(random.uniform(1.0, 5.0), 1)
            dsr = round(random.uniform(5.0, 10.0), 1)
            ar = round(random.uniform(1.0, 3.0), 1)
            writer.writerow([pk, plat, rr, dr, dsr, ar])

print("CSVs generated successfully.")
