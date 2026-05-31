import os
import requests
import time
from ddgs import DDGS

products = [
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
