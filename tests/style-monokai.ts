import { Color } from "../src/final";

export default {
    'block-background': 'rgb(37, 38, 32)',
    'block-text-color': 'white',
    'block-text-align': 'center',
    'block-font': "'Open Sans', sans-serif",
    'block-min-width': '150px',
    'block-max-width': '1050px',
    'block-radius': '7px',
    'block-padding': '8px',
    'block-border': '1px solid rgb(25, 25, 25)',

    'block-ball-border': '1px solid rgb(55,55,55)',
    'block-ball-radius': '5px',

    'block-input-color': 'white',
    'block-input-background': new Color(37, 38, 32).lighten(5).rgb,
    'block-input-border': '1px solid rgba(25, 25, 25, 0.5)',
    'block-input-border-radius': '5px',

    'block-checkbox-background': new Color(37, 38, 32).lighten(5).rgb,
    'block-checkbox-border': new Color(37, 38, 32).darken(15).rgb,
    'block-checkbox-background-checked': new Color(37, 38, 32).lighten(5).rgb,
    'block-checkbox-border-checked': new Color(37, 38, 32).darken(15).rgb,
    'block-checkbox-inside': new Color(37, 38, 32).lighten(55).rgb,
    'block-checkbox-radius': '4px',
    'block-checkbox-inside-radius': '50%',

    'motion-color': 'rgb(155, 255, 50)',
    'motion-bottom-line': 'rgb(25,25,25)'
};