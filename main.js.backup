import { pipeline } from '@huggingface/transformers';

// COCO 类别标签（中文）
const COCO_LABELS = {
    'person': '人物',
    'bicycle': '自行车',
    'car': '汽车',
    'motorcycle': '摩托车',
    'airplane': '飞机',
    'bus': '公交车',
    'train': '火车',
    'truck': '卡车',
    'boat': '船',
    'traffic light': '交通灯',
    'fire hydrant': '消防栓',
    'stop sign': '停止标志',
    'parking meter': '停车计时器',
    'bird': '鸟',
    'cat': '猫',
    'dog': '狗',
    'horse': '马',
    'sheep': '羊',
    'cow': '牛',
    'elephant': '大象',
    'bear': '熊',
    'zebra': '斑马',
    'giraffe': '长颈鹿',
    'backpack': '背包',
    'umbrella': '雨伞',
    'handbag': '手提包',
    'tie': '领带',
    'suitcase': '行李箱',
    'frisbee': '飞盘',
    'skis': '滑雪板',
    'snowboard': '滑雪板',
    'sports ball': '运动球',
    'kite': '风筝',
    'baseball bat': '棒球棒',
    'baseball glove': '棒球手套',
    'skateboard': '滑板',
    'surfboard': '冲浪板',
    'tennis racket': '网球拍',
    'bottle': '瓶子',
    'wine glass': '酒杯',
    'cup': '杯子',
    'fork': '叉子',
    'knife': '刀',
    'spoon': '勺子',
    'bowl': '碗',
    'banana': '香蕉',
    'apple': '苹果',
    'sandwich': '三明治',
    'orange': '橙子',
    'broccoli': '西兰花',
    'carrot': '胡萝卜',
    'hot dog': '热狗',
    'pizza': '披萨',
    'donut': '甜甜圈',
    'cake': '蛋糕',
    'chair': '椅子',
    'couch': '沙发',
    'potted plant': '盆栽',
    'bed': '床',
    'dining table': '餐桌',
    'toilet': '马桶',
    'tv': '电视',
    'laptop': '笔记本电脑',
    'mouse': '鼠标',
    'remote': '遥控器',
    'keyboard': '键盘',
    'cell phone': '手机',
    'microwave': '微波炉',
    'oven': '烤箱',
    'toaster': '烤面包机',
    'sink': '水槽',
    'refrigerator': '冰箱',
    'book': '书',
    'clock': '时钟',
    'vase': '花瓶',
    'scissors': '剪刀',
    'teddy bear': '泰迪熊',
    'hair drier': '吹风机',
    'toothbrush': '牙刷'
};

let detector = null;
const statusEl = document.getElementById('status');
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasContainer = document.getElementById('canvasContainer');
const resultsEl = document.getElementById('results');

// 初始化模型
async function initModel() {
    try {
        statusEl.textContent = '正在加载 RF-DETR 模型...';
        statusEl.className = 'status loading';

        detector = await pipeline('object-detection', 'onnx-community/rfdetr_medium-ONNX', {
            device: 'webgpu',
            dtype: 'fp32',
        });

        statusEl.textContent = '✅ 模型加载完成，可以开始检测！';
        statusEl.className = 'status ready';
    } catch (error) {
        console.error('模型加载失败:', error);
        statusEl.textContent = '❌ 模型加载失败: ' + error.message;
        statusEl.className = 'status error';
    }
}

// 处理图片上传
uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        processImage(file);
    }
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        processImage(file);
    }
});

// 处理图片
async function processImage(file) {
    if (!detector) {
        alert('模型还未加载完成，请稍候');
        return;
    }

    statusEl.textContent = '正在检测目标...';
    statusEl.className = 'status loading';

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
        // 设置画布大小
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvasContainer.style.display = 'block';

        try {
            // 执行检测
            const results = await detector(img, {
                threshold: 0.3,
                percentage: true
            });

            // 绘制检测结果
            drawDetections(results);

            // 显示结果列表
            displayResults(results);

            statusEl.textContent = `✅ 检测完成！发现 ${results.length} 个目标`;
            statusEl.className = 'status ready';
        } catch (error) {
            console.error('检测失败:', error);
            statusEl.textContent = '❌ 检测失败: ' + error.message;
            statusEl.className = 'status error';
        }
    };
}

// 绘制检测框
function drawDetections(detections) {
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
        '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788'
    ];

    detections.forEach((detection, index) => {
        const { box, label, score } = detection;
        const color = colors[index % colors.length];

        // 绘制边界框
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.strokeRect(
            box.xmin * canvas.width / 100,
            box.ymin * canvas.height / 100,
            (box.xmax - box.xmin) * canvas.width / 100,
            (box.ymax - box.ymin) * canvas.height / 100
        );

        // 绘制标签背景
        const labelText = `${COCO_LABELS[label] || label} ${(score * 100).toFixed(1)}%`;
        ctx.font = 'bold 16px Arial';
        const textWidth = ctx.measureText(labelText).width;

        ctx.fillStyle = color;
        ctx.fillRect(
            box.xmin * canvas.width / 100,
            box.ymin * canvas.height / 100 - 25,
            textWidth + 10,
            25
        );

        // 绘制标签文字
        ctx.fillStyle = 'white';
        ctx.fillText(
            labelText,
            box.xmin * canvas.width / 100 + 5,
            box.ymin * canvas.height / 100 - 7
        );
    });
}

// 显示结果列表
function displayResults(detections) {
    resultsEl.innerHTML = '<h3>🎯 检测结果</h3>';

    if (detections.length === 0) {
        resultsEl.innerHTML += '<p>未检测到任何目标</p>';
        return;
    }

    detections.forEach((detection) => {
        const { label, score } = detection;
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <span class="result-label">${COCO_LABELS[label] || label}</span>
            <span class="result-score">${(score * 100).toFixed(1)}%</span>
        `;
        resultsEl.appendChild(resultItem);
    });
}

// 启动应用
initModel();
