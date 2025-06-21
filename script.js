// Global variables
let currentUser = null;
let selectedGiftType = '';
let selectedImage = '';
let sentGifts = [];

// Gift images for different categories
const giftImages = {
    birthday: [
        'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1857157/pexels-photo-1857157.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1729798/pexels-photo-1729798.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1729799/pexels-photo-1729799.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/264887/pexels-photo-264887.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1729800/pexels-photo-1729800.jpeg?auto=compress&cs=tinysrgb&w=300'
    ],
    crush: [
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1386605/pexels-photo-1386605.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1386606/pexels-photo-1386606.jpeg?auto=compress&cs=tinysrgb&w=300'
    ],
    confession: [
        'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1386605/pexels-photo-1386605.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1386606/pexels-photo-1386606.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=300'
    ],
    apology: [
        'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1386605/pexels-photo-1386605.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1024994/pexels-photo-1024994.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1386606/pexels-photo-1386606.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1024995/pexels-photo-1024995.jpeg?auto=compress&cs=tinysrgb&w=300'
    ],
    justbecause: [
        'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1857157/pexels-photo-1857157.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/264887/pexels-photo-264887.jpeg?auto=compress&cs=tinysrgb&w=300',
        'https://images.pexels.com/photos/1729798/pexels-photo-1729798.jpeg?auto=compress&cs=tinysrgb&w=300'
    ]
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    loadSentGifts();
    checkUserStatus();
    playBackgroundSound();
});

// Sound effects
function playSound(type) {
    // Create audio context for button clicks
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'click') {
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    } else if (type === 'success') {
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

function playBackgroundSound() {
    // Subtle background ambiance (optional)
    // This would typically load a gentle background track
}

// User management functions
function loadUserData() {
    const userData = localStorage.getItem('giftAppUser');
    if (userData) {
        currentUser = JSON.parse(userData);
    }
}

function loadSentGifts() {
    const gifts = localStorage.getItem('sentGifts');
    if (gifts) {
        sentGifts = JSON.parse(gifts);
    }
}

function saveUserData() {
    localStorage.setItem('giftAppUser', JSON.stringify(currentUser));
}

function saveSentGifts() {
    localStorage.setItem('sentGifts', JSON.stringify(sentGifts));
}

function checkUserStatus() {
    if (currentUser) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('signupForm').style.display = 'none';
        document.getElementById('userWelcome').style.display = 'block';
        document.getElementById('userName').textContent = currentUser.name;
    }
}

