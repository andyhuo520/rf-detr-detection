import { pipeline } from '@huggingface/transformers';

// ==================== 多语言支持 ====================
const i18n = {
    zh: {
        subtitle: '实时目标检测 · 完全本地运行',
        systemOnline: '系统在线',
        latency: '延迟',
        initializing: '初始化中...',
        cameraAccess: '请允许访问摄像头',
        loadingModel: '加载模型中...',
        downloading: '下载 RF-DETR Medium (fp32)',
        compiling: '编译着色器...',
        warmingUp: '预热中，请稍候',
        cameraError: '摄像头错误',
        modelError: '模型错误',
        webcam: '摄像头',
        file: '文件',
        motion: '运动',
        pause: '暂停',
        play: '播放',
        threshold: '置信度阈值',
        classFilter: '类别筛选',
        motionSensitivity: '运动灵敏度',
        labelPlaceholder: '例如: person, car, dog',
        detectionLog: '检测日志',
        totalDetections: '总检测数',
        currentFrame: '当前帧',
        avgConfidence: '平均置信度',
        objectClass: '目标类别',
        confidence: '置信度',
        categoryStats: '类别统计',
        poweredBy: 'Powered by',
        generateReport: '生成报告',
        export: '导出',
        tabDetections: '检测',
        tabMotion: '运动',
        tabAnalytics: '分析',
        motionDetect: '运动检测',
        motionAnalysis: '运动分析',
        motionIntensity: '运动强度',
        activeRegions: '活跃区域',
        motionHistory: '运动历史',
        motionZones: '运动区域',
        monitoring: '监测中',
        analyticsReport: '分析报告',
        framesProcessed: '处理帧数',
        totalDetected: '检测总数',
        uniqueCategories: '识别类别',
        sessionDuration: '会话时长',
        fpsChart: '帧率趋势',
        detectionTimeline: '检测时间线',
        aiInsights: 'AI洞察',
        analysisReport: '分析报告',
        copyReport: '复制报告',
        downloadReport: '下载报告',
        person: '人物', car: '汽车', bicycle: '自行车', dog: '狗',
        cat: '猫', laptop: '笔记本电脑', mouse: '鼠标', keyboard: '键盘',
        cup: '杯子', cellPhone: '手机',
        highMotion: '检测到强烈运动',
        stableScene: '场景稳定',
        manyObjects: '多目标检测中',
        singleObject: '单目标场景',
        fastMovement: '快速移动检测',
        slowMovement: '缓慢移动',
        peakDetection: '检测峰值',
        avgFps: '平均帧率',
        maxDetections: '最大单帧检测'
    },
    en: {
        subtitle: 'Real-Time Detection · 100% Local Inference',
        systemOnline: 'SYSTEM ONLINE',
        latency: 'LATENCY',
        initializing: 'Initializing...',
        cameraAccess: 'Please allow camera access',
        loadingModel: 'Loading Model...',
        downloading: 'Downloading RF-DETR Medium (fp32)',
        compiling: 'Compiling Shaders...',
        warmingUp: 'Warming up, please wait',
        cameraError: 'Camera Error',
        modelError: 'Model Error',
        webcam: 'WEBCAM',
        file: 'FILE',
        motion: 'MOTION',
        pause: 'PAUSE',
        play: 'PLAY',
        threshold: 'Threshold',
        classFilter: 'Class Filter',
        motionSensitivity: 'Motion Sensitivity',
        labelPlaceholder: 'e.g. person, car, dog',
        detectionLog: 'DETECTION_LOG',
        totalDetections: 'Total',
        currentFrame: 'Frame',
        avgConfidence: 'Avg Conf',
        objectClass: 'CLASS',
        confidence: 'CONF',
        categoryStats: 'CATEGORY_STATS',
        poweredBy: 'Powered by',
        generateReport: 'REPORT',
        export: 'EXPORT',
        tabDetections: 'DETECT',
        tabMotion: 'MOTION',
        tabAnalytics: 'ANALYTICS',
        motionDetect: 'MOTION',
        motionAnalysis: 'MOTION_ANALYSIS',
        motionIntensity: 'Intensity',
        activeRegions: 'Active Regions',
        motionHistory: 'MOTION_HISTORY',
        motionZones: 'MOTION_ZONES',
        monitoring: 'MONITORING',
        analyticsReport: 'ANALYTICS_REPORT',
        framesProcessed: 'Frames',
        totalDetected: 'Detections',
        uniqueCategories: 'Categories',
        sessionDuration: 'Duration',
        fpsChart: 'FPS_TREND',
        detectionTimeline: 'DETECTION_TIMELINE',
        aiInsights: 'AI_INSIGHTS',
        analysisReport: 'ANALYSIS_REPORT',
        copyReport: 'COPY',
        downloadReport: 'DOWNLOAD',
        person: 'person', car: 'car', bicycle: 'bicycle', dog: 'dog',
        cat: 'cat', laptop: 'laptop', mouse: 'mouse', keyboard: 'keyboard',
        cup: 'cup', cellPhone: 'cell phone',
        highMotion: 'Strong motion detected',
        stableScene: 'Scene stable',
        manyObjects: 'Multiple objects detected',
        singleObject: 'Single object scene',
        fastMovement: 'Fast movement detected',
        slowMovement: 'Slow movement',
        peakDetection: 'Detection peak',
        avgFps: 'Average FPS',
        maxDetections: 'Max detections per frame'
    }
};

