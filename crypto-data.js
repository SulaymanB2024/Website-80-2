
// Crypto Data Fetcher for Research Dashboard (v2.2 - GeckoTerminal + Caching)

const GECKO_ENDPOINTS = {
    syrup: 'https://api.geckoterminal.com/api/v2/networks/eth/tokens/0x643C4E15d7d62Ad0aBeC4a9BD4b001aA3Ef52d66',
    metadao: 'https://api.geckoterminal.com/api/v2/networks/solana/tokens/METAwkXcqyXKy1AtsSgJ8JiUHwGCafnZL38n3vYmeta',
    myx: 'https://api.geckoterminal.com/api/v2/networks/bsc/tokens/0xD82544bf0dfe8385eF8FA34D67e6e4940CC63e16'
};

const FALLBACK_PAIRS = {
    syrup: { tvSymbol: 'SYRUP', chainId: 'eth' },
    metadao: { tvSymbol: 'META', chainId: 'solana' },
    myx: { tvSymbol: 'MYX', chainId: 'bsc' }
};

// Simple Cache to prevent lag/rate-limiting
const CACHE_DURATION = 60000; // 60 seconds
const DATA_CACHE = {
    syrup: { data: null, timestamp: 0 },
    metadao: { data: null, timestamp: 0 },
    myx: { data: null, timestamp: 0 }
};

const TERMINAL_LOG_ID = 'crypto-terminal-log';

function logToTerminal(message, type = 'info') {
    const terminal = document.getElementById(TERMINAL_LOG_ID);
    if (!terminal) return;

    const entry = document.createElement('div');
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    
    // Monochrome styling
    let colorClass = 'text-dim-gray';
    if (type === 'success') colorClass = 'text-off-white';
    if (type === 'error') colorClass = 'text-neutral-500 italic';
    if (type === 'warning') colorClass = 'text-neutral-400';

    entry.className = `${colorClass} font-mono text-xs`;
    entry.innerHTML = `<span class="opacity-50">[${timestamp}]</span> ${message}`;
    
    terminal.appendChild(entry);
    terminal.scrollTop = terminal.scrollHeight;
}

// Static Fallback Data (Snapshot Dec 30 2025)
const STATIC_DATA = {
    syrup: {
        priceUsd: "0.3246",
        priceChange: { h24: 2.45 },
        liquidity: { usd: 1971998 },
        fdv: 394772068,
        volume: { h24: 207570 },
        pairAddress: '0x27941A235804f33D81aDaBb2d56589c5f6Ea6556',
        chainId: 'ethereum'
    },
    metadao: {
        priceUsd: "6.6189",
        priceChange: { h24: -1.23 },
        liquidity: { usd: 3191633 },
        fdv: 146560593,
        volume: { h24: 481709 },
        pairAddress: 'EXpXkwcWDhjEYyC5pfNfxsu8fUtK4CDCYTZR4ApQNRzo',
        chainId: 'solana'
    },
    myx: {
        priceUsd: "3.5618",
        priceChange: { h24: 0.85 },
        liquidity: { usd: 4004218 },
        fdv: 3561862098,
        volume: { h24: 680057 },
        pairAddress: '0x6eC31Af1Bb9a72aaCEc12E4dED508861b05F4503',
        chainId: 'bsc'
    }
};

async function fetchGeckoData(id, url) {
    const now = Date.now();
    if (DATA_CACHE[id].data && (now - DATA_CACHE[id].timestamp < CACHE_DURATION)) {
        // console.log(`Using cached data for ${id}`);
        return DATA_CACHE[id].data;
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        
        if (!json.data || !json.data.attributes) throw new Error('Invalid data structure');
        
        const attrs = json.data.attributes;
        const data = {
            priceUsd: attrs.price_usd,
            priceChange: { h24: parseFloat(attrs.price_change_percentage_24h) },
            liquidity: { usd: attrs.total_reserve_in_usd || 0 }, // Gecko sometimes calls it reserve
            fdv: attrs.fdv_usd,
            volume: { h24: attrs.volume_usd.h24 },
            pairAddress: FALLBACK_PAIRS[id].pairAddress, // Use fallback for chart consistency
            chainId: FALLBACK_PAIRS[id].chainId
        };

        // Update Cache
        DATA_CACHE[id] = { data: data, timestamp: now };
        return data;

    } catch (error) {
        console.error(`Fetch error for ${id}:`, error);
        // Return cached data if available (even if expired) to prevent UI break
        if (DATA_CACHE[id].data) {
            logToTerminal(`Fetch failed for ${id}, using stale cache`, 'warning');
            return DATA_CACHE[id].data;
        }
        
        // Use Static Fallback if API fails completely
        logToTerminal(`API failed for ${id}, using static fallback`, 'warning');
        return STATIC_DATA[id];
    }
}

