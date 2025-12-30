import requests
import json

def check_yields():
    print("Fetching yields from DeFi Llama...")
    try:
        response = requests.get("https://yields.llama.fi/pools")
        data = response.json()
        
        # Search for Syrup or Maple
        results = []
        for pool in data.get("data", []):
            project = pool.get("project", "").lower()
            symbol = pool.get("symbol", "").lower()
            if "maple" in project or "syrup" in project or "syrup" in symbol:
                results.append({
                    "project": pool.get("project"),
                    "symbol": pool.get("symbol"),
                    "chain": pool.get("chain"),
                    "apy": pool.get("apy"),
                    "tvlUsd": pool.get("tvlUsd"),
                    "pool": pool.get("pool") # This is the pool ID
                })
        
        print(json.dumps(results, indent=2))
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_yields()
