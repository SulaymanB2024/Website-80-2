import requests

urls = [
    "https://www.geckoterminal.com/eth/pools/0x27941A235804f33D81aDaBb2d56589c5f6Ea6556",
    "https://www.dextools.io/app/en/ether/pair-explorer/0x27941A235804f33D81aDaBb2d56589c5f6Ea6556"
]

headers = {'User-Agent': 'Mozilla/5.0'}

for url in urls:
    try:
        r = requests.get(url, headers=headers, timeout=5)
        print(f"{url}: {r.status_code}")
    except Exception as e:
        print(f"{url}: Error {e}")
