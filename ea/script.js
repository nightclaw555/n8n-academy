// ========================================================
// Navbar Scroll Effect & Mobile Nav
// ========================================================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });
}

// ========================================================
// Form Submission Handling
// ========================================================
const form = document.getElementById('consultation-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('full-name').value;
        const lineId = document.getElementById('line-id').value;
        alert(`ขอบคุณครับ คุณ ${fullName}\n\nเราได้รับข้อมูลการจองคิวประเมินระบบเทรดเรียบร้อยแล้ว\nเจ้าหน้าที่จะติดต่อกลับผ่าน Line: ${lineId} เพื่อคอนเฟิร์มวันและเวลาเรียนตัวต่อตัวครับ!`);
        form.reset();
    });
}

// ========================================================
// Thrilling Real-Time EA Trading Simulator Engine
// ========================================================
const canvas = document.getElementById('trading-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationId;
    let isPaused = false;
    let speedMultiplier = 1;
    let soundEnabled = true;

    // Responsive Canvas
    function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = 420;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Audio SFX Synthesizer (Web Audio API)
    let audioCtx = null;
    function playBeep(type) {
        if (!soundEnabled) return;
        try {
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            const now = audioCtx.currentTime;
            if (type === 'buy') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(587.33, now); // D5
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
            } else if (type === 'profit') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(783.99, now); // G5
                osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.2); // D6
                gain.gain.setValueAtTime(0.12, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
                osc.start(now);
                osc.stop(now + 0.25);
            }
        } catch (e) {
            // Audio context blocked or not supported
        }
    }

    // State Variables
    let basePrice = 2650.00;
    let currentPrice = 2650.00;
    let candles = [];
    const maxCandles = 42;
    let candleWidth = 14;
    let candleSpacing = 6;
    let tickCounter = 0;
    let netProfit = 2740.50;
    let activePosition = null; // { type: 'BUY', entry: 2651.20, lot: 1.0, sl: 2647.00, tp: 2656.00, trailing: 2649.00 }
    let lastTradeTime = 0;

    // Generate initial historical candles
    let p = basePrice - 5.0;
    for (let i = 0; i < maxCandles; i++) {
        const change = (Math.random() - 0.47) * 2.2;
        const open = p;
        const close = open + change;
        const high = Math.max(open, close) + Math.random() * 1.5;
        const low = Math.min(open, close) - Math.random() * 1.5;
        candles.push({ open, high, low, close });
        p = close;
    }
    currentPrice = candles[candles.length - 1].close;

    // DOM Metric Elements
    const metricProfit = document.getElementById('metric-profit');
    const hudStatus = document.getElementById('hud-status-text');
    const hudTrailing = document.getElementById('hud-trailing-text');
    const orderLog = document.getElementById('order-log-list');

    function logOrder(text, tag, color) {
        if (!orderLog) return;
        const li = document.createElement('li');
        li.className = 'order-log-item';
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        li.innerHTML = `<span>[${timeStr}] ${text}</span><span style="color: ${color}; font-weight: bold;">${tag}</span>`;
        orderLog.insertBefore(li, orderLog.firstChild);
        if (orderLog.children.length > 5) {
            orderLog.removeChild(orderLog.lastChild);
        }
    }

    // Simulation Loop
    function updateSimulation() {
        if (isPaused) return;

        tickCounter += speedMultiplier;
        const tickThreshold = 18;

        // Micro-price flutter
        const microChange = (Math.random() - 0.48) * (0.35 * speedMultiplier);
        currentPrice += microChange;
        
        let lastCandle = candles[candles.length - 1];
        lastCandle.close = currentPrice;
        if (currentPrice > lastCandle.high) lastCandle.high = currentPrice;
        if (currentPrice < lastCandle.low) lastCandle.low = currentPrice;

        // When candle completes
        if (tickCounter >= tickThreshold) {
            tickCounter = 0;
            // Shift candles
            candles.shift();
            candles.push({
                open: currentPrice,
                high: currentPrice,
                low: currentPrice,
                close: currentPrice
            });

            // EA Trading Logic Trigger
            const prevCandle = candles[candles.length - 2];
            const isBullish = prevCandle.close > prevCandle.open;
            
            // Auto Entry Trigger
            if (!activePosition && Math.random() > 0.35) {
                activePosition = {
                    type: 'BUY',
                    entry: currentPrice,
                    lot: 1.0,
                    sl: currentPrice - 4.5,
                    tp: currentPrice + 6.0,
                    trailing: currentPrice - 2.5
                };
                playBeep('buy');
                if (hudStatus) hudStatus.innerHTML = `⚡ [AUTO-BUY EXECUTED] 1.00 Lot @ ${currentPrice.toFixed(2)}`;
                logOrder(`BUY 1.00 XAUUSD @ ${currentPrice.toFixed(2)}`, 'EXECUTED', '#00f59b');
            }
        }

        // Active Position Management (Trailing Stop & TP)
        if (activePosition) {
            const profitPoints = currentPrice - activePosition.entry;
            
            // Trailing Stop Adjust
            if (currentPrice - activePosition.trailing > 3.0) {
                activePosition.trailing = currentPrice - 2.0;
                if (hudTrailing) hudTrailing.innerHTML = `TRAILED: ${(currentPrice - activePosition.trailing).toFixed(1)} PTS (+$${((activePosition.trailing - activePosition.entry) * 100).toFixed(0)})`;
            }

            // Take Profit or Trailing Hit
            if (currentPrice >= activePosition.tp || (profitPoints > 1.5 && currentPrice <= activePosition.trailing)) {
                const gain = Math.max(180, (currentPrice - activePosition.entry) * 120);
                netProfit += gain;
                if (metricProfit) {
                    metricProfit.innerHTML = `+$${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                }
                playBeep('profit');
                if (hudStatus) hudStatus.innerHTML = `🎯 [TARGET HIT] +$${gain.toFixed(2)} CLOSED`;
                logOrder(`TP CLOSED @ ${currentPrice.toFixed(2)}`, `+$${gain.toFixed(2)}`, '#00f59b');
                activePosition = null;
            } else if (currentPrice <= activePosition.sl) {
                // Controlled SL
                netProfit -= 85;
                if (metricProfit) metricProfit.innerHTML = `+$${netProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                if (hudStatus) hudStatus.innerHTML = `🛡️ [SL TRIGGERED - RISK GUARDED]`;
                logOrder(`SL CLOSED @ ${currentPrice.toFixed(2)}`, `-$85.00`, '#ef4444');
                activePosition = null;
            }
        }
    }

    // Render Canvas
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dark Background grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        const gridStep = 45;
        for (let x = 0; x < canvas.width; x += gridStep) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridStep) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Calculate Price Range
        let minPrice = Infinity;
        let maxPrice = -Infinity;
        candles.forEach(c => {
            if (c.low < minPrice) minPrice = c.low;
            if (c.high > maxPrice) maxPrice = c.high;
        });
        const pricePadding = 2.0;
        minPrice -= pricePadding;
        maxPrice += pricePadding;
        const priceRange = maxPrice - minPrice || 1;

        function getY(price) {
            return canvas.height - ((price - minPrice) / priceRange) * (canvas.height - 70) - 35;
        }

        // Draw Candlesticks
        const totalWidth = candles.length * (candleWidth + candleSpacing);
        const startX = canvas.width - totalWidth - 40;

        candles.forEach((c, index) => {
            const x = startX + index * (candleWidth + candleSpacing);
            const yOpen = getY(c.open);
            const yClose = getY(c.close);
            const yHigh = getY(c.high);
            const yLow = getY(c.low);
            const isBull = c.close >= c.open;

            // Wick
            ctx.strokeStyle = isBull ? '#00f59b' : '#ef4444';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(x + candleWidth / 2, yHigh);
            ctx.lineTo(x + candleWidth / 2, yLow);
            ctx.stroke();

            // Candle Body
            ctx.fillStyle = isBull ? '#00f59b' : '#ef4444';
            const bodyTop = Math.min(yOpen, yClose);
            const bodyHeight = Math.max(Math.abs(yClose - yOpen), 2);
            ctx.fillRect(x, bodyTop, candleWidth, bodyHeight);
        });

        // Draw Moving Average 9 (EMA Neon Line)
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        candles.forEach((c, index) => {
            const x = startX + index * (candleWidth + candleSpacing) + candleWidth / 2;
            const y = getY(c.close);
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Draw Active Position Laser Lines
        if (activePosition) {
            const entryY = getY(activePosition.entry);
            const tpY = getY(activePosition.tp);
            const trailingY = getY(activePosition.trailing);

            // Entry line (Cyan)
            ctx.strokeStyle = '#38bdf8';
            ctx.setLineDash([6, 4]);
            ctx.beginPath();
            ctx.moveTo(0, entryY);
            ctx.lineTo(canvas.width, entryY);
            ctx.stroke();

            // TP line (Green Glow)
            ctx.strokeStyle = '#00f59b';
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(0, tpY);
            ctx.lineTo(canvas.width, tpY);
            ctx.stroke();

            // Trailing Stop line (Yellow)
            ctx.strokeStyle = '#fbbf24';
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(0, trailingY);
            ctx.lineTo(canvas.width, trailingY);
            ctx.stroke();
            ctx.setLineDash([]); // Reset dash

            // Draw Order Tags on Right Margin
            ctx.fillStyle = '#00f59b';
            ctx.fillRect(canvas.width - 95, tpY - 10, 90, 20);
            ctx.fillStyle = '#06090c';
            ctx.font = 'bold 11px monospace';
            ctx.fillText(`TP: ${activePosition.tp.toFixed(1)}`, canvas.width - 90, tpY + 4);

            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(canvas.width - 95, trailingY - 10, 90, 20);
            ctx.fillStyle = '#06090c';
            ctx.fillText(`TRL: ${activePosition.trailing.toFixed(1)}`, canvas.width - 90, trailingY + 4);
        }

        // Current Price Laser Horizontal
        const curY = getY(currentPrice);
        ctx.strokeStyle = 'rgba(0, 245, 155, 0.7)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, curY);
        ctx.lineTo(canvas.width, curY);
        ctx.stroke();

        // Price Badge on Axis
        ctx.fillStyle = '#00f59b';
        ctx.fillRect(canvas.width - 85, curY - 11, 80, 22);
        ctx.fillStyle = '#06090c';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(currentPrice.toFixed(2), canvas.width - 80, curY + 4);
    }

    // Animation Loop
    function loop() {
        updateSimulation();
        draw();
        animationId = requestAnimationFrame(loop);
    }
    loop();

    // Simulator Control Buttons
    const btnToggle = document.getElementById('btn-toggle-sim');
    if (btnToggle) {
        btnToggle.addEventListener('click', () => {
            isPaused = !isPaused;
            btnToggle.textContent = isPaused ? '▶ RESUME DEMO' : '⏸ PAUSE DEMO';
            btnToggle.classList.toggle('play-btn', isPaused);
        });
    }

    const btn1x = document.getElementById('btn-speed-1x');
    const btn5x = document.getElementById('btn-speed-5x');
    const btn10x = document.getElementById('btn-speed-10x');
    const speedBtns = [btn1x, btn5x, btn10x];

    function setSpeed(mult, activeBtn) {
        speedMultiplier = mult;
        speedBtns.forEach(b => { if (b) b.classList.remove('active'); });
        if (activeBtn) activeBtn.classList.add('active');
    }

    if (btn1x) btn1x.addEventListener('click', () => setSpeed(1, btn1x));
    if (btn5x) btn5x.addEventListener('click', () => setSpeed(3, btn5x));
    if (btn10x) btn10x.addEventListener('click', () => setSpeed(7, btn10x));

    const btnSound = document.getElementById('btn-sound-toggle');
    if (btnSound) {
        btnSound.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            btnSound.textContent = soundEnabled ? '🔊 SOUND: ON' : '🔇 SOUND: OFF';
            btnSound.classList.toggle('active', soundEnabled);
        });
    }
}
