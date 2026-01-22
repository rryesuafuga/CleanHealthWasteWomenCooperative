/**
 * CleanHealth Waste Women's Cooperative
 * TensorFlow.js Waste Classification Demo
 * Interactive machine learning demonstration for waste categorization
 */

(function() {
    'use strict';

    // ==========================================
    // Configuration
    // ==========================================
    const config = {
        imageSize: 224,
        modelPath: null, // Using simulation for demo
        categories: {
            paper: {
                name: 'Paper/Cardboard',
                color: '#648fff',
                action: 'Separate and store in BLUE bin. Suitable for recycling.',
                recyclable: true,
                hazardous: false
            },
            plastic: {
                name: 'Plastic',
                color: '#ffb000',
                action: 'Check recycling symbol. Store in YELLOW bin if recyclable.',
                recyclable: true,
                hazardous: false
            },
            cardboard: {
                name: 'Cardboard',
                color: '#785ef0',
                action: 'Flatten and store in BLUE bin. High value recyclable.',
                recyclable: true,
                hazardous: false
            },
            hazardous: {
                name: 'Hazardous Medical Waste',
                color: '#fe6100',
                action: 'DO NOT HANDLE. Contact facility biohazard team immediately.',
                recyclable: false,
                hazardous: true
            },
            general: {
                name: 'General Non-Hazardous',
                color: '#22c1c3',
                action: 'Dispose in general waste bin. Not suitable for recycling.',
                recyclable: false,
                hazardous: false
            },
            glass: {
                name: 'Glass',
                color: '#dc267f',
                action: 'Handle with care. Store in GREEN bin for glass recycling.',
                recyclable: true,
                hazardous: false
            },
            metal: {
                name: 'Metal',
                color: '#94a3b8',
                action: 'Clean and store in METAL bin. Valuable recyclable material.',
                recyclable: true,
                hazardous: false
            }
        }
    };

    // ==========================================
    // DOM Elements
    // ==========================================
    let uploadArea, imageInput, outputPreview, outputResults;
    let categoryValue, confidenceBar, confidenceFill, confidenceValue, actionValue;
    let sampleButtons;
    let isModelLoaded = false;
    let model = null;

    // ==========================================
    // Initialize Elements
    // ==========================================
    function initElements() {
        uploadArea = document.getElementById('upload-area');
        imageInput = document.getElementById('image-input');
        outputPreview = document.getElementById('output-preview');
        outputResults = document.getElementById('output-results');

        if (outputResults) {
            categoryValue = outputResults.querySelector('.category-value');
            confidenceBar = outputResults.querySelector('.confidence-bar');
            confidenceFill = outputResults.querySelector('.confidence-fill');
            confidenceValue = outputResults.querySelector('.confidence-value');
            actionValue = outputResults.querySelector('.action-value');
        }

        sampleButtons = document.querySelectorAll('.sample-btn');
    }

    // ==========================================
    // Model Loading (Simulation)
    // ==========================================
    async function loadModel() {
        // Simulate model loading delay
        console.log('Initializing waste classification model...');

        return new Promise((resolve) => {
            setTimeout(() => {
                isModelLoaded = true;
                console.log('Model ready for inference');
                resolve(true);
            }, 1000);
        });
    }

    // ==========================================
    // Image Classification (Simulated for Demo)
    // ==========================================
    async function classifyImage(imageData, type = null) {
        if (!isModelLoaded) {
            await loadModel();
        }

        // Show loading state
        showLoadingState();

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1500));

        // If type is provided (from sample button), use it
        // Otherwise, simulate random classification
        let result;

        if (type && config.categories[type]) {
            result = {
                category: type,
                confidence: 0.85 + Math.random() * 0.14 // 85-99%
            };
        } else {
            // Simulate classification based on image analysis
            const categories = Object.keys(config.categories);
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            result = {
                category: randomCategory,
                confidence: 0.70 + Math.random() * 0.25 // 70-95%
            };
        }

        displayResults(result);
        return result;
    }

    // ==========================================
    // Display Functions
    // ==========================================
    function showLoadingState() {
        if (outputPreview) {
            outputPreview.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <span>Analyzing waste type...</span>
                </div>
            `;
        }

        // Add loading styles if not present
        addLoadingStyles();
    }

    function displayResults(result) {
        const categoryInfo = config.categories[result.category];
        const confidencePercent = Math.round(result.confidence * 100);

        // Update preview with result indicator
        if (outputPreview) {
            outputPreview.innerHTML = `
                <div class="result-indicator ${result.category}">
                    <div class="result-icon" style="background: ${categoryInfo.color}">
                        ${getIconForCategory(result.category)}
                    </div>
                    <span class="result-type">${categoryInfo.name}</span>
                    ${categoryInfo.hazardous ? '<span class="hazard-warning">⚠️ HAZARDOUS</span>' : ''}
                    ${categoryInfo.recyclable ? '<span class="recyclable-badge">♻️ Recyclable</span>' : ''}
                </div>
            `;
        }

        // Update results panel
        if (categoryValue) {
            categoryValue.textContent = categoryInfo.name;
            categoryValue.style.color = categoryInfo.color;
        }

        if (confidenceFill) {
            confidenceFill.style.width = `${confidencePercent}%`;
            confidenceFill.style.background = getConfidenceGradient(confidencePercent);
        }

        if (confidenceValue) {
            confidenceValue.textContent = `${confidencePercent}%`;
        }

        if (actionValue) {
            actionValue.textContent = categoryInfo.action;
            actionValue.style.color = categoryInfo.hazardous ? '#b45309' : '#1e293b';
        }

        // Add result styles
        addResultStyles();

        // Announce for screen readers
        if (window.announce) {
            window.announce(`Classification complete. ${categoryInfo.name} detected with ${confidencePercent}% confidence.`);
        }
    }

    function getIconForCategory(category) {
        const icons = {
            paper: '📄',
            plastic: '🧴',
            cardboard: '📦',
            hazardous: '☣️',
            general: '🗑️',
            glass: '🫙',
            metal: '🔩'
        };
        return icons[category] || '❓';
    }

    function getConfidenceGradient(percent) {
        if (percent >= 90) {
            return 'linear-gradient(90deg, #22c1c3, #1a7f94)';
        } else if (percent >= 70) {
            return 'linear-gradient(90deg, #ffb000, #e6a800)';
        } else {
            return 'linear-gradient(90deg, #fe6100, #b45309)';
        }
    }

    // ==========================================
    // Event Handlers
    // ==========================================
    function handleFileSelect(file) {
        if (!file || !file.type.startsWith('image/')) {
            showError('Please select a valid image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            showError('Image file must be less than 5MB');
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            // Display the uploaded image
            if (outputPreview) {
                outputPreview.innerHTML = `
                    <img src="${e.target.result}" alt="Uploaded waste image" class="preview-image">
                `;
            }

            // Classify the image
            classifyImage(e.target.result);
        };

        reader.onerror = () => {
            showError('Error reading file. Please try again.');
        };

        reader.readAsDataURL(file);
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.add('dragover');
    }

    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('dragover');
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('dragover');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    }

    function handleSampleClick(e) {
        const button = e.currentTarget;
        const type = button.dataset.type;

        // Show sample representation
        if (outputPreview) {
            outputPreview.innerHTML = `
                <div class="sample-preview">
                    <span class="sample-emoji">${button.querySelector('.sample-icon').textContent}</span>
                    <span>Analyzing ${type} sample...</span>
                </div>
            `;
        }

        // Classify with the specified type
        classifyImage(null, type);
    }

    function showError(message) {
        if (outputPreview) {
            outputPreview.innerHTML = `
                <div class="error-state">
                    <span class="error-icon">⚠️</span>
                    <span>${message}</span>
                </div>
            `;
        }
    }

    // ==========================================
    // Dynamic Styles
    // ==========================================
    function addLoadingStyles() {
        if (document.getElementById('ml-loading-styles')) return;

        const style = document.createElement('style');
        style.id = 'ml-loading-styles';
        style.textContent = `
            .loading-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
                color: #64748b;
            }

            .loading-spinner {
                width: 48px;
                height: 48px;
                border: 3px solid #e2e8f0;
                border-top-color: #1a7f94;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            .sample-preview {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }

            .sample-emoji {
                font-size: 64px;
            }

            .error-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                color: #b45309;
            }

            .error-icon {
                font-size: 48px;
            }
        `;
        document.head.appendChild(style);
    }

    function addResultStyles() {
        if (document.getElementById('ml-result-styles')) return;

        const style = document.createElement('style');
        style.id = 'ml-result-styles';
        style.textContent = `
            .result-indicator {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
                padding: 20px;
            }

            .result-icon {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 40px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .result-type {
                font-size: 18px;
                font-weight: 600;
                color: #1e293b;
            }

            .hazard-warning {
                background: #fef3c7;
                color: #b45309;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
            }

            .recyclable-badge {
                background: #d1fae5;
                color: #047857;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
            }

            .preview-image {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                border-radius: 8px;
            }
        `;
        document.head.appendChild(style);
    }

    // ==========================================
    // Real TensorFlow.js Implementation (Optional)
    // ==========================================
    async function loadRealModel() {
        // This would load an actual TensorFlow.js model
        // For production, you would train and host your own model

        try {
            // Example: Load MobileNet for transfer learning
            // model = await tf.loadLayersModel('path/to/model/model.json');

            // Or use pre-trained model
            // const mobilenet = await mobilenet.load();

            console.log('Real model would be loaded here');
            return true;
        } catch (error) {
            console.error('Error loading model:', error);
            return false;
        }
    }

    async function preprocessImage(imageElement) {
        // Convert image to tensor
        if (typeof tf === 'undefined') return null;

        return tf.tidy(() => {
            // Convert to tensor
            let tensor = tf.browser.fromPixels(imageElement);

            // Resize to model input size
            tensor = tf.image.resizeBilinear(tensor, [config.imageSize, config.imageSize]);

            // Normalize pixel values
            tensor = tensor.toFloat().div(tf.scalar(255));

            // Add batch dimension
            tensor = tensor.expandDims(0);

            return tensor;
        });
    }

    async function runInference(tensor) {
        if (!model || !tensor) return null;

        const predictions = await model.predict(tensor);
        const data = await predictions.data();

        // Get top prediction
        const maxIndex = data.indexOf(Math.max(...data));
        const categories = Object.keys(config.categories);

        return {
            category: categories[maxIndex] || 'general',
            confidence: data[maxIndex]
        };
    }

    // ==========================================
    // Interactive Training Simulation
    // ==========================================
    function createTrainingSimulation() {
        // This creates an interactive demo showing how the model learns
        const demoData = [
            { epoch: 1, loss: 2.5, accuracy: 0.25 },
            { epoch: 2, loss: 1.8, accuracy: 0.45 },
            { epoch: 3, loss: 1.2, accuracy: 0.62 },
            { epoch: 4, loss: 0.8, accuracy: 0.75 },
            { epoch: 5, loss: 0.5, accuracy: 0.85 },
            { epoch: 6, loss: 0.3, accuracy: 0.91 },
            { epoch: 7, loss: 0.2, accuracy: 0.94 },
            { epoch: 8, loss: 0.15, accuracy: 0.96 },
            { epoch: 9, loss: 0.1, accuracy: 0.97 },
            { epoch: 10, loss: 0.08, accuracy: 0.98 }
        ];

        return demoData;
    }

    // ==========================================
    // Initialize
    // ==========================================
    function init() {
        initElements();

        if (!uploadArea) {
            console.log('ML Demo elements not found');
            return;
        }

        // Set up event listeners
        uploadArea.addEventListener('click', () => {
            if (imageInput) imageInput.click();
        });

        if (imageInput) {
            imageInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                }
            });
        }

        // Drag and drop
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleDrop);

        // Sample buttons
        sampleButtons.forEach(btn => {
            btn.addEventListener('click', handleSampleClick);
        });

        // Prevent default drag behavior on document
        document.addEventListener('dragover', (e) => e.preventDefault());
        document.addEventListener('drop', (e) => e.preventDefault());

        // Load model in background
        loadModel();

        console.log('ML Demo initialized');
    }

    // Initialize on load
    document.addEventListener('mainInitialized', init);

    // Fallback
    if (document.readyState === 'complete') {
        setTimeout(init, 200);
    } else {
        window.addEventListener('load', () => setTimeout(init, 200));
    }

    // Export for other modules
    window.CleanHealth = window.CleanHealth || {};
    window.CleanHealth.ml = {
        config,
        classifyImage,
        loadModel
    };

})();