async function fetchSyrupAPY() {
    // Static fallback for now to avoid extra API calls causing lag
    return 14.5; 
}

function formatCurrency(value) {
    if (value === undefined || value === null) return '--';
    const num = parseFloat(value);
    if (isNaN(num)) return '--';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

function formatPercentage(value) {
    if (value === undefined || value === null) return '--';
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
}

// Helper to safely update element text if it exists
function safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

async function updateSyrupData() {
    logToTerminal('Fetching SYRUP market data...', 'info');
    const data = await fetchGeckoData('syrup', GECKO_ENDPOINTS.syrup);
    const apy = await fetchSyrupAPY();

    if (data && !data.error) {
        // Main Dashboard Updates
        safeSetText('price-syrup', formatCurrency(data.priceUsd));
        const change = data.priceChange.h24;
        const changeEl = document.getElementById('change-syrup');
        if (changeEl) {
            changeEl.textContent = formatPercentage(change);
            changeEl.className = `font-mono text-xs text-neutral-400`;
        }
        safeSetText('tvl-syrup', formatCurrency(data.fdv)); // Using FDV as proxy for TVL/Market Cap if TVL missing
        safeSetText('fdv-syrup', formatCurrency(data.fdv));

        // Detail Page Updates
        safeSetText('detail-price-syrup', formatCurrency(data.priceUsd));
        safeSetText('detail-change-syrup', formatPercentage(change));
        safeSetText('detail-tvl-syrup', formatCurrency(data.fdv));
        safeSetText('detail-fdv-syrup', formatCurrency(data.fdv));
        
        logToTerminal(`SYRUP Price: ${data.priceUsd}`, 'success');
    } else {
        // Fallback for Detail Page if data object is missing but we have static data
        // This shouldn't happen with the new fetchGeckoData logic, but as a safety net:
        if (STATIC_DATA.syrup) {
             safeSetText('detail-price-syrup', formatCurrency(STATIC_DATA.syrup.priceUsd));
             safeSetText('detail-change-syrup', formatPercentage(STATIC_DATA.syrup.priceChange.h24));
             safeSetText('detail-tvl-syrup', formatCurrency(STATIC_DATA.syrup.fdv));
             safeSetText('detail-fdv-syrup', formatCurrency(STATIC_DATA.syrup.fdv));
        }
        logToTerminal(`Failed to fetch SYRUP data: ${data ? data.error : 'Unknown'}`, 'error');
    }

    safeSetText('apy-syrup', `${apy.toFixed(2)}%`);
    safeSetText('detail-apy-syrup', `${apy.toFixed(2)}%`);
    
    return data;
}

async function updateMetaDAOData() {
    logToTerminal('Fetching MetaDAO (META) data...', 'info');
    const data = await fetchGeckoData('metadao', GECKO_ENDPOINTS.metadao);

    if (data && !data.error) {
        // Main Dashboard Updates
        safeSetText('price-metdao', formatCurrency(data.priceUsd));
        const change = data.priceChange.h24;
        const changeEl = document.getElementById('change-metdao');
        if (changeEl) {
            changeEl.textContent = formatPercentage(change);
            changeEl.className = `font-mono text-xs text-neutral-400`;
        }
        safeSetText('liquidity-metdao', formatCurrency(data.liquidity.usd || data.fdv * 0.02)); // Fallback estimate if liquidity missing
        safeSetText('fdv-metdao', formatCurrency(data.fdv));
        safeSetText('volume-metdao', formatCurrency(data.volume.h24));

        // Detail Page Updates
        safeSetText('detail-price-metadao', formatCurrency(data.priceUsd));
        safeSetText('detail-change-metadao', formatPercentage(change));
        safeSetText('detail-liquidity-metadao', formatCurrency(data.liquidity.usd || data.fdv * 0.02));
        safeSetText('detail-fdv-metadao', formatCurrency(data.fdv));
        safeSetText('detail-volume-metadao', formatCurrency(data.volume.h24));

        logToTerminal(`MetaDAO Price: ${data.priceUsd}`, 'success');
    } else {
        if (STATIC_DATA.metadao) {
            safeSetText('detail-price-metadao', formatCurrency(STATIC_DATA.metadao.priceUsd));
            safeSetText('detail-change-metadao', formatPercentage(STATIC_DATA.metadao.priceChange.h24));
            safeSetText('detail-liquidity-metadao', formatCurrency(STATIC_DATA.metadao.liquidity.usd));
            safeSetText('detail-fdv-metadao', formatCurrency(STATIC_DATA.metadao.fdv));
            safeSetText('detail-volume-metadao', formatCurrency(STATIC_DATA.metadao.volume.h24));
        }
        logToTerminal(`Failed to fetch MetaDAO data: ${data ? data.error : 'Unknown'}`, 'error');
    }
    
    return data;
}

async function updateMYXData() {
    logToTerminal('Fetching MYX data...', 'info');
    const data = await fetchGeckoData('myx', GECKO_ENDPOINTS.myx);

    if (data && !data.error) {
        // Main Dashboard Updates
        safeSetText('price-myx', formatCurrency(data.priceUsd));
        const change = data.priceChange.h24;
        const changeEl = document.getElementById('change-myx');
        if (changeEl) {
            changeEl.textContent = formatPercentage(change);
            changeEl.className = `font-mono text-xs text-neutral-400`;
        }
        safeSetText('fdv-myx', formatCurrency(data.fdv));
        safeSetText('volume-myx', formatCurrency(data.volume.h24));
        safeSetText('liquidity-myx', formatCurrency(data.liquidity.usd || data.fdv * 0.05));

        // Detail Page Updates
        safeSetText('detail-price-myx', formatCurrency(data.priceUsd));
        safeSetText('detail-change-myx', formatPercentage(change));
        safeSetText('detail-fdv-myx', formatCurrency(data.fdv));
        safeSetText('detail-volume-myx', formatCurrency(data.volume.h24));
        safeSetText('detail-liquidity-myx', formatCurrency(data.liquidity.usd || data.fdv * 0.05));

        logToTerminal(`MYX Price: ${data.priceUsd}`, 'success');
    } else {
        if (STATIC_DATA.myx) {
            safeSetText('detail-price-myx', formatCurrency(STATIC_DATA.myx.priceUsd));
            safeSetText('detail-change-myx', formatPercentage(STATIC_DATA.myx.priceChange.h24));
            safeSetText('detail-fdv-myx', formatCurrency(STATIC_DATA.myx.fdv));
            safeSetText('detail-volume-myx', formatCurrency(STATIC_DATA.myx.volume.h24));
            safeSetText('detail-liquidity-myx', formatCurrency(STATIC_DATA.myx.liquidity.usd));
        }
        logToTerminal(`Failed to fetch MYX data: ${data ? data.error : 'Unknown'}`, 'error');
    }
    
    return data;
}

function initTradingViewWidget(containerId, symbol) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    
    // Ensure container has an ID for TV widget to target
    const widgetId = containerId + '_widget';
    const widgetDiv = document.createElement('div');
    widgetDiv.id = widgetId;
    widgetDiv.style.height = '100%';
    widgetDiv.style.width = '100%';
    container.appendChild(widgetDiv);

    if (typeof TradingView !== 'undefined') {
        new TradingView.widget({
            "autosize": true,
            "symbol": symbol,
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "enable_publishing": false,
            "allow_symbol_change": false,
            "container_id": widgetId,
            "hide_side_toolbar": false,
            "toolbar_bg": "#0F0F0F"
        });
    } else {
        logToTerminal('TradingView library not loaded', 'error');
        container.innerHTML = '<div class="flex items-center justify-center h-full text-neutral-500 font-mono text-xs">Chart Library Error</div>';
    }
}

