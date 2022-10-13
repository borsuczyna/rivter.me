export type KeyDown = string;
interface KeysDown {
    [key: KeyDown]: boolean
};

const keysDown: KeysDown = {};

export function isKeyDown(key: KeyDown) {
    return keysDown[key];
}

addEventListener('keydown', (e) => {
    keysDown[<KeyDown> e.key] = true;

    let event: CustomEvent = new CustomEvent('keyPressed', {
        detail: {
            key: e.key
        }
    });
    window.dispatchEvent(event);
});

addEventListener('keyup', (e) => {
    keysDown[<KeyDown> e.key] = false;

    let event: CustomEvent = new CustomEvent('keyReleased', {
        detail: {
            key: e.key
        }
    });
    window.dispatchEvent(event);
});