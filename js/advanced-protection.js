// Advanced Image Protection - Canvas Watermarking and Security

document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for images to load
    setTimeout(() => {
        initAdvancedImageProtection();
        replaceImagesWithCanvas();
    }, 1000);
});

// Advanced image protection with canvas replacement
function initAdvancedImageProtection() {
    // Disable F12 and other shortcuts more aggressively
    document.addEventListener('keydown', function(e) {
        // Comprehensive keyboard protection
        const forbiddenKeys = [
            { key: 123 }, // F12
            { ctrl: true, shift: true, key: 73 }, // Ctrl+Shift+I
            { ctrl: true, shift: true, key: 67 }, // Ctrl+Shift+C
            { ctrl: true, shift: true, key: 74 }, // Ctrl+Shift+J
            { ctrl: true, key: 85 }, // Ctrl+U
            { ctrl: true, key: 83 }, // Ctrl+S
            { key: 117 }, // F6
            { ctrl: true, key: 80 } // Ctrl+P
        ];

        const isMatch = forbiddenKeys.some(combo => {
            if (combo.key && e.keyCode === combo.key) {
                if (combo.ctrl && !e.ctrlKey) return false;
                if (combo.shift && !e.shiftKey) return false;
                if (!combo.ctrl && !combo.shift) return true;
                return (combo.ctrl ? e.ctrlKey : true) && (combo.shift ? e.shiftKey : true);
            }
            return false;
        });

        if (isMatch) {
            e.preventDefault();
            e.stopPropagation();
            showAdvancedProtectionMessage();
            return false;
        }
    });

    // Enhanced right-click protection
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showAdvancedProtectionMessage();
        return false;
    }, true);

    // Prevent image selection and dragging
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName === 'IMG' || 
            e.target.closest('.photo-scroll') || 
            e.target.closest('.gallery-grid')) {
            e.preventDefault();
            return false;
        }
    });

    // Disable copy functionality
    document.addEventListener('copy', function(e) {
        const selection = window.getSelection().toString();
        if (selection.length > 0) {
            e.clipboardData.setData('text/plain', 'Content protected by copyright - Charulatha Veena Artist');
            e.preventDefault();
        }
    });
}

// Replace images with canvas (makes saving much harder)
function replaceImagesWithCanvas() {
    const images = document.querySelectorAll('.photo-scroll img, .gallery-grid img');
    
    images.forEach(img => {
        if (img.complete && img.naturalWidth > 0) {
            convertImageToProtectedCanvas(img);
        } else {
            img.addEventListener('load', function() {
                convertImageToProtectedCanvas(this);
            });
        }
    });
}

// Convert image to canvas with watermark
function convertImageToProtectedCanvas(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match image
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    
    // Apply same styling as original image
    canvas.style.cssText = img.style.cssText;
    canvas.className = img.className;
    canvas.alt = img.alt;
    
    // Draw the original image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Add watermark
    addWatermarkToCanvas(ctx, canvas.width, canvas.height);
    
    // Add protection attributes
    canvas.setAttribute('oncontextmenu', 'return false;');
    canvas.setAttribute('onselectstart', 'return false;');
    canvas.setAttribute('ondragstart', 'return false;');
    canvas.style.userSelect = 'none';
    canvas.style.webkitUserSelect = 'none';
    canvas.style.pointerEvents = 'none';
    
    // Add event listeners for protection
    canvas.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showAdvancedProtectionMessage();
        return false;
    });
    
    canvas.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Replace the image with canvas
    img.parentNode.replaceChild(canvas, img);
}

// Add watermark to canvas
function addWatermarkToCanvas(ctx, width, height) {
    ctx.save();
    
    // Semi-transparent watermark
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = '#8b4513';
    ctx.font = `${Math.max(width/20, 16)}px Dancing Script, cursive`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add multiple watermarks across the image
    const watermarkText = '© Charulatha Veena';
    const spacing = Math.min(width, height) / 3;
    
    for (let x = spacing/2; x < width; x += spacing) {
        for (let y = spacing/2; y < height; y += spacing) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(-Math.PI / 6); // Rotate watermark
            ctx.fillText(watermarkText, 0, 0);
            ctx.restore();
        }
    }
    
    // Add border watermark
    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = Math.max(width/200, 2);
    ctx.strokeRect(0, 0, width, height);
    
    ctx.restore();
}

