let qrcode = null;
let currentLang = 'en';

const translations = {
    en: {
        title: 'QR Code Generator',
        appTitle: 'QR Generator',
        themeToggleLabel: 'Toggle theme',
        targetDisplay: 'Create your custom QR code',
        labelQrType: 'Content type',
        optTypeText: 'Text',
        optTypeUrl: 'URL',
        optTypeEmail: 'Email',
        optTypePhone: 'Phone',
        labelQrInput: 'Content',
        placeholder: 'Type here...',
        labelSize: 'Size',
        sizeSmall: 'Small',
        sizeMed: 'Medium',
        sizeLarge: 'Large',
        labelQrColor: 'QR',
        labelQrBg: 'Background',
        btnGenerate: 'Generate QR Code',
        btnDownload: 'Download QR',
        info: '💡 Scan with your phone camera',
        alerts: {
            noContent: 'Please enter some content',
            noCanvas: 'Generate a QR code first'
        },
        downloadFilename: 'qr-code.png'
    },
    es: {
        title: 'Generador de Códigos QR',
        appTitle: 'Generador QR',
        themeToggleLabel: 'Cambiar tema',
        targetDisplay: 'Crea tu código QR personalizado',
        labelQrType: 'Tipo de contenido',
        optTypeText: 'Texto',
        optTypeUrl: 'URL',
        optTypeEmail: 'Email',
        optTypePhone: 'Teléfono',
        labelQrInput: 'Contenido',
        placeholder: 'Escribe aquí...',
        labelSize: 'Tamaño',
        sizeSmall: 'Pequeño',
        sizeMed: 'Mediano',
        sizeLarge: 'Grande',
        labelQrColor: 'QR',
        labelQrBg: 'Fondo',
        btnGenerate: 'Generar código QR',
        btnDownload: 'Descargar QR',
        info: '💡 Escanea con la cámara de tu móvil',
        alerts: {
            noContent: 'Por favor ingresa algún contenido',
            noCanvas: 'Primero genera un código QR'
        },
        downloadFilename: 'codigo-qr.png'
    }
};

function applyTranslations(lang) {
    if (!translations[lang]) lang = 'en';
    currentLang = lang;
    document.documentElement.lang = lang;
    document.title = translations[lang].title;

    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    setText('app-title', translations[lang].appTitle);
    setText('target-display', translations[lang].targetDisplay);
    setText('label-qr-type', translations[lang].labelQrType);
    setText('opt-type-text', translations[lang].optTypeText);
    setText('opt-type-url', translations[lang].optTypeUrl);
    setText('opt-type-email', translations[lang].optTypeEmail);
    setText('opt-type-phone', translations[lang].optTypePhone);
    setText('label-qr-input', translations[lang].labelQrInput);

    const input = document.getElementById('qr-input');
    if (input) input.placeholder = translations[lang].placeholder;

    setText('label-size', translations[lang].labelSize);
    setText('opt-size-small', translations[lang].sizeSmall);
    setText('opt-size-med', translations[lang].sizeMed);
    setText('opt-size-large', translations[lang].sizeLarge);

    setText('label-qr-color', translations[lang].labelQrColor);
    setText('label-qr-bg', translations[lang].labelQrBg);
    setText('btn-generate', translations[lang].btnGenerate);
    setText('download-btn', translations[lang].btnDownload);
    setText('info-text', translations[lang].info);

    const themeBtn = document.getElementById('btn-theme');
    if (themeBtn) themeBtn.setAttribute('aria-label', translations[lang].themeToggleLabel);
}

function detectLanguage() {
    const nav = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
    return nav.toLowerCase().startsWith('es') ? 'es' : 'en';
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const btn = document.getElementById('btn-theme');
    if (btn) btn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const btn = document.getElementById('btn-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (btn) btn.textContent = '☀️';
    } else {
        if (btn) btn.textContent = '🌙';
    }
}

function updateColorValue(id) {
    const colorInput = document.getElementById(id);
    const colorValue = document.getElementById(id + '-value');
    if (colorInput && colorValue) colorValue.textContent = colorInput.value.toUpperCase();
}

function generateQR() {
    const inputVal = document.getElementById('qr-input');
    const input = inputVal ? inputVal.value.trim() : '';
    const typeEl = document.getElementById('qr-type');
    const type = typeEl ? typeEl.value : 'text';
    const size = parseInt(document.getElementById('qr-size').value);
    const color = document.getElementById('qr-color').value;
    const bgColor = document.getElementById('qr-bg').value;

    if (!input) {
        alert(translations[currentLang].alerts.noContent);
        return;
    }

    let qrContent = input;
    if (type === 'url' && !input.startsWith('http://') && !input.startsWith('https://')) {
        qrContent = 'https://' + input;
    } else if (type === 'email') {
        qrContent = 'mailto:' + input;
    } else if (type === 'phone') {
        qrContent = 'tel:' + input;
    }

    const qrcodeContainer = document.getElementById('qrcode');
    if (!qrcodeContainer) return;
    qrcodeContainer.innerHTML = '';

    qrcode = new QRCode(qrcodeContainer, {
        text: qrContent,
        width: size,
        height: size,
        colorDark: color,
        colorLight: bgColor,
        correctLevel: QRCode.CorrectLevel.H
    });

    const dl = document.getElementById('download-btn');
    if (dl) dl.style.display = 'block';
}

function downloadQR() {
    const canvas = document.querySelector('#qrcode canvas');
    if (!canvas) {
        alert(translations[currentLang].alerts.noCanvas);
        return;
    }

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = translations[currentLang].downloadFilename;
    link.href = url;
    link.click();
}

const qrInputEl = document.getElementById('qr-input');
if (qrInputEl) {
    qrInputEl.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            generateQR();
        }
    });
}

// Initialize language and theme
const userLang = detectLanguage();
applyTranslations(userLang);
loadTheme();