function showLogin() {
    playSound('click');
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function showSignup() {
    playSound('click');
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function login() {
    playSound('click');
    const name = document.getElementById('loginName').value.trim();
    const email = document.getElementById('loginEmail').value.trim();
    
    if (!name || !email) {
        alert('Please fill in all fields! 💕');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address! 📧');
        return;
    }
    
    currentUser = { name, email };
    saveUserData();
    checkUserStatus();
}

function signup() {
    playSound('click');
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    
    if (!name || !email) {
        alert('Please fill in all fields! 💕');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address! 📧');
        return;
    }
    
    currentUser = { name, email };
    saveUserData();
    checkUserStatus();
}

function logout() {
    playSound('click');
    currentUser = null;
    localStorage.removeItem('giftAppUser');
    document.getElementById('userWelcome').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function continueAsGuest() {
    playSound('click');
    goToGiftSelection();
}

function goToGiftSelection() {
    playSound('click');
    showPage('giftSelectionPage');
}

// Navigation functions
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function goBack(pageId) {
    playSound('click');
    showPage(pageId);
}

function goHome() {
    playSound('click');
    showPage('welcomePage');
}

// Gift selection functions
function selectGiftType(type) {
    playSound('click');
    selectedGiftType = type;
    loadGiftImages(type);
    showPage('customizationPage');
}

function loadGiftImages(type) {
    const imageGrid = document.getElementById('imageGrid');
    imageGrid.innerHTML = '';
    
    const images = giftImages[type] || giftImages.justbecause;
    
    images.forEach((imageUrl, index) => {
        const imageOption = document.createElement('div');
        imageOption.className = 'image-option';
        imageOption.onclick = () => selectImage(imageUrl, imageOption);
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Gift image ${index + 1}`;
        img.onerror = () => {
            // Fallback to a placeholder if image fails to load
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZiNmMxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmNjliNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkY08L3RleHQ+PC9zdmc+';
        };
        
        imageOption.appendChild(img);
        imageGrid.appendChild(imageOption);
    });
}

function selectImage(imageUrl, element) {
    playSound('click');
    // Remove previous selection
    document.querySelectorAll('.image-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked image
    element.classList.add('selected');
    selectedImage = imageUrl;
}

// Gift sending functions
function sendGift() {
    playSound('click');
    const recipientName = document.getElementById('recipientName').value.trim();
    const customMessage = document.getElementById('customMessage').value.trim();
    
    if (!recipientName) {
        alert('Please enter the recipient\'s name! 💝');
        return;
    }
    
    if (!customMessage) {
        alert('Please write a message! 💌');
        return;
    }
    
    if (!selectedImage) {
        alert('Please select an image! 📸');
        return;
    }
    
    const gift = {
        id: Date.now(),
        type: selectedGiftType,
        recipientName,
        message: customMessage,
        image: selectedImage,
        senderName: currentUser ? currentUser.name : 'Anonymous',
        dateSent: new Date().toLocaleDateString(),
        timestamp: new Date().toISOString()
    };
    
    sentGifts.unshift(gift);
    saveSentGifts();
    
    showGiftConfirmation(gift);
    playSound('success');
}

function showGiftConfirmation(gift) {
    const giftPreview = document.getElementById('giftPreview');
    giftPreview.innerHTML = `
        <img src="${gift.image}" alt="Gift image" class="preview-image">
        <div class="preview-details">
            <h3>To: ${gift.recipientName} 💕</h3>
            <p><strong>Message:</strong> ${gift.message}</p>
            <p><strong>From:</strong> ${gift.senderName}</p>
            <p><strong>Gift Type:</strong> ${formatGiftType(gift.type)}</p>
        </div>
    `;
    
    showPage('confirmationPage');
}

function formatGiftType(type) {
    const types = {
        birthday: 'Birthday Gift 🎂',
        crush: 'Crush Gift 💕',
        confession: 'Confession Gift 💌',
        apology: 'Apology Gift 🙏',
        justbecause: 'Just Because 🌟'
    };
    return types[type] || type;
}

// Sharing functions
function shareGift() {
    playSound('click');
    const lastGift = sentGifts[0];
    if (!lastGift) return;
    
    const shareText = `🎁 I just sent a beautiful ${formatGiftType(lastGift.type)} to ${lastGift.recipientName}! 💕\n\nMessage: "${lastGift.message}"\n\nSent with love using Gift Express! ✨`;
    
    // Try to use Web Share API if available
    if (navigator.share) {
        navigator.share({
            title: 'Gift Express - Love Shared!',
            text: shareText,
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback to Messenger sharing
        const messengerUrl = `https://m.me/share/?link=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
        window.open(messengerUrl, '_blank');
    }
}

function sendAnother() {
    playSound('click');
    // Reset form
    document.getElementById('recipientName').value = '';
    document.getElementById('customMessage').value = '';
    selectedImage = '';
    document.querySelectorAll('.image-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    showPage('giftSelectionPage');
}

// My Gifts functions
function showMyGifts() {
    playSound('click');
    const giftsContainer = document.getElementById('giftsContainer');
    
    if (sentGifts.length === 0) {
        giftsContainer.innerHTML = '<div class="no-gifts">No gifts sent yet! Start spreading some love! 💕</div>';
    } else {
        giftsContainer.innerHTML = sentGifts.map(gift => `
            <div class="gift-item">
                <img src="${gift.image}" alt="Gift" class="gift-item-image">
                <h4>To: ${gift.recipientName}</h4>
                <p><strong>Type:</strong> ${formatGiftType(gift.type)}</p>
                <p><strong>Message:</strong> ${gift.message.length > 100 ? gift.message.substring(0, 100) + '...' : gift.message}</p>
                <p><strong>From:</strong> ${gift.senderName}</p>
                <p class="gift-date">Sent on: ${gift.dateSent}</p>
            </div>
        `).join('');
    }
    
    showPage('myGiftsPage');
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add click sound to all buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button, .btn, .gift-card, .image-option, .link')) {
        playSound('click');
    }
});

// Add some Easter eggs
let clickCount = 0;
document.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 50) {
        alert('🎉 Wow! You really love clicking! Here\'s a virtual hug! 🤗');
    } else if (clickCount === 100) {
        alert('💖 You\'ve clicked 100 times! You must really love this app! 💖');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const currentPage = document.querySelector('.page.active');
        if (currentPage.id !== 'welcomePage') {
            goHome();
        }
    }
});

// Add some sparkle effects on hover
document.addEventListener('mouseover', function(e) {
    if (e.target.matches('.gift-card, .btn-primary')) {
        createSparkle(e.target);
    }
});

function createSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '20px';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
    sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0);
        }
    }
`;
document.head.appendChild(sparkleStyle);