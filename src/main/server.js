import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 3001;

app.get('/api/market/:item/orders', async (req, res) => {
  const { item } = req.params;
  const targetUrl = `https://api.warframe.market/v1/items/${item}/orders`;

  try {
    const response = await axios.get(targetUrl);
    res.json(response.data);
  } catch (err) {
    console.error('Error in proxy:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export function startServer() {
  app.listen(PORT, () => {
    console.log(`✅ Express proxy server running at http://localhost:${PORT}`);
  });
}
