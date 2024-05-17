import {useContext} from "react";
import {LOCAL_STORAGE_THEME_KEY, Theme, UseThemeResult} from "./types";
import {ThemeContent} from "@shared/lib";


export function useTheme(): UseThemeResult {
    const {theme, setTheme} = useContext(ThemeContent);
    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        if (setTheme) {
            setTheme(newTheme);
        }
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };
    return <UseThemeResult>{theme, toggleTheme};
}