import {useState, useEffect} from 'react';

export const useTheme = (): string => {
    const attr = 'data-theme';
    const root = document.documentElement;
    const [theme, setTheme] = useState(root.getAttribute(attr));
    useEffect(() => {
        const observer = new MutationObserver(() => setTheme(root.getAttribute(attr)));
        observer.observe(root, {attributes: true, attributeFilter: [attr]});
        return (): void => observer.disconnect();
    }, [root]);
    return theme;
};
