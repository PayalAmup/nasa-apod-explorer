import React from 'react';

export default function DetailView({ item }) {
  if (!item) return <div className="card">Select an item to see details</div>;

  return (
    <div className="card detail">
      <h2>{item.title}</h2>
      <p className="meta">{item.date} • {item.media_type} {item.copyright ? `• © ${item.copyright}` : ''}</p>
      {item.media_type === 'image' ? (
        <img src={item.hdurl || item.url} alt={item.title} className="detail-img" />
      ) : (
        <iframe title={item.title} src={item.url} frameBorder="0" allowFullScreen className="detail-img" />
      )}
      <p className="explanation">{item.explanation}</p>
    </div>
  );
}