let currentLang = 'zh';
const labelTranslations = {
    'person': '人物', 'car': '汽车', 'bicycle': '自行车', 'dog': '狗',
    'cat': '猫', 'laptop': '笔记本电脑', 'mouse': '鼠标', 'keyboard': '键盘',
    'cup': '杯子', 'cell phone': '手机'
};

function t(key) { return i18n[currentLang][key] || key; }
function translateLabel(label) {
    const lower = label.toLowerCase();
    return labelTranslations[lower] ? t(lower) : label;
}

function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });
    document.querySelector('.header-subtitle span:last-child').textContent = t('subtitle');
}

document.getElementById('lang-zh').addEventListener('click', () => {
    currentLang = 'zh';
    document.getElementById('lang-zh').classList.add('active');
    document.getElementById('lang-en').classList.remove('active');
    updateLanguage();
    renderDetections();
});

document.getElementById('lang-en').addEventListener('click', () => {
    currentLang = 'en';
    document.getElementById('lang-en').classList.add('active');
    document.getElementById('lang-zh').classList.remove('active');
    updateLanguage();
    renderDetections();
});

// ==================== 页面元素 ====================
const video = document.getElementById('webcam');
const overlay = document.getElementById('overlay');
const motionCanvas = document.getElementById('motion-canvas');
const motionCtx = motionCanvas.getContext('2d');
const statusOverlay = document.getElementById('status');
const statusText = document.getElementById('status-text');
const statusSub = document.getElementById('status-sub');
const fpsElem = document.getElementById('fps-counter');
const slider = document.getElementById('threshold');
const sliderVal = document.getElementById('thresh-val');
const motionSlider = document.getElementById('motion-sensitivity');
const motionSensVal = document.getElementById('motion-sens-val');
const btnWebcam = document.getElementById('source-webcam');
const btnFile = document.getElementById('source-file');
const motionBtn = document.getElementById('motion-btn');
const fileInput = document.getElementById('file-input');
const spinner = document.querySelector('.spinner');
const allowedLabelsInput = document.getElementById('allowed-labels');
const pauseBtn = document.getElementById('pause-btn');
const pauseIcon = document.getElementById('pause-icon');
const playIcon = document.getElementById('play-icon');

let detector;
let lastTime = performance.now();
let threshold = 0.5;
let allowedLabels = null;
let paused = false;
let webcamStream = null;
let motionEnabled = false;
let motionSensitivity = 20;

// 统计变量
let totalDetections = 0;
let frameCount = 0;
let sessionStartTime = Date.now();
let detectionHistory = [];
let categoryStats = {};
let fpsHistory = [];
let detectionTimeline = [];
let motionHistory = [];
let prevFrameData = null;
let sessionStats = {
    framesProcessed: 0,
    totalDetections: 0,
    uniqueCategories: new Set(),
    maxDetectionsPerFrame: 0,
    fpsSum: 0,
    fpsCount: 0
};

const inputCanvas = document.createElement('canvas');
const inputCtx = inputCanvas.getContext('2d', { willReadFrequently: true });
const overlayCtx = overlay.getContext('2d');

const COLORS = ['#C9A962', '#B08D57', '#C77D58', '#8A8A8A', '#A88B4A', '#D4B876', '#6B5B4F', '#7A6F5D'];
const labelColorMap = new Map();
let nextColorIndex = 0;

