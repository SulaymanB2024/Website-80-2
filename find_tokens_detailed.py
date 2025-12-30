import requests
import json

def search_coingecko(query):
    print(f"Searching CoinGecko for {query}...")
    url = "https://api.coingecko.com/api/v3/search"
    params = {"query": query}
    try:
        response = requests.get(url, params=params)
        data = response.json()
        return data.get("coins", [])
    except Exception as e:
        print(f"Error searching CoinGecko: {e}")
        return []

def search_dexscreener(query):
    print(f"Searching DexScreener for {query}...")
    url = f"https://api.dexscreener.com/latest/dex/search?q={query}"
    try:
        response = requests.get(url)
        data = response.json()
        return data.get("pairs", [])
    except Exception as e:
        print(f"Error searching DexScreener: {e}")
        return []

def main():
    queries = ["Syrup", "MetaDAO", "MYX"]
    results = {}

    for q in queries:
        results[q] = {
            "coingecko": search_coingecko(q),
            "dexscreener": search_dexscreener(q)[:5] # Limit to top 5
        }

    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()
