import requests
import json

try:
    response = requests.get("https://api.llama.fi/protocols")
    protocols = response.json()
    
    search_terms = ["syrup", "myx", "metronome", "metdao", "meteor"]
    found = []
    
    for p in protocols:
        name = p.get("name", "").lower()
        symbol = p.get("symbol", "").lower()
        slug = p.get("slug", "")
        
        for term in search_terms:
            if term in name or term in symbol or term in slug:
                found.append({
                    "name": p.get("name"),
                    "symbol": p.get("symbol"),
                    "slug": p.get("slug"),
                    "tvl": p.get("tvl"),
                    "url": p.get("url"),
                    "description": p.get("description")
                })
                
    print(json.dumps(found, indent=2))

except Exception as e:
    print(f"Error: {e}")
