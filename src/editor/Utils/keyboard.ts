const keysDown = {};

export function isKeyDown(key: string): boolean {
    return !!keysDown[key];
}

addEventListener('keydown', event => {
    keysDown[event.key] = true;
});

addEventListener('keyup', event => {
    keysDown[event.key] = false;
});