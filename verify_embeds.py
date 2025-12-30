import requests

def check_url(url):
    try:
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        print(f"URL: {url}")
        print(f"Status: {response.status_code}")
        # print(f"Headers: {response.headers}")
    except Exception as e:
        print(f"Error: {e}")

# DexScreener Embeds
check_url("https://dexscreener.com/ethereum/0x27941A235804f33D81aDaBb2d56589c5f6Ea6556?embed=1&theme=dark")
check_url("https://dexscreener.com/solana/EXpXkwcWDhjEYyC5pfNfxsu8fUtK4CDCYTZR4ApQNRzo?embed=1&theme=dark")

# GeckoTerminal Embeds (Example)
check_url("https://www.geckoterminal.com/eth/pools/0x27941A235804f33D81aDaBb2d56589c5f6Ea6556?embed=1")