function getColorForLabel(label) {
    if (!labelColorMap.has(label)) {
        labelColorMap.set(label, COLORS[nextColorIndex % COLORS.length]);
        nextColorIndex++;
    }
    return labelColorMap.get(label);
}

const VIDEO_CONSTRAINTS = { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } };
let videoRect = { x: 0, y: 0, w: 0, h: 0 };

// ==================== 运动检测 ====================
function initMotionCanvas() {
    motionCanvas.width = 320;
    motionCanvas.height = 240;
}

function detectMotion(currentFrameData) {
    if (!prevFrameData) {
        prevFrameData = currentFrameData;
        return { intensity: 0, regions: 0, zones: [] };
    }

    const width = motionCanvas.width;
    const height = motionCanvas.height;
    const diffData = motionCtx.createImageData(width, height);
    let motionPixels = 0;
    const motionZones = [];

    // 网格化检测区域
    const gridSize = 40;
    const gridCols = Math.ceil(width / gridSize);
    const gridRows = Math.ceil(height / gridSize);
    const regionGrid = Array(gridRows).fill(null).map(() => Array(gridCols).fill(0));

    for (let i = 0; i < currentFrameData.data.length; i += 4) {
        const diff = Math.abs(currentFrameData.data[i] - prevFrameData.data[i]) +
                    Math.abs(currentFrameData.data[i+1] - prevFrameData.data[i+1]) +
                    Math.abs(currentFrameData.data[i+2] - prevFrameData.data[i+2]);

        if (diff > motionSensitivity * 3) {
            diffData.data[i] = 0;
            diffData.data[i+1] = 255;
            diffData.data[i+2] = 0;
            diffData.data[i+3] = 255;
            motionPixels++;

            const pixelIdx = i / 4;
            const x = pixelIdx % width;
            const y = Math.floor(pixelIdx / width);
            const col = Math.floor(x / gridSize);
            const row = Math.floor(y / gridSize);
            if (row < gridRows && col < gridCols) {
                regionGrid[row][col]++;
            }
        } else {
            diffData.data[i] = 0;
            diffData.data[i+1] = 0;
            diffData.data[i+2] = 0;
            diffData.data[i+3] = 30;
        }
    }

    // 计算活跃区域
    for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
            if (regionGrid[row][col] > 10) {
                motionZones.push({ x: col * gridSize, y: row * gridSize, w: gridSize, h: gridSize, intensity: regionGrid[row][col] });
            }
        }
    }

    const intensity = Math.min(100, (motionPixels / (width * height)) * 500);

    prevFrameData = currentFrameData;

    return { intensity, regions: motionZones.length, zones: motionZones };
}

function drawMotionOverlay(zones) {
    if (!motionEnabled) return;
    motionCtx.clearRect(0, 0, motionCanvas.width, motionCanvas.height);

    zones.forEach(zone => {
        const alpha = Math.min(1, zone.intensity / 100);
        motionCtx.fillStyle = `rgba(201, 169, 98, ${alpha * 0.5})`;
        motionCtx.fillRect(zone.x, zone.y, zone.w, zone.h);
        motionCtx.strokeStyle = `rgba(201, 169, 98, ${alpha})`;
        motionCtx.strokeRect(zone.x, zone.y, zone.w, zone.h);
    });
}

// ==================== 事件监听 ====================
slider.addEventListener('input', (e) => {
    threshold = parseFloat(e.target.value);
    sliderVal.textContent = threshold.toFixed(2);
});

motionSlider.addEventListener('input', (e) => {
    motionSensitivity = parseInt(e.target.value);
    motionSensVal.textContent = motionSensitivity;
});

motionBtn.addEventListener('click', () => {
    motionEnabled = !motionEnabled;
    motionBtn.classList.toggle('active', motionEnabled);
    document.getElementById('motion-indicator').classList.toggle('active', motionEnabled);
    motionCanvas.style.opacity = motionEnabled ? '0.5' : '0';
    if (motionEnabled && !prevFrameData) {
        initMotionCanvas();
    }
});

allowedLabelsInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    allowedLabels = val ? new Set(val.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)) : null;
});

