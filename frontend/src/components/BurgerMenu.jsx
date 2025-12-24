import React, { useState } from 'react';

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Save', icon: '💾', shortcut: 'Ctrl+S' },
    { type: 'separator' },
    { label: 'Export', icon: '📤', shortcut: 'Ctrl+E' },
    { type: 'separator' },
    { label: 'Personalization', icon: '🎨', shortcut: '' },
    { type: 'separator' },
    { label: 'Language', icon: '💻', shortcut: '' },
    { type: 'separator' },
    { label: 'Logout', icon: '🚪', shortcut: '' }
  ];

  const handleItemClick = (item) => {
    if (item.type === 'separator') return;
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Burger Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          padding: '8px',
          borderRadius: '4px',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#222831'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <div style={{
          width: '24px',
          height: '2px',
          backgroundColor: '#EEEEEE',
          borderRadius: '2px',
          transition: 'all 0.3s'
        }} />
        <div style={{
          width: '24px',
          height: '2px',
          backgroundColor: '#EEEEEE',
          borderRadius: '2px',
          transition: 'all 0.3s'
        }} />
        <div style={{
          width: '24px',
          height: '2px',
          backgroundColor: '#EEEEEE',
          borderRadius: '2px',
          transition: 'all 0.3s'
        }} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
          />

          {/* Menu Panel */}
          <div style={{
            position: 'absolute',
            top: '50px',
            right: '0',
            minWidth: '240px',
            backgroundColor: '#393E46',
            border: '1px solid #222831',
            borderRadius: '4px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
            zIndex: 1000,
            overflow: 'hidden',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            {menuItems.map((item, index) => {
              if (item.type === 'separator') {
                return (
                  <div
                    key={index}
                    style={{
                      height: '1px',
                      backgroundColor: '#222831',
                      margin: '4px 0'
                    }}
                  />
                );
              }

              return (
                <div
                  key={index}
                  onClick={() => handleItemClick(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                    color: '#EEEEEE',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#00ADB5';
                    e.currentTarget.style.color = '#222831';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#EEEEEE';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>
                      {item.icon}
                    </span>
                    <span style={{ fontWeight: '400' }}>
                      {item.label}
                    </span>
                  </div>
                  {item.shortcut && (
                    <span style={{
                      fontSize: '12px',
                      opacity: 0.7,
                      marginLeft: '24px'
                    }}>
                      {item.shortcut}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}