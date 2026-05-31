import csv
import random

# Mapping products to their respective realistic reviews
reviews_data = {
    "apple-iphone-15-128gb-black": ["Highly Positive", "Excellent display | Fast performance | Amazing camera", "Expensive | No charger in box | 60Hz screen", "Heating during heavy gaming", "Users generally love the iPhone 15 for its refined design and great cameras, though the 60Hz display is a sticking point at this price.", "Wait for a major sale event if you want maximum value."],
    "samsung-galaxy-s24-256gb-onyx-black": ["Positive", "Compact design | Great display | Good battery life", "Exynos chip in some regions | Pricey", "Slight camera lag", "The Galaxy S24 remains a strong contender for those wanting a compact, powerful Android device.", "Solid buy right now, but watch out for festival discounts."],
    "oneplus-12-256gb-flowy-emerald": ["Highly Positive", "Stunning design | Blazing fast | Superfast charging", "No IP68 rating | Large size", "Curved screen accidental touches", "Reviewers praise the OnePlus 12 as a true flagship killer offering incredible value and performance.", "Excellent value for money, buy now."],
    "xiaomi-redmi-note-13-pro-256gb": ["Mixed", "Great value | Fast charging | Crisp display", "Bloatware | Average low-light camera", "Software updates are slow", "A very solid mid-ranger that covers all the basics well, despite some heavy UI elements.", "Wait for a discount before purchasing."],
    "google-pixel-8-128gb-hazel": ["Positive", "Amazing camera | Clean UI | Long software support", "Battery life is average | Slow charging", "Fingerprint sensor can be finicky", "The Pixel 8 is loved for its software and cameras, but power users might find the battery lacking.", "Wait for a price drop."],
    "nothing-phone-2-256gb-dark-grey": ["Highly Positive", "Unique glyph interface | Smooth UI | Good battery", "Average cameras | Expensive", "Slightly bulky", "A breath of fresh air in design with super smooth software, though cameras are just average.", "Buy if you value design and software experience."],
    
    "apple-airpods-pro-2nd-gen": ["Highly Positive", "Incredible ANC | Seamless ecosystem | Great fit", "Very expensive | Lightning port on older stock", "Occasional connection drops on non-Apple devices", "Considered the gold standard for wireless earbuds if you are in the Apple ecosystem.", "A solid buy, especially during seasonal sales."],
    "sony-wh-1000xm5-black": ["Highly Positive", "Industry-leading ANC | Great comfort | Long battery life", "Cannot fold | Expensive", "Gets warm on ears after long use", "The WH-1000XM5 are phenomenal over-ear headphones with top-tier noise cancellation.", "Highly recommended for travelers and audiophiles."],
    "jbl-tune-770nc-blue": ["Positive", "Good bass | Affordable ANC | Comfortable", "Build feels slightly plasticky | Micro-USB on some variants", "ANC is basic", "A great budget choice for bass lovers wanting decent noise cancellation.", "Wait for a sale to get it at a bargain."],
    "boat-airdopes-141-black": ["Mixed", "Very cheap | Bass-heavy | Long battery", "Flimsy case | Call quality is poor", "Disconnection issues", "Decent for the price, but mostly suited for casual listening and workouts.", "Buy now, it's usually always cheap."],
    "oneplus-buds-3-splendid-blue": ["Positive", "Great sound | Dual connection | Good battery", "Touch controls are sensitive | Glossy case scratches easily", "Average ANC", "A strong mid-range earbud offering features usually found in premium models.", "Great value, solid buy."],
    
    "apple-watch-se-gps-44mm": ["Positive", "Smooth performance | Great fitness tracking | Value", "No always-on display | Battery life is 1 day", "Screen scratches easily", "The best entry point into the Apple Watch ecosystem without breaking the bank.", "Wait for a sale if price is an issue, otherwise a solid buy right now."],
    "samsung-galaxy-watch-6-44mm": ["Positive", "Beautiful display | Great health tracking | Slim bezels", "Battery life | Slow charging", "Some lag on complex watch faces", "A great companion for Android users with a beautiful, vivid screen.", "Wait for bundling offers with phones."],
    "jbl-flip-6-portable-speaker": ["Highly Positive", "Punchy sound | Waterproof | Portable", "No aux input | No built-in mic", "Battery drains fast at max volume", "A rugged, fantastic sounding portable speaker perfect for outdoor use.", "Solid buy right now."],
    "lenovo-ideapad-slim-5-16gb-512gb": ["Positive", "Good performance | Premium look | Good keyboard", "Average battery life | Screen could be brighter", "Fans get loud under load", "A reliable daily driver laptop for students and professionals.", "Wait for back-to-school or festive sales."],
    "hp-victus-gaming-laptop-i5-16gb-512gb": ["Mixed", "Good 1080p gaming | Clean design | Affordable", "Screen wobble | Average color gamut", "Battery life is very poor", "An entry-level gaming laptop that gets the job done, but compromises on screen quality.", "Buy during big electronic sales."],
    
    "nike-club-men-hoodie-black": ["Positive", "Very comfortable | Classic design | Durable", "Runs slightly small | Fades after many washes", "Lint sticks to it easily", "A classic, cozy staple for casual wear, though you might want to size up.", "Buy now, very popular item."],
    "adidas-men-running-shoes-duramo-sl": ["Mixed", "Lightweight | Good for casual running | Affordable", "Not very durable | Narrow fit", "Sole wears out quickly on hard surfaces", "A decent pair of entry-level running shoes, but not for serious marathon runners.", "Wait for 40-50% off sales, very common."],
    "levi-s-men-511-slim-jeans-blue": ["Highly Positive", "Great fit | Classic style | Durable denim", "Sizing inconsistency between colors | Requires break-in", "Pockets are slightly shallow", "A timeless classic that offers a great slim (but not skinny) fit.", "Wait for seasonal sales to grab multiple pairs."],
    "puma-unisex-essential-logo-tee": ["Positive", "Soft cotton | Casual fit | Inexpensive", "Neck stretches out | Thin material", "Logo fades over time", "A basic everyday t-shirt that is comfortable but may not last years.", "Buy during clearance sales for maximum value."]
}

import os

# Get directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))
csv_file = os.path.join(script_dir, "review_summaries.csv")

# Read original to get header
with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    header = next(reader)
    
# Write new data
with open(csv_file, 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    for key, data in reviews_data.items():
        writer.writerow([key] + data)

print("Successfully rewrote review_summaries.csv")