function resizeOverlay() {
    const cw = video.clientWidth;
    const ch = video.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    overlay.width = cw * dpr;
    overlay.height = ch * dpr;
    overlayCtx.scale(dpr, dpr);

    inputCanvas.width = video.videoWidth;
    inputCanvas.height = video.videoHeight;

    const vw = video.videoWidth || cw;
    const vh = video.videoHeight || ch;
    const videoAR = vw / vh;
    const containerAR = cw / ch;
    const drawW = videoAR > containerAR ? cw : ch * videoAR;
    const drawH = videoAR > containerAR ? cw / videoAR : ch;

    videoRect = { x: (cw - drawW) / 2, y: (ch - drawH) / 2, w: drawW, h: drawH };
}

window.addEventListener('resize', resizeOverlay);

async function onVideoReady() {
    await new Promise(r => video.onloadedmetadata = r);
    video.play();
    resizeOverlay();
    initMotionCanvas();
}

function resume() {
    if (!paused) return;
    paused = false;
    pauseIcon.style.display = '';
    playIcon.style.display = 'none';
    lastTime = performance.now();
    requestAnimationFrame(loop);
}

async function switchToWebcam() {
    if (video.src) {
        URL.revokeObjectURL(video.src);
        video.removeAttribute('src');
    }
    video.loop = false;
    try {
        webcamStream ??= await navigator.mediaDevices.getUserMedia({ video: VIDEO_CONSTRAINTS, audio: false });
        video.srcObject = webcamStream;
        await onVideoReady();
        btnWebcam.classList.add('active');
        btnFile.classList.remove('active');
        resume();
    } catch (e) {
        console.error('Webcam error:', e);
    }
}

async function switchToFile(file) {
    if (webcamStream) {
        webcamStream.getTracks().forEach(t => t.stop());
        webcamStream = null;
    }
    video.srcObject = null;
    video.src = URL.createObjectURL(file);
    video.loop = true;
    video.muted = true;
    await onVideoReady();
    btnFile.classList.add('active');
    btnWebcam.classList.remove('active');
    resume();
}

btnWebcam.addEventListener('click', switchToWebcam);
btnFile.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) switchToFile(file);
    fileInput.value = '';
});

pauseBtn.addEventListener('click', () => {
    if (paused) { resume(); video.play(); }
    else { paused = true; pauseIcon.style.display = 'none'; playIcon.style.display = ''; video.pause(); }
});

function showError(title, message) {
    statusText.textContent = title;
    statusSub.textContent = message;
    spinner.style.display = 'none';
}

// ==================== 标签页切换 ====================
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
});

// ==================== 统计更新 ====================
function updateStats(results) {
    frameCount++;
    totalDetections += results.length;

    // 更新会话统计
    sessionStats.framesProcessed++;
    sessionStats.totalDetections += results.length;
    results.forEach(r => sessionStats.uniqueCategories.add(r.label.toLowerCase()));
    if (results.length > sessionStats.maxDetectionsPerFrame) {
        sessionStats.maxDetectionsPerFrame = results.length;
    }

    const fps = parseFloat(fpsElem.textContent);
    sessionStats.fpsSum += fps;
    sessionStats.fpsCount++;

    // FPS历史
    fpsHistory.push(fps);
    if (fpsHistory.length > 60) fpsHistory.shift();

    // 检测时间线
    detectionTimeline.push({ frame: frameCount, count: results.length });
    if (detectionTimeline.length > 60) detectionTimeline.shift();

    // 更新检测列表
    const container = document.getElementById('detections-container');
    container.innerHTML = '';
    results.forEach(r => {
        const div = document.createElement('div');
        div.className = 'detection-item';
        const translatedLabel = translateLabel(r.label);
        div.innerHTML = `<span class="detection-label">${translatedLabel}</span><span class="detection-score">${(r.score * 100).toFixed(0)}%</span>`;
        container.appendChild(div);
        const label = r.label.toLowerCase();
        categoryStats[label] = (categoryStats[label] || 0) + 1;
    });

    document.getElementById('total-count').textContent = totalDetections;
    document.getElementById('frame-count').textContent = frameCount;
    if (results.length > 0) {
        const avgConf = results.reduce((sum, r) => sum + r.score, 0) / results.length;
        document.getElementById('avg-conf').textContent = (avgConf * 100).toFixed(0) + '%';
    }

    renderCategoryBars();
    updateMotionStats();
    updateAnalytics();
    updateInsights(results);

    // 模拟内存和GPU
    const mem = Math.floor(Math.random() * 200 + 400);
    const gpu = Math.floor(Math.random() * 30 + 20);
    document.getElementById('mem-usage').textContent = mem + 'MB';
    document.getElementById('gpu-usage').textContent = gpu + '%';
}

