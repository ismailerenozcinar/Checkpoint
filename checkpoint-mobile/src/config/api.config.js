// Ortama göre API host'u seç:
//   Web (browser, aynı bilgisayar) → 'localhost'
//   Expo Go (fiziksel cihaz, WiFi/Ethernet)  → bilgisayarın Ethernet IP'si (ipconfig'den bak)
//   Android Emülatör                → '10.0.2.2'

// Şu an hangi ortamda test ediyorsan onu aç, diğerini yorum satırı yap:
export const API_HOST = 'localhost';          // web testi
// export const API_HOST = '192.168.1.11';   // fiziksel cihaz

export const API_PORT = 5000;
export const API_BASE_URL = `http://${API_HOST}:${API_PORT}/api`;
