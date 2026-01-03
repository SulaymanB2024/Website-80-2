/**
 * Display Settings Control
 * 
 * Features:
 * 1. Light/Dark Mode Toggle
 */

(function() {
    // --- 1. Inject CSS for Light Mode & Redesigned Theme Toggle ---
    const style = document.createElement('style');
    style.textContent = `
        /* --- LIGHT MODE OVERRIDES --- */
        body.light-mode {
            background-color: #EAEAEA !important;
            color: #030303 !important;
        }

        /* Headings & Common Text */
        body.light-mode h1, 
        body.light-mode h2, 
        body.light-mode h3, 
        body.light-mode h4, 
        body.light-mode h5, 
        body.light-mode h6,
        body.light-mode p,
        body.light-mode span,
        body.light-mode div,
        body.light-mode a,
        body.light-mode li {
            /* Only override if it has a light color class, but this is hard in CSS. 
               Instead, we target the classes directly below. */
        }

        /* Backgrounds */
        body.light-mode #app-container,
        body.light-mode #loader,
        body.light-mode section,
        body.light-mode .bg-off-black,
        body.light-mode .bg-charcoal,
        body.light-mode .bg-\\[\\#030303\\],
        body.light-mode .bg-\\[\\#0F0F0F\\],
        body.light-mode .bg-\\[\\#050505\\],
        body.light-mode .bg-\\[\\#020202\\],
        body.light-mode .bg-black {
            background-color: #EAEAEA !important;
        }

        body.light-mode .bg-neutral-900\\/20,
        body.light-mode .bg-neutral-900\\/30,
        body.light-mode .bg-charcoal\/30 {
            background-color: rgba(0, 0, 0, 0.05) !important;
        }
        body.light-mode .bg-black\/95 {
            background-color: rgba(255, 255, 255, 0.95) !important;
        }
        body.light-mode .bg-black\/80 {
            background-color: rgba(255, 255, 255, 0.8) !important;
        }
        body.light-mode .bg-black\/20 {
            background-color: rgba(0, 0, 0, 0.05) !important;
        }
        body.light-mode .bg-black\/10 {
            background-color: rgba(0, 0, 0, 0.05) !important;
        }

        /* White/Off-White Background Opacities -> Dark Opacities */
        body.light-mode .bg-white\/5,
        body.light-mode .bg-white\/10,
        body.light-mode .bg-white\/20,
        body.light-mode .bg-off-white\/5,
        body.light-mode .bg-off-white\/10,
        body.light-mode .bg-off-white\/20 {
            background-color: rgba(0, 0, 0, 0.05) !important;
        }
        
        /* Inline Style Overrides (for hardcoded dark backgrounds) */
        body.light-mode [style*="background-color: #030303"],
        body.light-mode [style*="background-color: #000"],
        body.light-mode [style*="background-color: black"],
        body.light-mode [style*="background-color: #0A0A0A"],
        body.light-mode [style*="background-color: #050505"] {
            background-color: #EAEAEA !important;
        }

        /* Cards & Containers */
        body.light-mode .service-card,
        body.light-mode .project-card,
        body.light-mode .stock-card,
        body.light-mode .metric-block,
        body.light-mode .widget-wrapper,
        body.light-mode .modal-content {
            background-color: #F5F5F5 !important;
            border-color: rgba(0, 0, 0, 0.1) !important;
        }
        
        /* Modal Backdrop - Light Mode */
        body.light-mode .modal-backdrop {
            background: rgba(234, 234, 234, 0.95) !important;
        }
        
        body.light-mode .modal-backdrop.active {
            backdrop-filter: blur(12px) !important;
        }
        
        /* Modal Content - Comprehensive Light Mode */
        body.light-mode .modal-content {
            background-color: #FFFFFF !important;
            border-color: rgba(0, 0, 0, 0.08) !important;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0,0,0,0.05) !important;
        }
        
        /* Modal Close Button */
        body.light-mode #close-modal {
            background: rgba(255, 255, 255, 0.7) !important;
            border-color: rgba(0, 0, 0, 0.1) !important;
        }
        
        body.light-mode #close-modal:hover {
            background: rgba(0, 0, 0, 0.05) !important;
            border-color: rgba(0, 0, 0, 0.2) !important;
        }
        
        body.light-mode #close-modal i {
            color: #666666 !important;
        }
        
        body.light-mode #close-modal:hover i {
            color: #030303 !important;
        }
        
        /* Reading Progress Bar */
        body.light-mode #reading-progress {
            background: #030303 !important;
        }
        
        /* Modal Cover Sections */
        body.light-mode .modal-content .min-h-\\[50vh\\],
        body.light-mode .modal-content .min-h-\\[60vh\\],
        body.light-mode .modal-content .min-h-\\[70vh\\] {
            background-color: #F5F5F5 !important;
        }
        
        /* Modal Section Borders */
        body.light-mode .modal-content .border-off-white\\/10,
        body.light-mode .modal-content .border-white\\/10,
        body.light-mode .modal-content .border-off-white\\/20,
        body.light-mode .modal-content .border-white\\/20 {
            border-color: rgba(0, 0, 0, 0.08) !important;
        }
        
        /* Modal Tab Navigation */
        body.light-mode .tab-nav {
            border-bottom-color: rgba(0, 0, 0, 0.1) !important;
        }
        
        body.light-mode .tab-btn {
            color: #666666 !important;
        }
        
        body.light-mode .tab-btn:hover {
            color: #030303 !important;
        }
        
        body.light-mode .tab-btn.active {
            color: #030303 !important;
            border-bottom-color: #030303 !important;
        }
        
        /* Modal Metric Blocks */
        body.light-mode .modal-content .metric-block {
            background: rgba(0, 0, 0, 0.02) !important;
            border-color: rgba(0, 0, 0, 0.06) !important;
        }
        
        body.light-mode .modal-content .metric-block:hover {
            background: rgba(0, 0, 0, 0.04) !important;
        }
        
        /* Modal Tags and Pills */
        body.light-mode .modal-content [class*="bg-off-white\\/10"],
        body.light-mode .modal-content [class*="bg-white\\/10"] {
            background-color: rgba(0, 0, 0, 0.06) !important;
        }
        
        /* Card Image Containers */
        body.light-mode .service-img-container,
        body.light-mode .project-img-container,
        body.light-mode .project-img,
        body.light-mode .bg-\[\#0F0F0F\],
        body.light-mode .bg-\[\#0A0A0A\],
        body.light-mode .bg-\[\#050505\] {
            background-color: #E5E5E5 !important;
        }

        /* Remove dark overlays on cards in light mode */
        body.light-mode .service-img-container .bg-black\/20,
        body.light-mode .project-img-container .bg-black\/10 {
            background-color: transparent !important;
        }

        /* Modal Cover Gradients - Make them subtle/light */
        body.light-mode .from-\[\#0A0A0A\],
        body.light-mode .from-\[\#050505\] {
            --tw-gradient-from: rgba(0, 0, 0, 0.05) !important;
            --tw-gradient-to: transparent !important;
            --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important;
        }
        
        /* Modal Cover Text Overrides */
        body.light-mode .text-white\/5,
        body.light-mode .text-white\/10 {
            color: rgba(0, 0, 0, 0.1) !important;
        }

        body.light-mode .glass-nav {
            background: rgba(234, 234, 234, 0.8) !important;
            border-bottom-color: rgba(0, 0, 0, 0.05) !important;
        }
        
        /* Mobile Menu */
        body.light-mode #mobile-menu {
            background-color: #EAEAEA !important;
        }
        
        body.light-mode #mobile-menu a {
            color: #030303 !important;
        }
        
        body.light-mode #mobile-menu a:hover {
            color: #666666 !important;
        }
        
        body.light-mode #close-menu-btn i {
            color: #030303 !important;
        }
        
        body.light-mode .glass-nav .text-off-white,
        body.light-mode .glass-nav a {
            color: #030303 !important;
        }
        
        body.light-mode .glass-nav a:hover {
            color: #000000 !important;
        }

        /* --- TEXT COLOR OVERRIDES --- */
        
        /* Placeholder text colors in light mode */
        body.light-mode .placeholder-neutral-800::placeholder,
        body.light-mode .placeholder-neutral-700::placeholder,
        body.light-mode .placeholder-neutral-600::placeholder {
            color: #999999 !important;
            opacity: 1 !important;
        }
        
        /* 1. White/Light -> Black/Dark */
        body.light-mode .text-white,
        body.light-mode .text-off-white,
        body.light-mode .text-gray-50,
        body.light-mode .text-gray-100,
        body.light-mode .text-gray-200,
        body.light-mode .text-gray-300,
        body.light-mode .text-neutral-50,
        body.light-mode .text-neutral-100,
        body.light-mode .text-neutral-200,
        body.light-mode .text-neutral-300,
        body.light-mode .text-zinc-50,
        body.light-mode .text-zinc-100,
        body.light-mode .text-zinc-200,
        body.light-mode .text-zinc-300,
        body.light-mode .text-slate-50,
        body.light-mode .text-slate-100,
        body.light-mode .text-slate-200,
        body.light-mode .text-slate-300,
        body.light-mode .text-stone-50,
        body.light-mode .text-stone-100,
        body.light-mode .text-stone-200,
        body.light-mode .text-stone-300 {
            color: #030303 !important;
        }

        /* 2. Medium Gray -> Dark Gray */
        body.light-mode .text-gray-400,
        body.light-mode .text-gray-500,
        body.light-mode .text-neutral-400,
        body.light-mode .text-neutral-500,
        body.light-mode .text-zinc-400,
        body.light-mode .text-zinc-500,
        body.light-mode .text-slate-400,
        body.light-mode .text-slate-500,
        body.light-mode .text-stone-400,
        body.light-mode .text-stone-500,
        body.light-mode .text-dim-gray,
        body.light-mode .text-light-gray {
            color: #404040 !important;
        }

        /* 3. Dark Gray -> Keep Dark (or ensure it's dark enough) */
        body.light-mode .text-gray-600,
        body.light-mode .text-gray-700,
        body.light-mode .text-gray-800,
        body.light-mode .text-gray-900,
        body.light-mode .text-neutral-600,
        body.light-mode .text-neutral-700,
        body.light-mode .text-neutral-800,
        body.light-mode .text-neutral-900 {
            color: #171717 !important;
        }

        /* 4. Hover States (Invert hover effects) */
        body.light-mode .hover\:text-white:hover,
        body.light-mode .hover\:text-off-white:hover {
            color: #000000 !important;
        }
        
        body.light-mode .group:hover .group-hover\:text-white,
        body.light-mode .group:hover .group-hover\:text-off-white {
            color: #000000 !important;
        }

        /* 5. Special Gradients */
        body.light-mode .bg-clip-text.bg-gradient-to-r {
            background-image: none !important;
            -webkit-text-fill-color: #030303 !important;
            color: #030303 !important;
        }

        /* Borders & Section Dividers - Make visible in light mode */
        body.light-mode .border-off-white\\/10,
        body.light-mode .border-off-white\\/15,
        body.light-mode .border-off-white\\/20,
        body.light-mode .border-white\\/10,
        body.light-mode .border-white\\/5,
        body.light-mode .border-white\\/20 {
            border-color: rgba(0, 0, 0, 0.1) !important;
        }
        
        body.light-mode .border-off-white\\/30 {
            border-color: rgba(0, 0, 0, 0.15) !important;
        }

        body.light-mode .border-mid-gray {
            border-color: #D4D4D4 !important;
        }

        /* Specific Elements */
        body.light-mode .animate-marquee {
            color: #404040 !important;
        }
        
        body.light-mode .btn-tech {
            border-color: rgba(0, 0, 0, 0.2) !important;
            color: #030303 !important;
        }
        body.light-mode .btn-tech:hover {
            background-color: rgba(0, 0, 0, 0.05) !important;
            border-color: #030303 !important;
        }

        /* Search Overlay Light Mode Styles */
        body.light-mode #search-overlay {
            background-color: rgba(255, 255, 255, 0.98) !important;
        }
        
        body.light-mode #search-input {
            color: #030303 !important;
            border-bottom-color: rgba(0, 0, 0, 0.2) !important;
            background: transparent !important;
        }
        
        body.light-mode #search-input::placeholder {
            color: #666666 !important;
            opacity: 0.6 !important;
        }
        
        body.light-mode #search-input:focus {
            border-bottom-color: rgba(0, 0, 0, 0.5) !important;
        }
        
        body.light-mode #search-count {
            color: #666666 !important;
        }
        
        body.light-mode #close-search {
            color: #666666 !important;
        }
        
        body.light-mode #close-search:hover {
            color: #030303 !important;
        }
        
        body.light-mode .search-filter {
            background: rgba(0, 0, 0, 0.05) !important;
            color: #404040 !important;
            border-color: rgba(0, 0, 0, 0.1) !important;
        }
        body.light-mode .search-filter.active {
            background: rgba(0, 0, 0, 0.1) !important;
            color: #000 !important;
            border-color: rgba(0, 0, 0, 0.3) !important;
        }
        
        body.light-mode #search-results .text-neutral-700,
        body.light-mode #search-results .text-neutral-600 {
            color: #666666 !important;
        }
        
        body.light-mode #search-empty {
            color: #666666 !important;
        }
        
        body.light-mode #search-results .service-card,
        body.light-mode #search-results .project-card,
        body.light-mode #search-results .stock-card {
            background: rgba(255, 255, 255, 0.8) !important;
            border-color: rgba(0, 0, 0, 0.1) !important;
        }
        
        body.light-mode #search-results .service-card:hover,
        body.light-mode #search-results .project-card:hover,
        body.light-mode #search-results .stock-card:hover {
            background: rgba(255, 255, 255, 0.95) !important;
            border-color: rgba(0, 0, 0, 0.2) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }

        /* Stock Cards / Crypto Cards */
        body.light-mode .stock-card {
            background: rgba(255, 255, 255, 0.8) !important;
            border-color: rgba(0, 0, 0, 0.1) !important;
        }
        body.light-mode .stock-card:hover {
            background: rgba(255, 255, 255, 0.95) !important;
            border-color: rgba(0, 0, 0, 0.2) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }

        /* Metric Blocks */
        body.light-mode .metric-block {
            background: rgba(255, 255, 255, 0.5) !important;
            border-color: rgba(0, 0, 0, 0.1) !important;
        }
        body.light-mode .metric-block:hover {
            background: rgba(255, 255, 255, 0.8) !important;
            border-color: rgba(0, 0, 0, 0.15) !important;
        }

        /* Terminal / Code Blocks in Modals */
        body.light-mode #crypto-terminal-log,
        body.light-mode .terminal-log {
            background-color: #F5F5F5 !important;
            border-color: rgba(0, 0, 0, 0.1) !important;
        }
        
        body.light-mode .bg-off-black,
        body.light-mode .bg-charcoal {
            background-color: #F5F5F5 !important;
        }
        
        body.light-mode .text-light-gray {
            color: #666666 !important;
        }
        
        body.light-mode .bg-neutral-900\\/30,
        body.light-mode .bg-neutral-900\\/20 {
            background-color: rgba(0, 0, 0, 0.05) !important;
        }

        body.light-mode .text-dim-gray {
            color: #999999 !important;
        }

        /* Modal Canvas Backgrounds */
        body.light-mode #canvas-modal-taskformer,
        body.light-mode #canvas-modal-point72,
        body.light-mode #canvas-modal-payroll,
        body.light-mode #canvas-modal-austin {
            opacity: 0.15 !important;
        }

        /* Modal Cover Backgrounds - Light Mode */
        body.light-mode .modal-content [class*="bg-[#0F0F0F]"],
        body.light-mode .modal-content [class*="bg-[#0A0A0A]"],
        body.light-mode .modal-content [class*="bg-[#050505]"] {
            background-color: #F5F5F5 !important;
        }

        /* Modal Gradient Overlays */
        body.light-mode .modal-content .bg-gradient-to-t {
            background-image: linear-gradient(to top, rgba(245,245,245,1), transparent) !important;
        }

        /* Gradients & Effects */
        body.light-mode #app-container {
            background-image: 
                linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px) !important;
        }

        body.light-mode .noise-overlay {
            opacity: 0.03 !important;
            filter: invert(1) !important;
        }

        /* Hero Section Fixes */
        
        /* 1. Hide the dark gradient overlay in Light Mode */
        body.light-mode .hero-gradient-overlay {
            opacity: 0 !important;
            pointer-events: none !important;
        }

        /* 2. Hero Title - Use Difference Blend Mode for visibility over Dark Globe */
        body.light-mode #hero h1 {
            color: #FFFFFF !important; /* White text */
            mix-blend-mode: difference !important; /* Inverts against background */
            opacity: 1 !important;
            z-index: 20 !important; /* Ensure it's above globe */
        }
        
        /* Ensure the spans inside h1 inherit the blend mode/color correctly */
        body.light-mode #hero h1 .reveal-text,
        body.light-mode #hero h1 .scramble-hover {
            color: inherit !important;
            text-shadow: none !important;
            background: transparent !important; /* Remove gradient text background */
            -webkit-text-fill-color: initial !important;
        }
        
        /* Hero gradient text fallback for light mode */
        body.light-mode #hero h1 .text-transparent {
            color: #FFFFFF !important;
            background: none !important;
            -webkit-background-clip: initial !important;
            -webkit-text-fill-color: initial !important;
        }

        /* 3. Bio Text & Details - Solid Black with High Contrast */
        body.light-mode #hero p,
        body.light-mode #hero .text-neutral-200,
        body.light-mode #hero .text-neutral-300 {
            color: #030303 !important;
            opacity: 1 !important;
            text-shadow: none !important;
            mix-blend-mode: normal !important;
            -webkit-text-fill-color: #030303 !important;
            background: transparent !important;
        }
        
        /* Specifically target the bio paragraph */
        body.light-mode #hero p.text-neutral-200 {
            color: #030303 !important;
            -webkit-text-fill-color: #030303 !important;
        }
        
        /* Hero location tags */
        body.light-mode #hero .font-mono.text-neutral-300,
        body.light-mode #hero span.opacity-80 {
            color: #525252 !important;
            opacity: 1 !important;
        }

        /* 4. Buttons - Enhanced styling */
        body.light-mode #hero .btn-tech {
            color: #030303 !important;
            border-color: rgba(0,0,0,0.25) !important;
            background: rgba(255,255,255,0.7) !important;
            backdrop-filter: blur(8px) !important;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08) !important;
        }
        body.light-mode #hero .btn-tech:hover {
            background: #030303 !important;
            color: #FFFFFF !important;
            border-color: #030303 !important;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
        }
        body.light-mode #hero .btn-tech i {
            color: inherit !important;
        }
        
        /* 5. Ensure hero container background is correct */
        body.light-mode #hero {
            background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(234,234,234,1) 100%) !important;
        }
        
        /* 6. Hero section border in light mode */
        body.light-mode #hero {
            border-bottom-color: rgba(0,0,0,0.08) !important;
        }
        
        /* 7. Marquee section light mode fixes */
        body.light-mode [class*="animate-marquee"] {
            color: #525252 !important;
        }
        body.light-mode [class*="animate-marquee"] span {
            color: inherit !important;
        }
        body.light-mode [class*="animate-marquee"] .text-\[\#666666\] {
            color: #A3A3A3 !important;
        }
        body.light-mode .border-y.border-off-white\\/15 {
            border-color: rgba(0,0,0,0.08) !important;
            background-color: #F9F9F9 !important;
        }

        /* Orderbook Visual Fix */
        body.light-mode #order-book-visual {
            mix-blend-mode: multiply !important;
            opacity: 1 !important;
        }
        
        /* Map Container Fix */
        body.light-mode #austin-map {
            background-color: #EAEAEA !important;
        }

        /* Specific Tailwind Background Overrides */
        body.light-mode .bg-\[\#030303\] {
            background-color: #EAEAEA !important;
            border-color: rgba(0, 0, 0, 0.1) !important;
        }

        /* Paper Mode Fixes - Ensure writing modals stay light regardless of toggle */
        .modal-content.paper-mode {
            background-color: #EAEAEA !important;
            color: #0F0F0F !important;
        }
        body.light-mode .modal-content.paper-mode {
            background-color: #FFFFFF !important;
            color: #030303 !important;
        }

        /* Map Side Panel Fix */
        body.light-mode #map-info-panel {
            background-color: rgba(255, 255, 255, 0.98) !important;
            border-left-color: rgba(0, 0, 0, 0.1) !important;
            color: #030303 !important;
        }
        
        /* Map Side Panel Content Fixes */
        body.light-mode #map-info-panel .text-off-white,
        body.light-mode #map-info-panel .text-white {
            color: #030303 !important;
        }
        body.light-mode #map-info-panel .text-neutral-300,
        body.light-mode #map-info-panel .text-neutral-400,
        body.light-mode #map-info-panel .text-neutral-500 {
            color: #666666 !important;
        }
        body.light-mode #map-info-panel .text-neutral-600 {
            color: #999999 !important;
        }
        body.light-mode #map-info-panel .border-white\/10,
        body.light-mode #map-info-panel .border-white\/5 {
            border-color: rgba(0, 0, 0, 0.1) !important;
        }
        body.light-mode #map-info-panel .bg-off-white\/5 {
            background-color: rgba(0, 0, 0, 0.05) !important;
        }
        body.light-mode #map-info-panel .bg-\[\#030303\] {
            background-color: #F5F5F5 !important;
            border-color: rgba(0, 0, 0, 0.1) !important;
        }
        
        /* Map Layer Controls - All HUD Elements */
        body.light-mode .bg-\[\#030303\]\/95 {
            background-color: rgba(255, 255, 255, 0.95) !important;
        }
        
        body.light-mode #map-container .bg-\[\#030303\]\/95,
        body.light-mode #map-legend,
        body.light-mode .map-layer-btn {
            background-color: rgba(255, 255, 255, 0.95) !important;
            border-color: rgba(0, 0, 0, 0.1) !important;
        }
        
        body.light-mode .map-layer-btn {
            color: #666666 !important;
        }
        
        body.light-mode .map-layer-btn:hover {
            background-color: rgba(0, 0, 0, 0.05) !important;
            color: #030303 !important;
        }
        
        body.light-mode .map-layer-btn.active {
            background-color: rgba(0, 0, 0, 0.1) !important;
            color: #030303 !important;
        }
        
        /* Map Container Background */
        body.light-mode #map-container {
            background-color: #F5F5F5 !important;
            border-color: rgba(0, 0, 0, 0.1) !important;
        }
        
        body.light-mode .bg-\[\#0A0A0A\] {
            background-color: #F5F5F5 !important;
        }
        
        /* Map Loading Overlay */
        body.light-mode #map-loading {
            background-color: rgba(255, 255, 255, 0.95) !important;
            color: #030303 !important;
        }
        
        body.light-mode #map-loading .text-off-white {
            color: #030303 !important;
        }
        
        body.light-mode #map-loading .text-neutral-500 {
            color: #666666 !important;
        }
        
        body.light-mode #map-loading .border-off-white\/30 {
            border-color: rgba(0, 0, 0, 0.3) !important;
        }
        
        body.light-mode #map-loading .border-t-off-white {
            border-top-color: #030303 !important;
        }

        /* Leaflet Map Light Mode */
        body.light-mode .leaflet-container {
            background-color: #EAEAEA !important;
        }
        
        body.light-mode .leaflet-popup-content-wrapper,
        body.light-mode .leaflet-popup-tip {
            background: #FFFFFF !important;
            color: #030303 !important;
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
        }
        body.light-mode .leaflet-container a.leaflet-popup-close-button {
            color: #666666 !important;
        }
        body.light-mode .leaflet-container a.leaflet-popup-close-button:hover {
            color: #000000 !important;
        }
        
        /* Map loading overlay in light mode */
        body.light-mode #map-loading {
            background-color: rgba(234, 234, 234, 0.95) !important;
            color: #030303 !important;
        }

        /* Widget Headers */
        body.light-mode .widget-header {
            background: rgba(255, 255, 255, 0.5) !important;
            border-bottom-color: rgba(0, 0, 0, 0.1) !important;
            color: #666666 !important;
        }

        /* Scrollbar */
        body.light-mode ::-webkit-scrollbar-track { background: #EAEAEA !important; }
        body.light-mode ::-webkit-scrollbar-thumb { background: #A0A0A0 !important; border-color: #EAEAEA !important; }
        body.light-mode ::-webkit-scrollbar-thumb:hover { background: #666666 !important; }

        /* Paper Mode (Writing Modals) - Ensure consistency regardless of theme toggle */
        .modal-content.paper-mode {
            background-color: #EAEAEA !important;
            color: #0F0F0F !important;
        }
        body.light-mode .modal-content.paper-mode {
            background-color: #FFFFFF !important;
            color: #030303 !important;
        }

        /* Mobile-Specific Light Mode Optimizations */
        @media (max-width: 768px) {
            body.light-mode {
                /* Increase contrast on mobile screens for better readability */
                --mobile-text-contrast: 1.1;
            }
            body.light-mode .text-neutral-400,
            body.light-mode .text-neutral-500 {
                color: #303030 !important;
            }
            body.light-mode .border-off-white\\/10,
            body.light-mode .border-white\\/10 {
                border-color: rgba(0, 0, 0, 0.15) !important;
            }
            body.light-mode .btn-tech {
                border-width: 1.5px !important;
                border-color: rgba(0, 0, 0, 0.3) !important;
            }
            body.light-mode .service-card,
            body.light-mode .project-card {
                background-color: #FFFFFF !important;
                border-color: rgba(0, 0, 0, 0.15) !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
            }
        }

        /* Paper Mode (Writing Modals) - Ensure consistency */
        .modal-content.paper-mode {
            background-color: #EAEAEA !important;
            color: #0F0F0F !important;
        }
        body.light-mode .modal-content.paper-mode {
            background-color: #FFFFFF !important;
            color: #030303 !important;
        }

        /* Mobile-Specific Light Mode Optimizations */
        @media (max-width: 768px) {
            body.light-mode {
                /* Increase contrast on mobile screens */
                --mobile-text-contrast: 1.1;
            }
            body.light-mode .text-neutral-400,
            body.light-mode .text-neutral-500 {
                color: #303030 !important; /* Darker for better mobile readability */
            }
            body.light-mode .border-off-white\/10,
            body.light-mode .border-white\/10 {
                border-color: rgba(0, 0, 0, 0.15) !important; /* More visible borders */
            }
            body.light-mode .btn-tech {
                border-width: 1.5px !important;
                border-color: rgba(0, 0, 0, 0.3) !important;
            }
            body.light-mode .service-card,
            body.light-mode .project-card {
                background-color: #FFFFFF !important;
                border-color: rgba(0, 0, 0, 0.15) !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
            }
        }

        /* Mobile-Specific Light Mode Optimizations */
        @media (max-width: 768px) {
            body.light-mode {
                /* Increase contrast on mobile screens */
                --mobile-text-contrast: 1.1;
            }
            body.light-mode .text-neutral-400,
            body.light-mode .text-neutral-500 {
                color: #303030 !important; /* Darker for better readability */
            }
            body.light-mode .border-off-white\/10,
            body.light-mode .border-white\/10 {
                border-color: rgba(0, 0, 0, 0.15) !important; /* More visible borders */
            }
            /* Ensure buttons are highly visible on mobile */
            body.light-mode .btn-tech {
                border-width: 1.5px !important;
                border-color: rgba(0, 0, 0, 0.3) !important;
            }
            /* Improve card visibility */
            body.light-mode .service-card,
            body.light-mode .project-card {
                background-color: #FFFFFF !important;
                border-color: rgba(0, 0, 0, 0.15) !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
            }
        }

        /* Additional Light Mode Comprehensive Fixes */
        
        /* All icon colors */
        body.light-mode i[data-lucide],
        body.light-mode svg {
            color: inherit;
        }
        
        /* Neutral text colors comprehensive override */
        body.light-mode .text-neutral-600,
        body.light-mode .text-neutral-700 {
            color: #666666 !important;
        }
        
        body.light-mode .text-neutral-800 {
            color: #404040 !important;
        }
        
        /* Hover states for close buttons and interactive icons */
        body.light-mode button:hover i[data-lucide],
        body.light-mode button:hover svg {
            color: #030303 !important;
        }
        
        /* All background containers with opacity */
        body.light-mode .bg-black\\/50 {
            background-color: rgba(255, 255, 255, 0.5) !important;
        }
        
        body.light-mode .bg-black\\/60 {
            background-color: rgba(255, 255, 255, 0.6) !important;
        }
        
        body.light-mode .bg-black\\/70 {
            background-color: rgba(255, 255, 255, 0.7) !important;
        }
        
        body.light-mode .bg-black\\/90 {
            background-color: rgba(255, 255, 255, 0.9) !important;
        }
        
        /* Backdrop blur elements */
        body.light-mode .backdrop-blur-md,
        body.light-mode .backdrop-blur-sm,
        body.light-mode .backdrop-blur-lg,
        body.light-mode .backdrop-blur-xl {
            background-color: rgba(255, 255, 255, 0.8) !important;
        }
        
        /* Market feed and ticker elements */
        body.light-mode .animate-marquee,
        body.light-mode [class*="marquee"] {
            color: #666666 !important;
        }
        
        /* Code/monospace text */
        body.light-mode .font-mono {
            color: inherit;
        }
        
        body.light-mode code,
        body.light-mode pre {
            background-color: rgba(0, 0, 0, 0.05) !important;
            color: #030303 !important;
        }
        
        /* All inputs, textareas, selects */
        body.light-mode input:not([type="range"]),
        body.light-mode textarea,
        body.light-mode select {
            color: #030303 !important;
            background-color: rgba(255, 255, 255, 0.5) !important;
            border-color: rgba(0, 0, 0, 0.2) !important;
        }
        
        body.light-mode input:focus:not([type="range"]),
        body.light-mode textarea:focus,
        body.light-mode select:focus {
            border-color: rgba(0, 0, 0, 0.4) !important;
            outline-color: rgba(0, 0, 0, 0.2) !important;
        }
        
        /* Placeholder text for all inputs */
        body.light-mode input::placeholder,
        body.light-mode textarea::placeholder {
            color: #999999 !important;
        }
        
        /* All button text and states */
        body.light-mode button {
            color: inherit;
        }
        
        /* Focus rings and outlines */
        body.light-mode *:focus-visible {
            outline-color: rgba(0, 0, 0, 0.5) !important;
        }
        
        /* Ensure all white/off-white text becomes dark */
        body.light-mode [class*="text-white"],
        body.light-mode [class*="text-off-white"] {
            color: #030303 !important;
        }
        
        /* Tooltips */
        body.light-mode .term-tooltip {
            background: #FFFFFF !important;
            color: #030303 !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.1) !important;
            border: 1px solid rgba(0,0,0,0.1) !important;
        }
        
        body.light-mode .term-tooltip::after {
            border-color: #FFFFFF transparent transparent transparent !important;
        }
        
        /* Interactive terms */
        body.light-mode .interactive-term {
            color: inherit;
            border-bottom-color: rgba(0, 0, 0, 0.3) !important;
        }
        
        /* Rating badges and tags */
        body.light-mode .rating-badge {
            background: transparent !important;
            border-color: rgba(0, 0, 0, 0.3) !important;
            color: #030303 !important;
        }
        
        body.light-mode .rating-badge.sell {
            border-color: rgba(0, 0, 0, 0.3) !important;
        }
        
        body.light-mode .rating-badge.buy {
            border-color: rgba(0, 0, 0, 0.3) !important;
        }

        /* Control Panel Styling (Redesigned) */
        #display-control-panel {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9999;
            background: rgba(3, 3, 3, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            padding: 20px;
            border-radius: 0;
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #EAEAEA;
            font-family: 'Space Mono', monospace;
            font-size: 11px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 220px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            opacity: 0;
            transform: translateY(8px);
            pointer-events: none;
        }
        
        body.light-mode #display-control-panel {
            background: rgba(255, 255, 255, 0.95);
            border-color: rgba(0, 0, 0, 0.1);
            color: #030303;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        }

        /* Modal System Light Mode */
        body.light-mode .modal-backdrop {
            background-color: rgba(255, 255, 255, 0.95);
        }
        body.light-mode .modal-backdrop.active {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }

        body.light-mode .modal-content {
            background-color: #FFFFFF !important;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15) !important;
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
        }
        
        /* Modal Content - All Text Colors */
        body.light-mode .modal-content .text-off-white,
        body.light-mode .modal-content .text-white {
            color: #030303 !important;
        }
        
        body.light-mode .modal-content .text-neutral-300 {
            color: #666666 !important;
        }
        
        body.light-mode .modal-content .text-neutral-400 {
            color: #666666 !important;
        }
        
        body.light-mode .modal-content .text-neutral-500 {
            color: #999999 !important;
        }
        
        body.light-mode .modal-content .text-neutral-600 {
            color: #999999 !important;
        }
        
        body.light-mode .modal-content .text-neutral-700 {
            color: #CCCCCC !important;
        }
        
        body.light-mode .modal-content .text-neutral-800 {
            color: #666666 !important;
        }
        
        body.light-mode .modal-content .text-off-black {
            color: #030303 !important;
        }
        
        /* Modal Backgrounds */
        body.light-mode .modal-content .bg-\[\#0F0F0F\],
        body.light-mode .modal-content .bg-\[\#0A0A0A\],
        body.light-mode .modal-content .bg-\[\#030303\],
        body.light-mode .modal-content .bg-\[\#050505\] {
            background-color: #F5F5F5 !important;
        }
        
        body.light-mode .modal-content .bg-off-white\/10 {
            background-color: rgba(0, 0, 0, 0.05) !important;
        }
        
        body.light-mode .modal-content .bg-off-white\/5 {
            background-color: rgba(0, 0, 0, 0.03) !important;
        }
        
        body.light-mode .modal-content .bg-off-white\/15 {
            background-color: rgba(0, 0, 0, 0.08) !important;
        }
        
        /* Modal Borders */
        body.light-mode .modal-content .border-off-white\/10,
        body.light-mode .modal-content .border-white\/10 {
            border-color: rgba(0, 0, 0, 0.1) !important;
        }
        
        body.light-mode .modal-content .border-off-white\/20,
        body.light-mode .modal-content .border-white\/20 {
            border-color: rgba(0, 0, 0, 0.15) !important;
        }
        
        body.light-mode .modal-content .border-off-white\/30 {
            border-color: rgba(0, 0, 0, 0.2) !important;
        }
        
        body.light-mode .modal-content .border-white\/5 {
            border-color: rgba(0, 0, 0, 0.08) !important;
        }
        
        body.light-mode .modal-content .border-neutral-200 {
            border-color: rgba(0, 0, 0, 0.15) !important;
        }
        
        body.light-mode .modal-content .border-neutral-300 {
            border-color: rgba(0, 0, 0, 0.2) !important;
        }
        
        /* Modal Dividers */
        body.light-mode .modal-content .w-px {
            background-color: rgba(0, 0, 0, 0.15) !important;
        }
        
        body.light-mode .modal-content .bg-neutral-300 {
            background-color: rgba(0, 0, 0, 0.2) !important;
        }
        
        body.light-mode .modal-content .bg-off-black {
            background-color: #030303 !important;
        }
        
        body.light-mode .modal-content .h-1.bg-off-black {
            background-color: #030303 !important;
            opacity: 0.2 !important;
        }
        
        /* Modal Buttons & Interactive */
        body.light-mode .modal-content button {
            color: inherit;
        }
        
        /* Links within modals */
        body.light-mode .modal-content a {
            color: inherit;
        }
        
        body.light-mode .modal-content a:hover {
            color: #030303 !important;
        }
        
        /* Icons within modals */
        body.light-mode .modal-content i[data-lucide] {
            color: inherit;
        }
        
        body.light-mode .modal-content .text-neutral-400 i[data-lucide] {
            color: #999999 !important;
        }
        
        body.light-mode .modal-content .text-neutral-500 i[data-lucide] {
            color: #999999 !important;
        }
        
        body.light-mode .modal-content .statement-tab {
            background-color: transparent !important;
            border-color: rgba(0, 0, 0, 0.15) !important;
            color: #666666 !important;
        }
        
        body.light-mode .modal-content .statement-tab.active {
            background-color: rgba(0, 0, 0, 0.05) !important;
            border-color: rgba(0, 0, 0, 0.2) !important;
            color: #030303 !important;
        }
        
        body.light-mode .modal-content .statement-tab:hover {
            background-color: rgba(0, 0, 0, 0.03) !important;
            border-color: rgba(0, 0, 0, 0.18) !important;
        }
        
        /* Spreadsheet/Terminal Elements */
        body.light-mode .modal-content #spreadsheet-container {
            background-color: #FAFAFA !important;
        }
        
        body.light-mode .modal-content .bg-neutral-800 {
            background-color: rgba(0, 0, 0, 0.2) !important;
        }
        
        body.light-mode .modal-content .bg-neutral-700 {
            background-color: rgba(0, 0, 0, 0.15) !important;
        }
        
        /* Metric Bars */
        body.light-mode .modal-content .bg-gradient-to-r {
            background-image: linear-gradient(to right, #030303, #666666) !important;
        }
        
        /* Drop Cap & Special Typography */
        body.light-mode .modal-content .drop-cap::first-letter {
            color: #030303 !important;
        }
        
        body.light-mode .modal-content .pull-quote {
            border-left-color: rgba(0, 0, 0, 0.2) !important;
            color: #030303 !important;
        }
        
        /* Ensure opacity classes don't hide text */
        body.light-mode .modal-content .opacity-20 {
            opacity: 0.3 !important;
        }
        
        body.light-mode .modal-content .opacity-30 {
            opacity: 0.4 !important;
        }
        
        body.light-mode .modal-content .opacity-40 {
            opacity: 0.5 !important;
        }
        
        body.light-mode .modal-content .opacity-50 {
            opacity: 0.6 !important;
        }
        
        /* Reading Progress Bar */
        body.light-mode #reading-progress {
            background-color: #030303 !important;
        }

        body.light-mode #close-modal {
            background-color: rgba(255, 255, 255, 0.9) !important;
            border-color: rgba(0, 0, 0, 0.1) !important;
        }
        body.light-mode #close-modal i {
            color: #666666 !important;
        }
        body.light-mode #close-modal:hover {
            background-color: rgba(0, 0, 0, 0.05) !important;
        }
        body.light-mode #close-modal:hover i {
            color: #030303 !important;
        }

        /* Modal Canvas Backgrounds - Reduce opacity in light mode */
        body.light-mode #canvas-modal-taskformer,
        body.light-mode #canvas-modal-point72,
        body.light-mode #canvas-modal-payroll,
        body.light-mode #canvas-modal-austin {
            opacity: 0.12 !important;
        }

        /* Modal Cover Backgrounds */
        body.light-mode .modal-content [style*="background-color: #0F0F0F"],
        body.light-mode .modal-content [style*="background-color: #0A0A0A"],
        body.light-mode .modal-content [style*="background-color: #050505"],
        body.light-mode .modal-content .bg-\[\#0F0F0F\],
        body.light-mode .modal-content .bg-\[\#0A0A0A\],
        body.light-mode .modal-content .bg-\[\#050505\] {
            background-color: #F5F5F5 !important;
        }

        /* Modal Gradient Overlays */
        body.light-mode .modal-content .bg-gradient-to-t.from-\[\#0A0A0A\],
        body.light-mode .modal-content .bg-gradient-to-t.from-\[\#050505\] {
            background-image: linear-gradient(to top, rgba(245,245,245,1), transparent) !important;
        }

        /* Modal Backdrop Light Mode */
        body.light-mode .modal-backdrop {
            background-color: rgba(255, 255, 255, 0.95);
        }
        body.light-mode .modal-backdrop.active {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }

        /* Modal Content Light Mode Improvements */
        body.light-mode .modal-content {
            background-color: #FFFFFF !important;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15) !important;
        }

        /* Modal Close Button */
        body.light-mode #close-modal {
            background-color: rgba(255, 255, 255, 0.9) !important;
            border-color: rgba(0, 0, 0, 0.1) !important;
        }
        body.light-mode #close-modal i {
            color: #030303 !important;
        }
        body.light-mode #close-modal:hover {
            background-color: rgba(0, 0, 0, 0.05) !important;
        }


        /* Theme Toggle Button */
        #theme-toggle-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 10000;
            width: 44px;
            height: 44px;
            border-radius: 0;
            background: rgba(3, 3, 3, 0.8);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #EAEAEA;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            font-family: 'Space Mono', monospace;
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }
        
        /* Mobile positioning - move up to avoid overlap with scroll */
        @media (max-width: 768px) {
            #theme-toggle-btn {
                bottom: 20px;
                right: 16px;
                width: 48px;
                height: 48px;
            }
        }
        
        #theme-toggle-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
        
        #theme-toggle-btn:active {
            transform: scale(0.95);
        }
        
        #theme-toggle-btn svg {
            width: 20px;
            height: 20px;
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @media (max-width: 768px) {
            #theme-toggle-btn svg {
                width: 22px;
                height: 22px;
            }
        }
        
        #theme-toggle-btn:hover svg {
            transform: rotate(15deg);
        }
        
        /* Light mode button styling */
        body.light-mode #theme-toggle-btn {
            background: rgba(255, 255, 255, 0.9);
            border-color: rgba(0, 0, 0, 0.15);
            color: #030303;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        body.light-mode #theme-toggle-btn:hover {
            background: rgba(255, 255, 255, 1);
            border-color: rgba(0, 0, 0, 0.3);
        }
    `;
    document.head.appendChild(style);

    // --- 2. Create Elements ---

    // Theme Toggle Button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle-btn';
    toggleBtn.title = 'Toggle Theme';
    toggleBtn.setAttribute('aria-label', 'Toggle light/dark theme');
    document.body.appendChild(toggleBtn);

    // --- 3. Logic ---
    
    // Icons
    const moonIcon = `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z' /></svg>`;
    const sunIcon = `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor'><path stroke-linecap='round' stroke-linejoin='round' d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z' /></svg>`;

    // State
    let isLightMode = false;

    // Detect system preference on load
    function detectSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return true;
        }
        return false;
    }

    // Initialize theme based on system preference or existing class
    if (document.body.classList.contains('light-mode') || document.documentElement.classList.contains('light-mode-early')) {
        isLightMode = true;
    } else {
        isLightMode = detectSystemTheme();
    }
    
    function updateThemeUI() {
        if (isLightMode) {
            document.body.classList.add('light-mode');
            toggleBtn.innerHTML = sunIcon;
            // Update meta theme color
            const metaThemeColor = document.getElementById('theme-color-meta');
            if (metaThemeColor) metaThemeColor.setAttribute('content', '#EAEAEA');
        } else {
            document.body.classList.remove('light-mode');
            toggleBtn.innerHTML = moonIcon;
            // Update meta theme color
            const metaThemeColor = document.getElementById('theme-color-meta');
            if (metaThemeColor) metaThemeColor.setAttribute('content', '#030303');
        }
    }

    // Initial UI update
    updateThemeUI();

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
            isLightMode = e.matches;
            updateThemeUI();
            triggerThemeUpdates();
        });
    }

    function triggerThemeUpdates() {
        // Reload TradingView Widgets if function exists
        if (typeof window.reloadTradingViewWidgets === 'function') {
            window.reloadTradingViewWidgets();
        }

        // Update Map Theme if function exists
        if (typeof window.updateMapTheme === 'function') {
            window.updateMapTheme();
        }

        // Update Globe Theme if function exists
        if (typeof window.updateGlobeTheme === 'function') {
            window.updateGlobeTheme();
        }

        // Update Charts Theme if function exists
        if (typeof window.updateChartsTheme === 'function') {
            window.updateChartsTheme();
        }
    }

    // Toggle Logic
    toggleBtn.addEventListener('click', () => {
        isLightMode = !isLightMode;
        updateThemeUI();
        triggerThemeUpdates();
    });

})();