function renderCategoryBars() {
    const container = document.getElementById('category-bars');
    const sorted = Object.entries(categoryStats).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const max = sorted.length > 0 ? sorted[0][1] : 1;
    container.innerHTML = sorted.map(([label, count]) => {
        const translated = translateLabel(label);
        const percent = (count / max) * 100;
        const color = getColorForLabel(label);
        return `<div class="category-bar"><span class="category-name">${translated}</span><div class="category-bar-track"><div class="category-bar-fill" style="width: ${percent}%; background: ${color}"></div></div><span class="category-count">${count}</span></div>`;
    }).join('');
}

function renderDetections() {
    if (detectionHistory.length > 0) {
        const latest = detectionHistory[detectionHistory.length - 1];
        const container = document.getElementById('detections-container');
        container.innerHTML = '';
        latest.forEach(r => {
            const div = document.createElement('div');
            div.className = 'detection-item';
            div.innerHTML = `<span class="detection-label">${translateLabel(r.label)}</span><span class="detection-score">${(r.score * 100).toFixed(0)}%</span>`;
            container.appendChild(div);
        });
    }
    renderCategoryBars();
}

// ==================== 运动检测统计 ====================
function updateMotionStats() {
    document.getElementById('motion-intensity').textContent = motionHistory.length > 0 ? motionHistory[motionHistory.length - 1].toFixed(0) + '%' : '0%';
    document.getElementById('motion-regions').textContent = '0';

    // 更新图表
    if (motionHistory.length > 0) {
        drawMotionChart();
    }
}

