import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <h1 style={{ fontSize: '3rem', margin: 0, background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        ¡Template Listo! 🚀
      </h1>
      <p style={{ color: '#94a3b8', fontSize: '1.2rem', margin: 0 }}>
        React + TypeScript + Vite están funcionando correctamente.
      </p>
      <button 
        onClick={() => setCount((c) => c + 1)}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: '600',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
      >
        Clicks: {count}
      </button>
    </div>
  );
}

export default App;
