import React, { useState } from 'react';

export default function PersonalizationMenu({ isOpen, onClose, anchorPosition }) {
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('medium');

  const themes = [
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'auto', label: 'Auto', icon: '🔄' }
  ];

  const fontSizes = [
    { value: 'small', label: 'Small', size: '12px' },
    { value: 'medium', label: 'Medium', size: '14px' },
    { value: 'large', label: 'Large', size: '16px' },
    { value: 'xlarge', label: 'Extra Large', size: '18px' }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1001
        }}
      />

      {/* Personalization Panel */}
      <div style={{
        position: 'absolute',
        top: anchorPosition?.top || '50px',
        right: anchorPosition?.right || '0',
        width: '280px',
        backgroundColor: '#393E46',
        border: '1px solid #222831',
        borderRadius: '4px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
        zIndex: 1002,
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {/* Header */}
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#222831',
          borderBottom: '1px solid #00ADB5',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '18px' }}>🎨</span>
          <span style={{
            color: '#EEEEEE',
            fontSize: '15px',
            fontWeight: '600'
          }}>
            Personalization
          </span>
        </div>

        {/* Theme Section */}
        <div style={{ padding: '16px' }}>
          <div style={{
            color: '#EEEEEE',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Theme
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {themes.map((t) => (
              <div
                key={t.value}
                onClick={() => {
                  setTheme(t.value);
                  console.log('Theme changed to:', t.value);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: theme === t.value ? '#00ADB5' : 'transparent',
                  color: theme === t.value ? '#222831' : '#EEEEEE',
                  transition: 'all 0.15s',
                  border: theme === t.value ? '1px solid #00ADB5' : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (theme !== t.value) {
                    e.currentTarget.style.backgroundColor = '#222831';
                  }
                }}
                onMouseLeave={(e) => {
                  if (theme !== t.value) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '16px' }}>{t.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: theme === t.value ? '600' : '400' }}>
                  {t.label}
                </span>
                {theme === t.value && (
                  <span style={{ marginLeft: 'auto', fontSize: '14px' }}>✓</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div style={{
          height: '1px',
          backgroundColor: '#222831',
          margin: '0 16px'
        }} />

        {/* Font Size Section */}
        <div style={{ padding: '16px' }}>
          <div style={{
            color: '#EEEEEE',
            fontSize: '13px',
            fontWeight: '600',
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Font Size
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {fontSizes.map((f) => (
              <div
                key={f.value}
                onClick={() => {
                  setFontSize(f.value);
                  console.log('Font size changed to:', f.value);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor: fontSize === f.value ? '#00ADB5' : 'transparent',
                  color: fontSize === f.value ? '#222831' : '#EEEEEE',
                  transition: 'all 0.15s',
                  border: fontSize === f.value ? '1px solid #00ADB5' : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (fontSize !== f.value) {
                    e.currentTarget.style.backgroundColor = '#222831';
                  }
                }}
                onMouseLeave={(e) => {
                  if (fontSize !== f.value) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: fontSize === f.value ? '600' : '400' }}>
                  {f.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', opacity: 0.7 }}>
                    {f.size}
                  </span>
                  {fontSize === f.value && (
                    <span style={{ fontSize: '14px' }}>✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid #222831' }}>
          <button
            onClick={() => {
              console.log('Settings applied:', { theme, fontSize });
              onClose();
            }}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#00ADB5',
              color: '#222831',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#00c9d1';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#00ADB5';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Apply Changes
          </button>
        </div>
      </div>
    </>
  );
}