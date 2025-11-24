require('dotenv').config();
const express = require('express');
const cors = require('cors');
const createCache = require('./apodCache');
const createRoutes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const nasaApiKey = process.env.NASA_API_KEY || 'DEMO_KEY';

const cache = createCache();
const routes = createRoutes({ cache, nasaApiKey });

app.use('/api', routes);

app.get('/', (req, res) => res.json({ hello: 'NASA APOD Explorer API', docs: '/api' }));

app.listen(PORT, () => console.log(`APOD backend running on http://localhost:${PORT}`));
