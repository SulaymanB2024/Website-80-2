import requests
import json

endpoints = {
    'syrup': 'https://api.dexscreener.com/latest/dex/tokens/0x643C4E15d7d62Ad0aBeC4a9BD4b001aA3Ef52d66',
    'metadao': 'https://api.dexscreener.com/latest/dex/tokens/METAwkXcqyXKy1AtsSgJ8JiUHwGCafnZL38n3vYmeta',
    'myx': 'https://api.dexscreener.com/latest/dex/tokens/0xD82544bf0dfe8385eF8FA34D67e6e4940CC63e16'
}

for name, url in endpoints.items():
    try:
        response = requests.get(url)
        data = response.json()
        if data.get('pairs'):
            pair = data['pairs'][0]
            print(f"{name}: chainId='{pair['chainId']}', pairAddress='{pair['pairAddress']}'")
            print(f"Embed URL: https://dexscreener.com/{pair['chainId']}/{pair['pairAddress']}?embed=1")
        else:
            print(f"{name}: No pairs found")
    except Exception as e:
        print(f"{name}: Error - {e}")
