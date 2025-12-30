import requests

def test_endpoint(url, description):
    print(f"Testing {description}: {url}")
    try:
        response = requests.get(url, timeout=5)
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            try:
                data = response.json()
                # Print a snippet of the data
                print(str(data)[:200])
            except:
                print("Response not JSON")
    except Exception as e:
        print(f"Error: {e}")
    print("-" * 20)

def main():
    # Maple / Syrup
    test_endpoint("https://api.maple.finance/v1/syrup", "Maple Syrup V1")
    test_endpoint("https://api.maple.finance/v2/syrup", "Maple Syrup V2")
    test_endpoint("https://api.maple.finance/api/syrup", "Maple Syrup API")
    test_endpoint("https://app.maple.finance/api/syrup", "Maple App API")
    
    # MetaDAO
    test_endpoint("https://api.metadao.fi/v1/metrics", "MetaDAO Metrics")
    test_endpoint("https://api.metadao.fi/stats", "MetaDAO Stats")

    # MYX Finance
    test_endpoint("https://api.myx.finance/v1/market/tickers", "MYX Tickers")
    test_endpoint("https://api.myx.finance/v1/market/summary", "MYX Summary")
    test_endpoint("https://api.myx.finance/api/v1/config", "MYX Config")

if __name__ == "__main__":
    main()