// Helper to wait for element to exist (for modal rendering)
function waitForElement(id, callback, attempts = 50) {
    const el = document.getElementById(id);
    if (el) {
        callback(el);
    } else if (attempts > 0) {
        setTimeout(() => waitForElement(id, callback, attempts - 1), 100);
    } else {
        console.error(`Element ${id} not found after retries`);
        logToTerminal(`Error: Chart container ${id} not found`, 'error');
    }
}

async function initCryptoDashboard() {
    // Clear existing interval if any
    if (window.cryptoDashboardInterval) {
        clearInterval(window.cryptoDashboardInterval);
    }

    logToTerminal('Initializing Research Dashboard...', 'info');
    
    await Promise.all([
        updateSyrupData(),
        updateMetaDAOData(),
        updateMYXData()
    ]);

    logToTerminal('Data sync complete.', 'success');

    // Set up polling every 60 seconds
    window.cryptoDashboardInterval = setInterval(() => {
        logToTerminal('Refreshing market data...', 'info');
        updateSyrupData();
        updateMetaDAOData();
        updateMYXData();
    }, 60000);
}

// Initialize specific project detail views
async function initProjectDetail(id) {
    logToTerminal(`Initializing detail view for ${id}...`, 'info');
    let data;
    let tvSymbol;

    // Always trigger update to ensure modal DOM elements are populated
    // fetchGeckoData handles caching, so this is efficient
    if (id === 'syrup') data = await updateSyrupData();
    else if (id === 'metadao') data = await updateMetaDAOData();
    else if (id === 'myx') data = await updateMYXData();

    // Always use fallback pair for chart stability
    if (FALLBACK_PAIRS[id]) {
        tvSymbol = FALLBACK_PAIRS[id].tvSymbol;
    }

    if (id === 'metadao') {
        // Use GeckoTerminal for MetaDAO
        const chartId = `tv-chart-${id}`;
        waitForElement(chartId, (container) => {
            logToTerminal(`Injecting GeckoTerminal chart for ${id}...`, 'info');
            container.innerHTML = `
                <iframe height="100%" width="100%" id="geckoterminal-embed" title="GeckoTerminal Embed" src="https://www.geckoterminal.com/solana/pools/${STATIC_DATA.metadao.pairAddress}?embed=1&info=0&swaps=0" frameborder="0" allow="clipboard-write" allowfullscreen></iframe>
            `;
        });
    } else if (tvSymbol) {
        const chartId = `tv-chart-${id}`;
        
        waitForElement(chartId, (container) => {
            logToTerminal(`Injecting chart for ${id}...`, 'info');
            // Show loading state
            container.innerHTML = `
                <div class="flex items-center justify-center h-full w-full bg-charcoal relative">
                    <div class="animate-pulse flex flex-col items-center">
                        <div class="h-8 w-8 border-2 border-off-white border-t-transparent rounded-full animate-spin mb-4"></div>
                        <span class="font-mono text-xs text-dim-gray">LOADING CHART DATA...</span>
                    </div>
                    <div class="absolute bottom-4 text-[10px] text-neutral-600 font-mono text-center px-4">
                        If chart fails to load, check your ad blocker or network connection.
                    </div>
                </div>
            `;

            // Create iframe with slight delay to allow UI to settle
            setTimeout(() => {
                initTradingViewWidget(chartId, tvSymbol);
            }, 10);
        });
    } else {
        logToTerminal(`No chart configuration for ${id}`, 'warning');
    }
}

// Expose init functions
window.initCryptoDashboard = initCryptoDashboard;
window.initProjectDetail = initProjectDetail;
// window.saveChartToWarehouse = saveChartToWarehouse; // Removed for stability


// Auto-initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCryptoDashboard);
} else {
    initCryptoDashboard();
}
