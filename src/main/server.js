const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3001;

app.get('/api/market/:item/orders', async (req, res) => {
    const item = req.params.item;
    const url = `https://api.warframe.market/v1/items/${item}/orders`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));