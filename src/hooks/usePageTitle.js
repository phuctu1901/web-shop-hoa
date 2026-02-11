import { useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

/**
 * Set document.title dynamically from settings.
 * @param {string} pageTitle - The page-specific part (e.g. "Sản phẩm", "Liên hệ")
 */
export function usePageTitle(pageTitle) {
    const { settings } = useSettings();

    useEffect(() => {
        const shopName = settings.shop_name || '';
        const slogan = settings.slogan || '';

        if (pageTitle) {
            document.title = `${pageTitle} - ${shopName}`;
        } else {
            // Home page — show shop name + slogan
            document.title = shopName
                ? (slogan ? `${shopName} - ${slogan}` : shopName)
                : 'Shop Hoa Online';
        }
    }, [pageTitle, settings.shop_name, settings.slogan]);
}
