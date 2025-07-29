// Image Protection Script for Charulatha's Website

document.addEventListener('DOMContentLoaded', function() {
    initImageProtection();
    initRightClickProtection();
    initKeyboardProtection();
    initDragDropProtection();
    initDevToolsDetection();
});

// Main image protection function
function initImageProtection() {
    // Disable right-click on all images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showProtectionMessage();
            return false;
        });

        // Disable drag and drop
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });

        // Add protection attributes
        img.setAttribute('oncontextmenu', 'return false;');
        img.setAttribute('onselectstart', 'return false;');
        img.setAttribute('ondragstart', 'return false;');
        img.style.userSelect = 'none';
        img.style.webkitUserSelect = 'none';
        img.style.mozUserSelect = 'none';
        img.style.msUserSelect = 'none';

        // Add CSS pointer events
        img.style.pointerEvents = 'none';
        
        // Re-enable pointer events for gallery functionality but maintain protection
        if (img.closest('.photo-scroll') || img.closest('.gallery-grid')) {
            img.style.pointerEvents = 'auto';
        }
    });

    // Protect gallery items specifically
    protectGalleryImages();
}

// Comprehensive right-click protection
function initRightClickProtection() {
    // Disable right-click on the entire document
    document.addEventListener('contextmenu', function(e) {
        // Allow right-click on form elements
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return true;
        }
        
        e.preventDefault();
        showProtectionMessage();
        return false;
    });

    // Disable text selection on images and galleries
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName === 'IMG' || 
            e.target.closest('.photo-scroll') || 
            e.target.closest('.gallery-grid') ||
            e.target.closest('.gallery-item')) {
            e.preventDefault();
            return false;
        }
    });
}

// Keyboard shortcuts protection
function initKeyboardProtection() {
    document.addEventListener('keydown', function(e) {
        // Disable F12 (Developer Tools)
        if (e.keyCode === 123) {
            e.preventDefault();
            showProtectionMessage();
            return false;
        }

        // Disable Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            showProtectionMessage();
            return false;
        }

        // Disable Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            showProtectionMessage();
            return false;
        }

        // Disable Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            showProtectionMessage();
            return false;
        }

        // Disable Ctrl+S (Save Page)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            showProtectionMessage();
            return false;
        }

        // Disable Ctrl+A (Select All) on images
        if (e.ctrlKey && e.keyCode === 65) {
            const activeElement = document.activeElement;
            if (activeElement.tagName === 'IMG' || 
                activeElement.closest('.photo-scroll') || 
                activeElement.closest('.gallery-grid')) {
                e.preventDefault();
                return false;
            }
        }

        // Disable Ctrl+P (Print)
        if (e.ctrlKey && e.keyCode === 80) {
            e.preventDefault();
            showProtectionMessage();
            return false;
        }

        // Disable Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            showProtectionMessage();
            return false;
        }
    });
}

// Drag and drop protection
function initDragDropProtection() {
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    document.addEventListener('drop', function(e) {
        e.preventDefault();
        return false;
    });

    document.addEventListener('dragover', function(e) {
        e.preventDefault();
        return false;
    });
}

// Developer tools detection (basic)
function initDevToolsDetection() {
    let devtools = false;
    
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > 200 || 
            window.outerWidth - window.innerWidth > 200) {
            if (!devtools) {
                devtools = true;
                showDevToolsWarning();
            }
        } else {
            devtools = false;
        }
    }, 500);

    // Detect console usage
    let devToolsOpen = false;
    const threshold = 160;

    setInterval(function() {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                console.clear();
                console.log('%cContent Protection Active', 'color: red; font-size: 20px; font-weight: bold;');
                console.log('%cThis website\'s content is protected by copyright.', 'color: red; font-size: 14px;');
            }
        } else {
            devToolsOpen = false;
        }
    }, 1000);
}

// Protect gallery images with overlay
function protectGalleryImages() {
    // Add invisible overlay to photo gallery
    const photoScroll = document.getElementById('photoScroll');
    if (photoScroll) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            pointer-events: none;
            background: transparent;
        `;
        
        // Make photo container relative if not already
        if (getComputedStyle(photoScroll).position === 'static') {
            photoScroll.style.position = 'relative';
        }
        
        photoScroll.appendChild(overlay);
    }

    // Protect gallery grid items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showProtectionMessage();
            return false;
        });
    });
}

// Show protection message
function showProtectionMessage() {
    // Check if message already exists
    if (document.getElementById('protection-message')) {
        return;
    }

    const message = document.createElement('div');
    message.id = 'protection-message';
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(139, 69, 19, 0.95);
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            text-align: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 400px;
            border: 2px solid #d4af37;
        ">
            <h3 style="margin: 0 0 10px 0; color: #d4af37;">🎵 Content Protected</h3>
            <p style="margin: 0; line-height: 1.5;">
                This content is protected by copyright.<br>
                Charulatha's artistic work is preserved for viewing only.
            </p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #d4af37;
                color: #8b4513;
                border: none;
                padding: 8px 20px;
                border-radius: 5px;
                margin-top: 15px;
                cursor: pointer;
                font-weight: bold;
            ">OK</button>
        </div>
    `;

    document.body.appendChild(message);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        const msg = document.getElementById('protection-message');
        if (msg) {
            msg.remove();
        }
    }, 3000);
}

// Show developer tools warning
function showDevToolsWarning() {
    console.clear();
    console.log('%c⚠️ DEVELOPER TOOLS DETECTED ⚠️', 'color: red; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
    console.log('%cThis website\'s content is protected by copyright law.', 'color: red; font-size: 16px; font-weight: bold;');
    console.log('%cCharulatha\'s artistic work and images are intellectual property.', 'color: orange; font-size: 14px;');
    console.log('%cUnauthorized downloading or copying is prohibited.', 'color: orange; font-size: 14px;');
    console.log('%c🎵 Please respect the artist\'s rights 🎵', 'color: #d4af37; font-size: 16px; font-weight: bold;');
}

// Additional CSS injection for protection
function injectProtectionCSS() {
    const style = document.createElement('style');
    style.textContent = `
        /* Disable text selection on images and galleries */
        img, .photo-scroll, .gallery-grid, .gallery-item {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
            -webkit-tap-highlight-color: transparent !important;
        }

        /* Disable image drag */
        img {
            -webkit-user-drag: none !important;
            -khtml-user-drag: none !important;
            -moz-user-drag: none !important;
            -o-user-drag: none !important;
            user-drag: none !important;
        }

        /* Hide images when printing */
        @media print {
            img, .photo-scroll, .gallery-grid {
                display: none !important;
            }
        }

        /* Disable selection highlighting */
        ::selection {
            background: transparent;
        }

        ::-moz-selection {
            background: transparent;
        }
    `;
    document.head.appendChild(style);
}

// Initialize protection CSS
injectProtectionCSS();

// Blur images when window loses focus (additional protection)
window.addEventListener('blur', function() {
    document.querySelectorAll('img').forEach(img => {
        img.style.filter = 'blur(5px)';
    });
});

window.addEventListener('focus', function() {
    document.querySelectorAll('img').forEach(img => {
        img.style.filter = 'none';
    });
});

// Console message for legitimate users
console.log('%c🎵 Welcome to Charulatha\'s Website! 🎵', 'color: #d4af37; font-size: 18px; font-weight: bold;');
console.log('%cThis website showcases the beautiful art of Veena music.', 'color: #8b4513; font-size: 14px;');
console.log('%cAll content is protected by copyright. Please respect the artist\'s work!', 'color: #8b4513; font-size: 12px;');
