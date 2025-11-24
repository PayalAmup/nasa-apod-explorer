import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Gallery from './components/Gallery';
import DetailView from './components/DetailView';
import DatePickerView from './components/DatePickerView';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export default function App() {
  const [today, setToday] = useState(null);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchToday() {
      setLoading(true);
      try {
        const r = await axios.get(`${API_BASE}/today`);
        setToday(r.data);
        setSelected(r.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchToday();
  }, []);

  const fetchRange = async (start, end) => {
    setLoading(true);
    try {
      const r = await axios.get(`${API_BASE}/range`, { params: { start, end } });
      setItems(Array.isArray(r.data) ? r.data.slice().reverse() : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchDate = async (date) => {
    setLoading(true);
    try {
      const r = await axios.get(`${API_BASE}/date`, { params: { date } });
      setSelected(r.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>NASA APOD Explorer</h1>
        <p className="subtitle">Astronomy Picture of the Day — browse, search and enjoy</p>
      </header>

      <main className="container">
        <section className="left">
          <div className="card">
            <h2>Today's APOD</h2>
            {loading && !today ? <p>Loading...</p> : today ? (
              <div onClick={() => setSelected(today)} style={{ cursor: 'pointer' }}>
                <h3>{today.title}</h3>
                <img src={today.url} alt={today.title} className="thumb" />
                <p className="meta">{today.date} • {today.media_type}</p>
              </div>
            ) : <p>Unable to load today's APOD.</p>}

            <DatePickerView onRange={fetchRange} onDate={fetchDate} />
          </div>

          <Gallery items={items} onSelect={(it) => setSelected(it)} />
        </section>

        <aside className="right">
          <DetailView item={selected} />
        </aside>
      </main>

      <footer className="footer">Built for demo — data from NASA APOD API</footer>
    </div>
  );
}