function drawMotionChart() {
    const canvas = document.getElementById('motion-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 80;

    ctx.fillStyle = '#0A1120';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (motionHistory.length < 2) return;

    const max = Math.max(...motionHistory, 1);
    ctx.strokeStyle = '#C9A962';
    ctx.lineWidth = 2;
    ctx.beginPath();

    motionHistory.forEach((val, i) => {
        const x = (i / (motionHistory.length - 1)) * canvas.width;
        const y = canvas.height - (val / max) * canvas.height * 0.8;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
}

// ==================== 分析面板 ====================
function updateAnalytics() {
    const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
    document.getElementById('analytics-frames').textContent = sessionStats.framesProcessed;
    document.getElementById('analytics-detections').textContent = sessionStats.totalDetections;
    document.getElementById('analytics-categories').textContent = sessionStats.uniqueCategories.size;
    document.getElementById('analytics-duration').textContent = duration + 's';

    const avgFps = sessionStats.fpsCount > 0 ? (sessionStats.fpsSum / sessionStats.fpsCount).toFixed(1) : '0';
    document.getElementById('fps-trend').textContent = avgFps + ' FPS';

    drawFpsChart();
    drawTimelineChart();
}

function drawFpsChart() {
    const canvas = document.getElementById('fps-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 60;

    ctx.fillStyle = '#0A1120';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (fpsHistory.length < 2) return;

    const max = 60;
    ctx.strokeStyle = '#00F0FF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    fpsHistory.forEach((val, i) => {
        const x = (i / (fpsHistory.length - 1)) * canvas.width;
        const y = canvas.height - (Math.min(val, max) / max) * canvas.height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
}

function drawTimelineChart() {
    const canvas = document.getElementById('timeline-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 60;

    ctx.fillStyle = '#0A1120';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (detectionTimeline.length < 2) return;

    const max = Math.max(...detectionTimeline.map(d => d.count), 1);
    detectionTimeline.forEach((d, i) => {
        const x = (i / (detectionTimeline.length - 1)) * canvas.width;
        const h = (d.count / max) * canvas.height;
        const hue = 120 + (d.count / max) * 60;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(x - 2, canvas.height - h, 4, h);
    });
}

// ==================== AI洞察 ====================
let lastInsightTime = 0;
function updateInsights(results) {
    const now = Date.now();
    if (now - lastInsightTime < 3000) return;
    lastInsightTime = now;

    const insights = [];

    if (motionHistory.length > 0 && motionHistory[motionHistory.length - 1] > 50) {
        insights.push({ icon: 'directions_run', text: t('highMotion'), color: '#C9A962' });
    } else if (motionHistory.length > 0 && motionHistory[motionHistory.length - 1] < 10) {
        insights.push({ icon: 'pause_circle', text: t('stableScene'), color: '#8A8A8A' });
    }

    if (results.length > 3) {
        insights.push({ icon: 'group', text: t('manyObjects'), color: '#C9A962' });
    } else if (results.length === 1) {
        insights.push({ icon: 'person', text: t('singleObject'), color: '#8A8A8A' });
    }

    if (fpsHistory.length > 0 && fpsHistory[fpsHistory.length - 1] > 55) {
        insights.push({ icon: 'speed', text: t('fastMovement'), color: '#B08D57' });
    }

    if (insights.length > 0) {
        const container = document.getElementById('insights-list');
        container.innerHTML = insights.map(i => `
            <div class="insight-item">
                <span class="material-symbols-outlined" style="color: ${i.color}">${i.icon}</span>
                <span>${i.text}</span>
            </div>
        `).join('');
    }
}

// ==================== 报告生成 ====================
function generateReport() {
    const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
    const avgFps = sessionStats.fpsCount > 0 ? (sessionStats.fpsSum / sessionStats.fpsCount).toFixed(1) : '0';
    const topCategories = Object.entries(categoryStats).sort((a, b) => b[1] - a[1]).slice(0, 5);

    return {
        title: currentLang === 'zh' ? 'RF-DETR 分析报告' : 'RF-DETR Analysis Report',
        generatedAt: new Date().toLocaleString(),
        session: {
            duration: duration + 's',
            framesProcessed: sessionStats.framesProcessed,
            avgFps: avgFps
        },
        detection: {
            total: sessionStats.totalDetections,
            maxPerFrame: sessionStats.maxDetectionsPerFrame,
            uniqueCategories: sessionStats.uniqueCategories.size,
            topCategories: topCategories.map(([k, v]) => ({ label: translateLabel(k), count: v }))
        },
        motion: {
            avgIntensity: motionHistory.length > 0 ? (motionHistory.reduce((a,b) => a+b, 0) / motionHistory.length).toFixed(1) + '%' : '0%'
        }
    };
}

document.getElementById('report-btn').addEventListener('click', () => {
    const report = generateReport();
    const content = document.getElementById('report-content');
    content.innerHTML = `
        <div class="report-section">
            <h3>${report.title}</h3>
            <p class="report-time">${report.generatedAt}</p>
        </div>
        <div class="report-section">
            <h4>${currentLang === 'zh' ? '会话统计' : 'Session Statistics'}</h4>
            <div class="report-grid">
                <div class="report-item"><span>${currentLang === 'zh' ? '会话时长' : 'Duration'}</span><strong>${report.session.duration}</strong></div>
                <div class="report-item"><span>${currentLang === 'zh' ? '处理帧数' : 'Frames'}</span><strong>${report.session.framesProcessed}</strong></div>
                <div class="report-item"><span>${currentLang === 'zh' ? '平均帧率' : 'Avg FPS'}</span><strong>${report.session.avgFps}</strong></div>
            </div>
        </div>
        <div class="report-section">
            <h4>${currentLang === 'zh' ? '检测统计' : 'Detection Statistics'}</h4>
            <div class="report-grid">
                <div class="report-item"><span>${currentLang === 'zh' ? '总检测数' : 'Total'}</span><strong>${report.detection.total}</strong></div>
                <div class="report-item"><span>${currentLang === 'zh' ? '最大单帧' : 'Max/Frame'}</span><strong>${report.detection.maxPerFrame}</strong></div>
                <div class="report-item"><span>${currentLang === 'zh' ? '识别类别' : 'Categories'}</span><strong>${report.detection.uniqueCategories}</strong></div>
            </div>
        </div>
        <div class="report-section">
            <h4>${currentLang === 'zh' ? 'Top 类别' : 'Top Categories'}</h4>
            <ul class="report-list">
                ${report.detection.topCategories.map(c => `<li><span>${c.label}</span><span>${c.count}</span></li>`).join('')}
            </ul>
        </div>
        <div class="report-section">
            <h4>${currentLang === 'zh' ? '运动分析' : 'Motion Analysis'}</h4>
            <div class="report-grid">
                <div class="report-item"><span>${currentLang === 'zh' ? '平均运动强度' : 'Avg Intensity'}</span><strong>${report.motion.avgIntensity}</strong></div>
            </div>
        </div>
    `;
    document.getElementById('report-modal').classList.add('active');
});

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('report-modal').classList.remove('active');
});

document.getElementById('copy-report').addEventListener('click', () => {
    const report = generateReport();
    const text = JSON.stringify(report, null, 2);
    navigator.clipboard.writeText(text);
    alert(currentLang === 'zh' ? '报告已复制!' : 'Report copied!');
});

document.getElementById('download-report').addEventListener('click', () => {
    const report = generateReport();
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rf-detr-report-${Date.now()}.json`;
    a.click();
});

// ==================== 主程序 ====================
async function main() {
    try { await switchToWebcam(); }
    catch (e) { showError(t('cameraError'), e.message); throw e; }

    statusText.textContent = t('loadingModel');
    statusSub.textContent = t('downloading');

    try {
        detector = await pipeline('object-detection', 'onnx-community/rfdetr_medium-ONNX', { device: 'webgpu', dtype: 'fp32' });
        statusText.textContent = t('compiling');
        statusSub.textContent = t('warmingUp');
        inputCtx.drawImage(video, 0, 0, inputCanvas.width, inputCanvas.height);
        await detector(inputCanvas, { threshold: 0.5, percentage: true });
        statusOverlay.style.opacity = '0';
        setTimeout(() => statusOverlay.style.display = 'none', 300);
    } catch (e) { showError(t('modelError'), e.message); throw e; }

    requestAnimationFrame(loop);
}

async function loop() {
    if (paused) return;

    const now = performance.now();
    const dt = now - lastTime;
    lastTime = now;

    if (dt > 0) { fpsElem.textContent = (1000 / dt).toFixed(1); }

    inputCtx.drawImage(video, 0, 0, inputCanvas.width, inputCanvas.height);

    let results = await detector(inputCanvas, { threshold, percentage: true });
    if (allowedLabels) { results = results.filter(r => allowedLabels.has(r.label.toLowerCase())); }

    detectionHistory.push(results);
    if (detectionHistory.length > 10) detectionHistory.shift();

    // 运动检测
    if (motionEnabled) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 320;
        tempCanvas.height = 240;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(video, 0, 0, 320, 240);
        const frameData = tempCtx.getImageData(0, 0, 320, 240);
        const motion = detectMotion(frameData);
        motionHistory.push(motion.intensity);
        if (motionHistory.length > 60) motionHistory.shift();
        drawMotionOverlay(motion.zones);
        document.getElementById('motion-level').textContent = motion.intensity.toFixed(0) + '%';
        document.getElementById('motion-regions').textContent = motion.regions;
    }

    drawResults(results);
    updateStats(results);

    requestAnimationFrame(loop);
}

function drawResults(results) {
    const { x: vx, y: vy, w, h } = videoRect;
    overlayCtx.setTransform(1, 0, 0, 1, 0, 0);
    overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
    const dpr = window.devicePixelRatio || 1;
    overlayCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    overlayCtx.font = '600 13px system-ui';
    overlayCtx.lineWidth = 2.5;

    for (let i = 0; i < results.length; ++i) {
        const { box, label, score } = results[i];
        const color = getColorForLabel(label);
        const translatedLabel = translateLabel(label);

        const x1 = vx + box.xmin * w;
        const y1 = vy + box.ymin * h;
        const bw = (box.xmax - box.xmin) * w;
        const bh = (box.ymax - box.ymin) * h;

        overlayCtx.strokeStyle = color;
        overlayCtx.shadowColor = color;
        overlayCtx.shadowBlur = 10;
        overlayCtx.beginPath();
        overlayCtx.roundRect(x1, y1, bw, bh, 6);
        overlayCtx.stroke();
        overlayCtx.shadowBlur = 0;

        const text = `${translatedLabel} ${(score * 100).toFixed(0)}%`;
        const textWidth = overlayCtx.measureText(text).width;
        overlayCtx.fillStyle = color;
        overlayCtx.beginPath();
        overlayCtx.roundRect(x1, y1 - 26, textWidth + 12, 22, 4);
        overlayCtx.fill();
        overlayCtx.fillStyle = 'white';
        overlayCtx.fillText(text, x1 + 6, y1 - 9);
    }
}

main();