// Advanced protection message
function showAdvancedProtectionMessage() {
    if (document.getElementById('advanced-protection-message')) {
        return;
    }

    const messageContainer = document.createElement('div');
    messageContainer.id = 'advanced-protection-message';
    messageContainer.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
        ">
            <div style="
                background: linear-gradient(135deg, #8b4513, #d4af37);
                color: white;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                text-align: center;
                font-family: 'Dancing Script', cursive;
                max-width: 500px;
                border: 3px solid #f4e4c1;
                animation: protectionPulse 2s ease-in-out infinite;
            ">
                <div style="font-size: 4rem; margin-bottom: 20px;">🎵</div>
                <h2 style="margin: 0 0 20px 0; color: #f4e4c1; font-size: 2rem;">Content Protected</h2>
                <p style="margin: 0 0 15px 0; line-height: 1.6; font-size: 1.2rem;">
                    This artistic content belongs to <strong>Charulatha</strong><br>
                    and is protected by copyright law.
                </p>
                <p style="margin: 0 0 25px 0; color: #f4e4c1; font-size: 1rem;">
                    Please respect the artist's intellectual property rights.
                </p>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                    background: #f4e4c1;
                    color: #8b4513;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 1.1rem;
                    font-family: 'Dancing Script', cursive;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    I Understand
                </button>
            </div>
        </div>
        <style>
            @keyframes protectionPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
        </style>
    `;

    document.body.appendChild(messageContainer);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        const msg = document.getElementById('advanced-protection-message');
        if (msg) {
            msg.remove();
        }
    }, 5000);
}

// Console protection and warnings
(function() {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    
    console.log = function(...args) {
        originalLog.apply(console, ['%c🎵 Charulatha Website - Content Protected 🎵', 'color: #d4af37; font-weight: bold;']);
        return originalLog.apply(console, args);
    };

    // Disable common console methods that might be used for inspection
    console.clear();
    
    const protectionMessage = [
        '%c🚫 CONTENT PROTECTION ACTIVE 🚫',
        'color: red; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);',
        '\n%cThis website contains copyrighted artistic content.',
        'color: orange; font-size: 14px; font-weight: bold;',
        '\n%cCharulatha\'s musical performances and images are intellectual property.',
        'color: orange; font-size: 12px;',
        '\n%cUnauthorized downloading, copying, or distribution is prohibited by law.',
        'color: red; font-size: 12px; font-weight: bold;',
        '\n%c🎵 Please support the artist by respecting these rights 🎵',
        'color: #d4af37; font-size: 14px; font-weight: bold;'
    ];
    
    console.log(protectionMessage[0], protectionMessage[1]);
    console.log(protectionMessage[2], protectionMessage[3]);
    console.log(protectionMessage[4], protectionMessage[5]);
    console.log(protectionMessage[6], protectionMessage[7]);
    console.log(protectionMessage[8], protectionMessage[9]);
})();

// Detect screen recording/screenshot attempts (limited detection)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Blur images when tab is not visible
        document.querySelectorAll('canvas, img').forEach(element => {
            element.style.filter = 'blur(10px)';
            element.style.opacity = '0.3';
        });
    } else {
        // Restore images when tab becomes visible
        setTimeout(() => {
            document.querySelectorAll('canvas, img').forEach(element => {
                element.style.filter = 'none';
                element.style.opacity = '1';
            });
        }, 200);
    }
});

// Disable common image extraction methods
window.addEventListener('beforeunload', function() {
    // Clear any cached images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    });
});

// Mobile touch protection
document.addEventListener('touchstart', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'CANVAS') {
        e.preventDefault();
    }
});

document.addEventListener('touchmove', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'CANVAS') {
        e.preventDefault();
    }
});

// Protection against common scraping tools
Object.defineProperty(document, 'images', {
    get: function() {
        console.warn('Image access detected - Content is protected');
        return [];
    }
});

console.log('%c✅ Advanced Image Protection Loaded', 'color: green; font-weight: bold;');
