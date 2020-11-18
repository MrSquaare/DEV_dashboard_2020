export function parseIntOrUndefined(
    string: string | undefined
): number | undefined {
    return string ? parseInt(string) : undefined;
}
