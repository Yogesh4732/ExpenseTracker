import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PnLDisplay = ({ token, refresh }) => {
  const [pnl, setPnl] = useState(null);

  useEffect(() => {
    axios.get('/api/pnl', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setPnl(res.data.totalPnL);
    }).catch(() => setPnl(null));
  }, [token, refresh]);

  const getPnLStyle = () => {
    if (pnl === null) return { color: '#888' };
    if (pnl > 0) return { color: '#2ecc40', fontWeight: 'bold', fontSize: '2rem', background: '#eafbe7', borderRadius: '8px', padding: '12px 24px', boxShadow: '0 2px 8px rgba(46,204,64,0.1)' };
    if (pnl < 0) return { color: '#ff4136', fontWeight: 'bold', fontSize: '2rem', background: '#fdeaea', borderRadius: '8px', padding: '12px 24px', boxShadow: '0 2px 8px rgba(255,65,54,0.1)' };
    return {};
  };
  return (
    <div className="pnl-card" style={{ textAlign: 'center', margin: '32px auto', maxWidth: '320px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: '24px' }}>
      <h4 style={{ marginBottom: '18px', fontSize: '1.3rem', color: '#333', letterSpacing: '1px' }}>Total PnL</h4>
      <div style={getPnLStyle()}>
        {pnl !== null ? (pnl >= 0 ? `+${pnl}` : `${pnl}`) : 'N/A'}
      </div>
    </div>
  );
};

export default PnLDisplay;
