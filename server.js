const express = require('express');
const cors = require('cors');
const { sendTelegramMessage } = require('./config/telegram');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoint untuk menerima data dari website
app.post('/api/send-telegram', async (req, res) => {
    try {
        const success = await sendTelegramMessage(req.body);
        if (success) {
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false, error: 'Failed to send message' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});