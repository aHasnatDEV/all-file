const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get('/flight-info', async (req, res) => {
  const id = req.query.id;

  try {
    const response = await axios.get(`http://api.aviationstack.com/v1/flights?access_key=8b467f2f04cf84ee1130d305855995a5&flight_iata=${id}`);
    res.send(response.data);
    // console.log(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
