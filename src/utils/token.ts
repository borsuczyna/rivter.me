const characters = 'qwsertyuiopasdfghjklzxcvbnbmQWERETYUIOPASDFDGHJKJLZXCXVBNBM123454567890';

export function generateToken(length: number = 16): string {
    let final: string = '';

    while(final.length < length) {
        final += characters.charAt(Math.random()*characters.length);
    }

    return final;
}