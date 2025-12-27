'use client';

export default function MaintenancePage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Sora, sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '600px',
        padding: '60px 40px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          fontSize: '80px',
          marginBottom: '30px',
          color: '#34aa54'
        }}>
          🔧
        </div>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '20px',
          fontFamily: 'Marcellus, serif'
        }}>
          Under Maintenance
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#6c757d',
          lineHeight: '1.6',
          marginBottom: '30px'
        }}>
          We're currently performing some scheduled maintenance to improve your experience. 
          We'll be back online shortly.
        </p>
        <div style={{
          width: '100px',
          height: '4px',
          backgroundColor: '#34aa54',
          margin: '0 auto',
          borderRadius: '2px'
        }}></div>
        <p style={{
          fontSize: '14px',
          color: '#adb5bd',
          marginTop: '40px'
        }}>
          Thank you for your patience
        </p>
      </div>
    </div>
  );
}
 
 