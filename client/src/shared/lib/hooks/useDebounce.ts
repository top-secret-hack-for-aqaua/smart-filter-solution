import { useEffect, useState } from 'react';

export const useDebounce = ({ value, delay = 200 }: { value: string, delay: number }) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(value);

    useEffect(
        () => {
            const t = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(t);
            };
        },
        [value, delay],
    );
    return debouncedValue;
};

