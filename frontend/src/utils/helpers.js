export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

export const menuItems = [
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

export const themeOptions = [
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'light', label: 'Light', icon: '☀️' }
];

export const fontSizeOptions = [
    { value: 12, label: 'Small' },
    { value: 14, label: 'Medium' },
    { value: 16, label: 'Large' },
    { value: 18, label: 'Extra Large' }
];

export const languageOptions = [
    { value: 'cpp', label: 'C++' },
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' }
];
export const roomOptions = [
    { action: 'create', label: 'Create Room', icon: '➕' },
    { action: 'join', label: 'Join Room', icon: '🔗' },
    { action: 'leave', label: 'Leave Room', icon: '🚶' }
];