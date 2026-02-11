import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const SettingsContext = createContext({});

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        shop_name: '',
        slogan: '',
        phone: '',
        email: '',
        address: '',
        zalo_url: '',
        facebook_url: '',
        instagram_url: '',
        google_map_url: '',
        logo_url: '',
        favicon_url: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getSettings()
            .then(data => {
                setSettings(prev => ({ ...prev, ...data }));
            })
            .catch(err => console.warn('Settings fetch failed, using defaults:', err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, loading }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);

export default SettingsContext;
