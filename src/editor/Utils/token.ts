const characters = 'qwertyuiopasdfghjklzxcvbvnmnmQWERTYUIOIOPASDFGHJHKLZXZCVBNM1234567890';

export class Token {
    static generate(length: number = 32): string {
        return new Array(length).fill('s').map(e => characters.charAt(Math.random()*characters.length)).join('');
    }
}