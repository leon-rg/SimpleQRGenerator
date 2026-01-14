# 🏭 QRCodeGen

A small, client-side QR code generator built with plain HTML, CSS and JavaScript.

## Description

This project generates QR codes in the browser using the `qrcodejs` library (loaded from CDN). Users can choose content type (text, URL, email, phone), size, foreground and background colors, and toggle a light/dark theme. Generated codes can be downloaded as PNG.

## Files

- `main.html` — Main HTML page (loads `style.css`, `script.js`, and the QR library).
- `style.css` — Styles for layout, responsive rules, theme and color pickers.
- `script.js` — JavaScript logic: theme handling, QR generation and download.

## How to use

1. Open `main.html` in your browser (double-click or open via a static server).

   To run a simple local server (recommended):

   ```bash
   python -m http.server 8000
   # then open http://localhost:8000/main.html
   ```

2. Select the content type and enter the content in the textarea.
3. Choose the size and colors (foreground/background).
4. Click "Generate QR Code" to create the QR code.
5. Use "Download QR" to save the image as a PNG.
6. Toggle the theme using the moon/sun button in the header; theme is persisted in `localStorage`.

## Customization

- Change default color variables and layout spacing in `style.css`.
- Modify QR generation options (default size, error correction) in `script.js` inside the `generateQR()` function.
- The QR library is included via CDN in `main.html`. Replace the `<script>` tag if you prefer a local copy or a different library.

## Notes & Compatibility

- The color input appearance may vary between browsers; styles in `style.css` try to normalize swatches and remove borders.
- Works offline once files are local, except for the CDN script; to run fully offline, download `qrcode.min.js` and reference it locally.
- For best results, use a modern browser (Chrome, Edge, Firefox, Safari).

## Troubleshooting

- If the QR doesn't generate, check the browser console for errors and ensure the QR library is loaded.
- If download doesn't work on some browsers, right-click the generated canvas and choose "Save image as..." or serve the page over HTTP instead of `file://`.