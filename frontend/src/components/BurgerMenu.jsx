import React, { useState } from 'react';
import api from '../utils/axios.js';
import { getUserSettings, saveUserSettings,clearUserSettings } from '../utils/user.js';
import {useNavigate} from 'react-router-dom';
import { jsPDF } from "jspdf";

export default function BurgerMenu({inRoom,editorRef,theme, setTheme, fontSize, setFontSize, language, setLanguage}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const navigate = useNavigate();

  const handleItemClick = async (item) => {
    if (item.type === 'separator') return;
    
    if (item.hasSubmenu) {
      setActiveSubmenu(activeSubmenu === item.label ? null : item.label);
      return;
    }

    {/*Handle Logout*/}
    if(item.label === 'Logout'){
      try {
        await api.post("/user/logout"); 
        clearUserSettings();
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }

    {/*Handle Save*/}
    if(item.label === 'Save'){
      const content = editorRef.current.getValue();
      try {
        const { data } = await api.put("/editor/user", { content });
        console.log("Content saved →", data);
        const user = getUserSettings();
        if (user) {
          const updatedUser = {
              ...user,
              personalSettingsId: {
                ...user.personalSettingsId,
                content: data.settings.content
              },
              activeSettingsId: {
                ...user.activeSettingsId,
                content : data.settings.content
              }
            };
          saveUserSettings(updatedUser);
        }
      } catch (err) {
        console.error("Content save failed:", err?.response?.data || err.message);
      }
    }

    {/*Handle Export*/}
    if(item.label === 'Export'){
      if (!editorRef?.current) return;

      const code = editorRef.current.getValue() || "";

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4"
      });

      const margin = 40;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const usableWidth = pageWidth - margin * 2;
      const fileName = "code_export.pdf";
      const lineHeight = fontSize * 1.5;

      pdf.setFont("Courier", "Normal");   // Best for code
      pdf.setFontSize(fontSize);

      const text = code.replace(/\t/g, "  ");         // Normalize tabs
      const lines = pdf.splitTextToSize(text, usableWidth);

      let y = margin;

      for (const line of lines) {
        if (y + lineHeight > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, margin, y);
        y += lineHeight;
      }
      pdf.save(fileName);
    }
    console.log('Menu item clicked:', item.label);
    setIsOpen(false);
    setActiveSubmenu(null);
  };

  const handleThemeChange = (value) => {
    setTheme(value);
    console.log('Theme changed to:', value);
  };

  const handleFontSizeChange = (value) => {
    setFontSize(value);
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    setIsOpen(false);
    setActiveSubmenu(null);
  };

  const handleRoomAction = (action) => {
    if (action === 'create' && !inRoom) {
      console.log('Creating room...');
      setIsOpen(false);
      setActiveSubmenu(null);
    } else if (action === 'join' && !inRoom) {
      console.log('Joining room...');
      setIsOpen(false);
      setActiveSubmenu(null);
    } else if (action === 'leave' && inRoom) {
      console.log('Leaving room...');
      setIsOpen(false);
      setActiveSubmenu(null);
    }
  };

  const menuItems = [
    { label: 'Save', icon: '💾', shortcut: 'Ctrl+S' },
    { type: 'separator' },
    { label: 'Export', icon: '📤', shortcut: 'Ctrl+E' },
    { type: 'separator' },
    { label: 'Room', icon: '🚪', shortcut: '', hasSubmenu: true },
    { type: 'separator' },
    { label: 'Personalization', icon: '🎨', shortcut: '', hasSubmenu: true },
    { type: 'separator' },
    { label: 'Language', icon: '💻', shortcut: '', hasSubmenu: true },
    { type: 'separator' },
    { label: 'Logout', icon: '🚪', shortcut: '' }
  ];

  const themeOptions = [
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'light', label: 'Light', icon: '☀️' }
  ];

  const fontSizeOptions = [
    { value: 12, label: 'Small' },
    { value: 14, label: 'Medium' },
    { value: 16, label: 'Large' },
    { value: 18, label: 'Extra Large' }
  ];

  const languageOptions = [
    { value: 'cpp', label: 'C++' },
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' }
  ];

  const roomOptions = [
    { action: 'create', label: 'Create Room', icon: '➕' },
    { action: 'join', label: 'Join Room', icon: '🔗' },
    { action: 'leave', label: 'Leave Room', icon: '🚶' }
  ];

  return (
    <div style={{ position: 'relative' }}>
      {/* Burger Icon Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setActiveSubmenu(null);
        }}
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
            onClick={() => {
              setIsOpen(false);
              setActiveSubmenu(null);
            }}
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
            position: 'fixed',
            top: '60px',
            right: '10px',
            minWidth: '240px',
            maxWidth: '90vw',
            maxHeight: 'calc(100vh - 80px)',
            backgroundColor: '#393E46',
            border: '1px solid #222831',
            borderRadius: '4px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
            zIndex: 1000,
            overflowY: 'auto',
            overflowX: 'hidden',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            WebkitOverflowScrolling: 'touch'
          }}>
            {menuItems.map((item, index) => {
                {/* Separator */}
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
              {/* Menu Item */}
              return (
                <div key={index}>
                  <div
                    onClick={() => handleItemClick(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s',
                      color: '#EEEEEE',
                      fontSize: '14px',
                      backgroundColor: activeSubmenu === item.label ? '#222831' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (activeSubmenu !== item.label) {
                        e.currentTarget.style.backgroundColor = '#00ADB5';
                        e.currentTarget.style.color = '#222831';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSubmenu !== item.label) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#EEEEEE';
                      }
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {item.shortcut && (
                        <span style={{
                          fontSize: '12px',
                          opacity: 0.7
                        }}>
                          {item.shortcut}
                        </span>
                      )}
                      {item.hasSubmenu && (
                        <span style={{ fontSize: '12px' }}>▶</span>
                      )}
                    </div>
                  </div>

                  {/* Room Submenu */}
                  {item.label === 'Room' && activeSubmenu === 'Room' && (
                    <div style={{
                      backgroundColor: '#222831',
                      padding: '8px 16px',
                      borderTop: '1px solid #00ADB5'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {roomOptions.map((option) => {
                          const isDisabled = (option.action === 'leave' && !inRoom) || 
                                           ((option.action === 'create' || option.action === 'join') && inRoom);
                          
                          return (
                            <div
                              key={option.action}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isDisabled) {
                                  handleRoomAction(option.action);
                                }
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 10px',
                                borderRadius: '4px',
                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                                backgroundColor: 'transparent',
                                color: isDisabled ? '#666' : '#EEEEEE',
                                transition: 'all 0.15s',
                                fontSize: '13px',
                                opacity: isDisabled ? 0.5 : 1
                              }}
                              onMouseEnter={(e) => {
                                if (!isDisabled) {
                                  e.currentTarget.style.backgroundColor = '#00ADB5';
                                  e.currentTarget.style.color = '#222831';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isDisabled) {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                  e.currentTarget.style.color = '#EEEEEE';
                                }
                              }}
                            >
                              <span style={{ fontSize: '14px' }}>{option.icon}</span>
                              <span style={{ fontWeight: '400' }}>
                                {option.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Personalization Submenu */}
                  {item.label === 'Personalization' && activeSubmenu === 'Personalization' && (
                    <div style={{
                      backgroundColor: '#222831',
                      padding: '12px 16px',
                      borderTop: '1px solid #00ADB5'
                    }}>
                      {/* Theme Section */}
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{
                          color: '#EEEEEE',
                          fontSize: '12px',
                          fontWeight: '600',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Theme
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {themeOptions.map((t) => (
                            <div
                              key={t.value}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleThemeChange(t.value);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 10px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                backgroundColor: theme === t.value ? '#00ADB5' : 'transparent',
                                color: theme === t.value ? '#222831' : '#EEEEEE',
                                transition: 'all 0.15s',
                                fontSize: '13px'
                              }}
                              onMouseEnter={(e) => {
                                if (theme !== t.value) {
                                  e.currentTarget.style.backgroundColor = '#393E46';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (theme !== t.value) {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              <span style={{ fontSize: '14px' }}>{t.icon}</span>
                              <span style={{ fontWeight: theme === t.value ? '600' : '400' }}>
                                {t.label}
                              </span>
                              {theme === t.value && (
                                <span style={{ marginLeft: 'auto', fontSize: '12px' }}>✓</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Font Size Section */}
                      <div>
                        <div style={{
                          color: '#EEEEEE',
                          fontSize: '12px',
                          fontWeight: '600',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Font Size
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {fontSizeOptions.map((f) => (
                            <div
                              key={f.value}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFontSizeChange(f.value);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '8px 10px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                backgroundColor: fontSize === f.value ? '#00ADB5' : 'transparent',
                                color: fontSize === f.value ? '#222831' : '#EEEEEE',
                                transition: 'all 0.15s',
                                fontSize: '13px'
                              }}
                              onMouseEnter={(e) => {
                                if (fontSize !== f.value) {
                                  e.currentTarget.style.backgroundColor = '#393E46';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (fontSize !== f.value) {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }
                              }}
                            >
                              <span style={{ fontWeight: fontSize === f.value ? '600' : '400' }}>
                                {f.label}
                              </span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '11px', opacity: 0.7 }}>
                                  {f.value}
                                </span>
                                {fontSize === f.value && (
                                  <span style={{ fontSize: '12px' }}>✓</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Language Submenu */}
                  {item.label === 'Language' && activeSubmenu === 'Language' && (
                    <div style={{
                      backgroundColor: '#222831',
                      padding: '8px 16px',
                      borderTop: '1px solid #00ADB5'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {languageOptions.map((lang) => (
                          <div
                            key={lang.value}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLanguageChange(lang.value);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 10px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              backgroundColor: language === lang.value ? '#00ADB5' : 'transparent',
                              color: language === lang.value ? '#222831' : '#EEEEEE',
                              transition: 'all 0.15s',
                              fontSize: '13px'
                            }}
                            onMouseEnter={(e) => {
                              if (language !== lang.value) {
                                e.currentTarget.style.backgroundColor = '#393E46';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (language !== lang.value) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            <span style={{ fontWeight: language === lang.value ? '600' : '400' }}>
                              {lang.label}
                            </span>
                            {language === lang.value && (
                              <span style={{ fontSize: '12px' }}>✓</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
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