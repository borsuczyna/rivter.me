import { Color, Style } from "../final";

export const styleUnity: Style = {
    style: {
        'block-background': 'rgb(57, 57, 57)',
        'block-text-color': new Color().darken(10).rgb,
        'block-text-align': 'left',
        'block-text-padding': '10px',
        'block-font': "'Open Sans', sans-serif",
        'block-min-width': '150px',
        'block-max-width': '1050px',
        'block-radius': '2px',
        'block-padding': '5px',
        'block-border': '1.5px solid rgb(27, 27, 27)',

        'block-ball-border': '1px solid rgb(55,55,55)',

        'block-input-color': 'black',
        'block-input-background': new Color().darken(75).rgb,
        'block-input-border': `1px solid ${new Color().darken(83).rgb}`,
        'block-input-border-radius': '5px',

        'block-checkbox-background': 'rgb(255, 255, 255)',
        'block-checkbox-border': 'rgb(55,55,55)',
        'block-checkbox-background-checked': new Color().darken(70).rgb,
        'block-checkbox-border-checked': new Color().darken(85).rgb,
        'block-checkbox-inside': new Color().darken(80).rgb,
        'block-checkbox-radius': '4px',
        'block-checkbox-inside-radius': '50%',

        'motion-color': 'rgb(155, 255, 50)',
        'motion-bottom-line': 'rgb(27, 27, 27)'
    },
    backgroundColor: new Color(32, 32, 32),
    gridColor: new Color(29, 29, 29),
};