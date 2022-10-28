export var defaultStyle: BlockStyle = {
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

    'block-input-color': 'white',
    'block-input-background': 'rgb(55, 55, 55)',
    'block-input-border-radius': '5px'
};

export interface BlockStyle {
    [key: string]: string | string[]
};