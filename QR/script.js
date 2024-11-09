// تعريف العناصر
const generateQRBtn = document.getElementById('generateQRBtn');
const qrData = document.getElementById('qrData');
const qrCodeContainer = document.getElementById('qrCodeContainer');
const qrLinkContainer = document.getElementById('qrLinkContainer');
const qrLink = document.getElementById('qrLink');

// عند النقر على زر توليد رمز QR
generateQRBtn.addEventListener('click', () => {
    const data = qrData.value.trim();
    
    if (data) {
        // استدعاء الـ API مع البيانات
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`;
        
        // إنشاء صورة رمز QR وإضافتها إلى الصفحة
        qrCodeContainer.innerHTML = `<img src="${qrUrl}" alt="QR Code">`;
        
        // إعداد الرابط أسفل رمز QR
        qrLinkContainer.style.display = 'block';
        qrLink.href = qrUrl;
        qrLink.textContent = qrUrl;
    } else {
        alert('يرجى إدخال بيانات لتوليد رمز QR');
    }
});
