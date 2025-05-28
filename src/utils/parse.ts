export function parseWithDate<T = string>(jsonStr: string): T {
    return JSON.parse(jsonStr, (key, value) => {
        if (
            typeof value === 'string' &&
            key.endsWith('At') &&
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
        ) {
            return new Date(value);
        }

        return value;
    });
}
