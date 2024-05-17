type Mods = Record<string, boolean | string>

export function classNames(cls: string | undefined, mods: Mods, additional: (string | undefined)[]): string {
    const classes = [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([, value]) => Boolean(value))
            .map(([className]) => className)
    ];

    return classes.join(" ").trim(); // Ensure a string is always returned
}
