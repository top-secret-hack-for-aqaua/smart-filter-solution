import { ReactNode, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContent } from '@shared/lib/utils';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

type ThemeProps = {
    children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProps) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    const defaultProps = useMemo(() => ({
        theme: theme,
        setTheme: setTheme,
    }), [theme]);

    return (
        <ThemeContent.Provider value={defaultProps}>
            {children}
        </ThemeContent.Provider>
    );
};

