import React from 'react';

export default function Gallery({ items = [], onSelect }) {
  if (!items || items.length === 0) return <div className="card">No results. Select a range to load a gallery.</div>;

  return (
    <div className="gallery card">
      <h3>Gallery</h3>
      <div className="grid">
        {items.map((it) => (
          <div className="grid-item" key={it.date} onClick={() => onSelect(it)}>
            <img src={it.url} alt={it.title} />
            <div className="caption">{it.date} — {it.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
