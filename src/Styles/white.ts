import { Color, Style } from "../final";

export const styleWhite: Style = {
    style: {
        'block-background': 'rgb(155, 155, 155)',
        'block-text-color': 'rgb(45, 45, 45)',
        'block-text-align': 'center',
        'block-font': "'Open Sans', sans-serif",
        'block-min-width': '150px',
        'block-max-width': '1050px',
        'block-radius': '7px',
        'block-padding': '8px',
        'block-border': '1px solid rgb(55, 55, 55)',

        'block-ball-border': '1px solid rgb(55,55,55)',

        'block-input-color': 'black',
        'block-input-background': 'rgb(200, 200, 200)',
        'block-input-border': '1px solid rgb(100, 100, 100)',
        'block-input-border-radius': '5px',

        'block-checkbox-background': 'rgb(255, 255, 255)',
        'block-checkbox-border': 'rgb(55,55,55)',
        'block-checkbox-background-checked': 'rgb(255,255,255)',
        'block-checkbox-border-checked': 'rgb(65,65,65)',
        'block-checkbox-inside': 'rgb(135,135,135)',
        'block-checkbox-radius': '4px',
        'block-checkbox-inside-radius': '50%',

        'motion-color': 'rgb(155, 255, 50)',
        'motion-bottom-line': 'rgb(55,55,55)'
    },
    backgroundColor: new Color(155, 155, 155, 255).lighten(15),
    gridColor: new Color(100, 100, 100, 100).lighten(15)
};