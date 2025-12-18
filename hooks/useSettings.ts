import { useState, useEffect } from 'react';
import { AppSettings } from '../types';

const SETTINGS_KEY = 'ducktravel_v3_settings';

const DEFAULT_SETTINGS: AppSettings = {
  tripStartDate: new Date().toISOString(),
  tripDuration: 5,
  activeUserId: 'm1',
  theme: 'donald'
};

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) setSettings(JSON.parse(stored));
  }, []);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  };

  return { settings, updateSettings };
};