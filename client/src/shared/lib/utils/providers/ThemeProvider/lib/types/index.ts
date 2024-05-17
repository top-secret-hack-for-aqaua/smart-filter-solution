export const enum Theme {
    LIGHT = "light",
    DARK = "dark"
}

export interface ThemeContentProps {
    theme?: Theme
    setTheme?: (theme: Theme) => void
}

export const LOCAL_STORAGE_THEME_KEY = "theme";

export interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

