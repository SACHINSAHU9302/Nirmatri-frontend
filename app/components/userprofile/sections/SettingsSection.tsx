"use client";
import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiBell, FiMoon, FiGlobe, FiCreditCard } from 'react-icons/fi';

export default function SimpleSettingsPage() {
  // All settings in one state
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('simpleSettings');
    return saved ? JSON.parse(saved) : {
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 9876543210",
      notifications: true,
      darkMode: false,
      language: "English",
      currency: "INR",
      autoSave: true
    };
  });

  // Track which field is being edited
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  // Save settings
  const saveSettings = () => {
    localStorage.setItem('simpleSettings', JSON.stringify(settings));
  };

  // Start editing a field
  const startEdit = (field: string, value: string) => {
    setEditingField(null);
    setTempValue(value);
  };

  // Save the edited field
  const saveEdit = () => {
    if (editingField) {
      setSettings({
        ...settings,
        [editingField]: tempValue
      });
      saveSettings();
    }
    setEditingField(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingField(null);
  };

  // Toggle boolean settings
  const toggleSetting = (field: string) => {
    const updated = {
      ...settings,
      [field]: !settings[field]
    };
    setSettings(updated);
    saveSettings();
  };

  // Handle key press (Enter to save)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  // Simple styles
  const styles = {
    page: {
      padding: '20px',
      maxWidth: '500px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    },
    settingItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 0',
      borderBottom: '1px solid #eee',
      cursor: 'pointer'
    },
    settingInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    icon: {
      fontSize: '18px',
      color: '#666'
    },
    label: {
      fontSize: '16px',
      color: '#333'
    },
    value: {
      fontSize: '14px',
      color: '#666'
    },
    editInput: {
      padding: '5px 10px',
      border: '1px solid #0070f3',
      borderRadius: '4px',
      fontSize: '14px',
      width: '200px'
    },
    toggle: {
      width: '40px',
      height: '20px',
      backgroundColor: settings.darkMode ? '#0070f3' : '#ccc',
      borderRadius: '10px',
      position: 'relative' as const,
      cursor: 'pointer'
    },
    toggleCircle: {
      width: '16px',
      height: '16px',
      backgroundColor: 'white',
      borderRadius: '50%',
      position: 'absolute' as const,
      top: '2px',
      left: settings.darkMode ? '22px' : '2px',
      transition: '0.3s'
    },
    select: {
      padding: '5px 10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: 'white'
    }
  };

  // Settings options array
  const settingOptions = [
    {
      id: 'name',
      label: 'Your Name',
      icon: <FiUser style={styles.icon} />,
      type: 'text',
      value: settings.name
    },
    {
      id: 'email',
      label: 'Email Address',
      icon: <FiMail style={styles.icon} />,
      type: 'email',
      value: settings.email
    },
    {
      id: 'phone',
      label: 'Phone Number',
      icon: <FiPhone style={styles.icon} />,
      type: 'tel',
      value: settings.phone
    },
    {
      id: 'language',
      label: 'Language',
      icon: <FiGlobe style={styles.icon} />,
      type: 'select',
      value: settings.language,
      options: ['English', 'Hindi', 'Spanish', 'French']
    },
    {
      id: 'currency',
      label: 'Currency',
      icon: <FiCreditCard style={styles.icon} />,
      type: 'select',
      value: settings.currency,
      options: ['INR', 'USD', 'EUR', 'GBP']
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <FiBell style={styles.icon} />,
      type: 'toggle',
      value: settings.notifications
    },
    {
      id: 'darkMode',
      label: 'Dark Mode',
      icon: <FiMoon style={styles.icon} />,
      type: 'toggle',
      value: settings.darkMode
    },
    {
      id: 'autoSave',
      label: 'Auto Save',
      icon: <FiLock style={styles.icon} />,
      type: 'toggle',
      value: settings.autoSave
    }
  ];

  return (
    <div style={styles.page}>
      {/* Settings List */}
      {settingOptions.map((option) => (
        <div 
          key={option.id} 
          style={styles.settingItem}
          onClick={() => option.type !== 'toggle' && startEdit(option.id, option.value)}
        >
          <div style={styles.settingInfo}>
            {option.icon}
            <div>
              <div style={styles.label}>{option.label}</div>
              {option.type !== 'toggle' && editingField !== option.id && (
                <div style={styles.value}>{option.value}</div>
              )}
            </div>
          </div>

          {/* Display based on type */}
          <div>
            {editingField === option.id ? (
              <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                {option.type === 'select' ? (
                  <select 
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    style={styles.select}
                    autoFocus
                    aria-label={`Select ${option.label}`}
                  >
                    {option.options && option.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={option.type}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    style={styles.editInput}
                    autoFocus
                  />
                )}
                <button 
                  onClick={saveEdit}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  ✓
                </button>
                <button 
                  onClick={cancelEdit}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>
            ) : option.type === 'toggle' ? (
              <div 
                style={{
                  ...styles.toggle,
                  backgroundColor: option.value ? '#0070f3' : '#ccc'
                }}
                onClick={() => toggleSetting(option.id)}
              >
                <div style={{
                  ...styles.toggleCircle,
                  left: option.value ? '22px' : '2px'
                }} />
              </div>
            ) : (
              <div style={styles.value}>{option.value}</div>
            )}
          </div>
        </div>
      ))}

      {/* Simple Status */}
      <div style={{
        marginTop: '30px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#666',
        textAlign: 'center'
      }}>
        Changes are saved automatically
      </div>
    </div>
  );
}