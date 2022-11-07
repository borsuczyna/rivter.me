export class Color {
    r: number = 255;
    g: number = 255;
    b: number = 255;
    a: number = 255;

    constructor(r: number = 255, g: number = 255, b: number = 255, a: number = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    get rgb(): string {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    get rgba(): string {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a/255})`;
    }

    get hex(): string {
        return `#${this.r << 16 | this.g << 8 | this.b}`;
    }

    get raw(): string {
        return `${this.r}, ${this.g}, ${this.b}`;
    }

    get hsla(): string {
        let hue = 0;
        let saturation = 0;
        let lightness = 0;

        const r = this.r / 255;
        const g = this.g / 255;
        const b = this.b / 255;

        const minColor = Math.min(r, g, b);
        const maxColor = Math.max(r, g, b);
        const delta = maxColor - minColor;
        lightness = (maxColor + minColor) / 2;
        if (delta === 0) {
            hue = 0;
            saturation = 0;
        } else {
            if (lightness < 0.5) {
                saturation = delta / (maxColor + minColor);
            } else {
                saturation = delta / (2 - maxColor - minColor);
            }

            const hueDelta = {
                r: (((maxColor - r) / 6) + (delta / 2)) / delta,
                g: (((maxColor - g) / 6) + (delta / 2)) / delta,
                b: (((maxColor - b) / 6) + (delta / 2)) / delta
            };

            if (r === maxColor) {
                hue = hueDelta.b - hueDelta.g;
            } else if (g === maxColor) {
                hue = (1 / 3) + hueDelta.r - hueDelta.b;
            } else if (b === maxColor) {
                hue = (2 / 3) + hueDelta.g - hueDelta.r;
            }

            if (hue < 0) {
                hue += 1;
            }

            if (hue > 1) {
                hue -= 1;
            }
        }

        return `hsl(${Math.round(hue * 360)}, ${Math.round(saturation * 100)}%, ${Math.round(lightness * 100)}%)`;
    }

    static fromHEX(hex: string): Color {
        if (hex.length === 7) {
            return new Color(
                parseInt(hex.substring(1, 3), 16),
                parseInt(hex.substring(3, 5), 16),
                parseInt(hex.substring(5, 7), 16)
            );
        } else if (hex.length === 9) {
            return new Color(
                parseInt(hex.substring(1, 3), 16),
                parseInt(hex.substring(3, 5), 16),
                parseInt(hex.substring(5, 7), 16),
                parseInt(hex.substring(7, 9), 16)
            );
        }

        return new Color();
    }

    static fromHSL(h: number, s: number, l: number, a: number = 255): Color {
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;
        if (h < 60) {
            return new Color(c + m, x + m, m, a);
        } else if (h < 120) {
            return new Color(x + m, c + m, m, a);
        } else if (h < 180) {
            return new Color(m, c + m, x + m, a);
        } else if (h < 240) {
            return new Color(m, x + m, c + m, a);
        } else if (h < 300) {
            return new Color(x + m, m, c + m, a);
        } else {
            return new Color(c + m, m, x + m, a);
        }
    }

    static fromHSLA(h: number, s: number, l: number, a: number): Color {
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;
        if (h < 60) {
            return new Color(c + m, x + m, m, a);
        } else if (h < 120) {
            return new Color(x + m, c + m, m, a);
        } else if (h < 180) {
            return new Color(m, c + m, x + m, a);
        } else if (h < 240) {
            return new Color(m, x + m, c + m, a);
        } else if (h < 300) {
            return new Color(x + m, m, c + m, a);
        } else {
            return new Color(c + m, m, x + m, a);
        }
    }

    static fromHSV(h: number, s: number, v: number, a: number = 255): Color {
        const c = v * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = v - c;
        if (h < 60) {
            return new Color(c + m, x + m, m, a);
        } else if (h < 120) {
            return new Color(x + m, c + m, m, a);
        } else if (h < 180) {
            return new Color(m, c + m, x + m, a);
        } else if (h < 240) {
            return new Color(m, x + m, c + m, a);
        } else if (h < 300) {
            return new Color(x + m, m, c + m, a);
        } else {
            return new Color(c + m, m, x + m, a);
        }
    }

    static fromHSVA(h: number, s: number, v: number, a: number): Color {
        const c = v * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = v - c;
        if (h < 60) {
            return new Color(c + m, x + m, m, a);
        } else if (h < 120) {
            return new Color(x + m, c + m, m, a);
        } else if (h < 180) {
            return new Color(m, c + m, x + m, a);
        } else if (h < 240) {
            return new Color(m, x + m, c + m, a);
        } else if (h < 300) {
            return new Color(x + m, m, c + m, a);
        } else {
            return new Color(c + m, m, x + m, a);
        }
    }

    darken(amount) : Color {
        this.r = this.r * (100 - amount) / 100;
        this.g = this.g * (100 - amount) / 100;
        this.b = this.b * (100 - amount) / 100;
        return this;
    }
  
    lighten(amount) : Color {
        this.r = this.r + (255 - this.r) * amount / 100;
        this.g = this.g + (255 - this.g) * amount / 100;
        this.b = this.b + (255 - this.b) * amount / 100;
        return this;
    }

    static fromRGB(color: string): Color {
        const regex = /rgb\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)/;
        const match = regex.exec(color);
        if (match) {
            return new Color(parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10));
        } return new Color();
    }

    static fromRaw(color: string): Color {
        const regex = /(\d{1,3}), ?(\d{1,3}), ?(\d{1,3})/;
        const match = regex.exec(color);
        if (match) {
            return new Color(parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10));
        } return new Color();
    }

    static interpolate(color1: Color, color2: Color, progress: number): Color {
        return new Color(
            color1.r + (color2.r - color1.r) * progress,
            color1.g + (color2.g - color1.g) * progress,
            color1.b + (color2.b - color1.b) * progress,
            color1.a + (color2.a - color1.a) * progress
        );
    }
}