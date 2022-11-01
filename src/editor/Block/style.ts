import { Color } from "../Color/color";

export var defaultStyle: Style = {
    style: {
        '@import': [
            'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap'
        ],

        'block-text-color': 'white',
        'block-text-align': 'center',
        'block-font': "'Open Sans', sans-serif",
        'block-min-width': '150px',
        'block-max-width': '1050px',
        'block-background': 'rgb(40, 40, 40)',
        'block-radius': '7px',
        'block-padding': '8px',
        'block-border': '1px solid rgb(20, 20, 20)',
        'block-text-padding': '0',

        'block-ball-radius': '50%',
        'block-ball-side-radius': '50%',
        'block-ball-gap': '32px',
        'block-ball-side-width': '12px',
        'block-ball-side-height': '12px',

        'block-input-color': 'white',
        'block-input-background': 'rgb(55, 55, 55)',
        'block-input-border-radius': '5px',

        'block-checkbox-background': 'rgb(45,45,45)',
        'block-checkbox-border': 'rgb(55,55,55)',
        'block-checkbox-background-checked': 'rgb(50,50,50)',
        'block-checkbox-border-checked': 'rgb(65,65,65)',
        'block-checkbox-inside': 'rgb(135,135,135)',
        'block-checkbox-radius': '4px',
        'block-checkbox-inside-radius': '50%',

        'motion-color': 'rgb(155, 255, 50)',
        'motion-bottom-line': 'rgb(55,55,55)',
        'motion-left': '-42px',
        'motion-right': '34px',
    },
    backgroundColor: new Color(25, 25, 25),
    gridColor: new Color(20, 20, 20)
};

export interface BlockStyle {
    [key: string]: string | string[]
};

export interface Style {
    style: BlockStyle;
    backgroundColor: Color;
    gridColor: Color;
};