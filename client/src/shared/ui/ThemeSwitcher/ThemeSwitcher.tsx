import cls from './ThemeSwitcher.module.scss';
import { Theme, useTheme } from '@shared/lib';
import Sun from '@assets/icons/sun.svg';
import Moon from '@assets/icons/moon.svg';

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={() => {
                toggleTheme()
            }}
            className={cls.button}>
            {
                theme === Theme.DARK ? <Sun /> : <Moon />
            }
        </button>
    );
};

