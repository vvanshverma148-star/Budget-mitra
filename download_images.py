import os
import requests
import time
from duckduckgo_search import DDGS

products = [
  {"key": "apple-iphone-15-128gb-black", "query": "Apple iPhone 15 Black smartphone transparent png or white background product shot"},
  {"key": "samsung-galaxy-s24-256gb-onyx-black", "query": "Samsung Galaxy S24 Onyx Black smartphone white background"},
  {"key": "oneplus-12-256gb-flowy-emerald", "query": "OnePlus 12 Flowy Emerald smartphone white background"},
  {"key": "xiaomi-redmi-note-13-pro-256gb", "query": "Xiaomi Redmi Note 13 Pro+ smartphone white background"},
  {"key": "google-pixel-8-128gb-hazel", "query": "Google Pixel 8 Hazel smartphone white background"},
  {"key": "nothing-phone-2-256gb-dark-grey", "query": "Nothing Phone 2 Dark Grey white background"},
  {"key": "apple-airpods-pro-2nd-gen", "query": "Apple AirPods Pro 2nd Gen white background product shot"},
  {"key": "sony-wh-1000xm5-black", "query": "Sony WH-1000XM5 Black headphones white background"},
  {"key": "jbl-tune-770nc-blue", "query": "JBL Tune 770NC Blue headphones white background"},
  {"key": "boat-airdopes-141-black", "query": "boAt Airdopes 141 Black earbuds white background"},
  {"key": "oneplus-buds-3-splendid-blue", "query": "OnePlus Buds 3 Splendid Blue white background"},
  {"key": "apple-watch-se-gps-44mm", "query": "Apple Watch SE GPS 44mm smartwatch white background"},
  {"key": "samsung-galaxy-watch-6-44mm", "query": "Samsung Galaxy Watch 6 44mm smartwatch white background"},
  {"key": "jbl-flip-6-portable-speaker", "query": "JBL Flip 6 Portable Speaker white background"},
  {"key": "lenovo-ideapad-slim-5-16gb-512gb", "query": "Lenovo IdeaPad Slim 5 laptop white background"},
  {"key": "hp-victus-gaming-laptop-i5-16gb-512gb", "query": "HP Victus Gaming Laptop white background"},
  {"key": "nike-club-men-hoodie-black", "query": "Nike Club Men Hoodie Black clothing flat lay"},
  {"key": "adidas-men-running-shoes-duramo-sl", "query": "Adidas Men Running Shoes Duramo SL white background"},
  {"key": "levi-s-men-511-slim-jeans-blue", "query": "Levi's Men 511 Slim Jeans Blue apparel white background"},
  {"key": "puma-unisex-essential-logo-tee", "query": "Puma Unisex Essential Logo Tee white background"}
]

script_dir = os.path.dirname(os.path.abspath(__file__))
out_dir = os.path.join(script_dir, "frontend", "public", "images")
os.makedirs(out_dir, exist_ok=True)

ddgs = DDGS()

for p in products:
    out_path = os.path.join(out_dir, f"{p['key']}.jpg")
    if os.path.exists(out_path):
        print(f"Skipping {p['key']}, already exists.")
        continue
    
    print(f"Searching for: {p['key']}...")
    try:
        results = list(ddgs.images(p['query'], max_results=1))
        if results:
            img_url = results[0]['image']
            print(f"  Found URL: {img_url}")
            
            # Download image
            headers = {"User-Agent": "Mozilla/5.0"}
            resp = requests.get(img_url, headers=headers, timeout=10)
            if resp.status_code == 200:
                with open(out_path, 'wb') as f:
                    f.write(resp.content)
                print(f"  Saved {out_path}")
            else:
                print(f"  Failed to download HTTP {resp.status_code}")
        else:
            print("  No image found.")
    except Exception as e:
        print(f"  Error: {e}")
        
    time.sleep(1) # polite delay

print("Done downloading images.")
