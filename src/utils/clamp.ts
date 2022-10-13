export function clamp(current: number, min: number, max: number) {
    return Math.min(Math.max(current, min), max);
}