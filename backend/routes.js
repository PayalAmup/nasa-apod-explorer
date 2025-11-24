const express = require('express');
const axios = require('axios');

function createRoutes({ cache, nasaApiKey }) {
  const router = express.Router();
  const NASA_BASE = 'https://api.nasa.gov/planetary/apod';

  async function fetchApod(params) {
    const key = JSON.stringify(params);
    const cached = cache.get(key);
    if (cached) return cached;

    const query = { ...params, api_key: nasaApiKey };
    const resp = await axios.get(NASA_BASE, { params: query, timeout: 10000 });
    cache.set(key, resp.data);
    return resp.data;
  }

  router.get('/today', async (req, res) => {
    try {
      const data = await fetchApod({});
      res.json(data);
    } catch (err) {
      console.error('APOD /today error', err.message || err);
      res.status(502).json({ error: 'Failed to fetch APOD' });
    }
  });

  router.get('/date', async (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'date query required (YYYY-MM-DD)' });
    try {
      const data = await fetchApod({ date });
      res.json(data);
    } catch (err) {
      console.error('APOD /date error', err.message || err);
      res.status(502).json({ error: 'Failed to fetch APOD for date' });
    }
  });

  router.get('/range', async (req, res) => {
    const { start, end } = req.query;
    if (!start || !end) return res.status(400).json({ error: 'start and end query params required' });

    try {
      const keyObj = { start, end };
      const key = JSON.stringify(keyObj);
      const cached = cache.get(key);
      if (cached) return res.json(cached);

      const resp = await axios.get(NASA_BASE, {
        params: { start_date: start, end_date: end, api_key: nasaApiKey },
        timeout: 15000,
      });
      cache.set(key, resp.data);
      res.json(resp.data);
    } catch (err) {
      console.error('APOD /range error', err.message || err);
      res.status(502).json({ error: 'Failed to fetch APOD range' });
    }
  });

  router.get('/health', (req, res) => res.json({ ok: true, cacheSize: cache.size() }));

  return router;
}

module.exports = createRoutes;
