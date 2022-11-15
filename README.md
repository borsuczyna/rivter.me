# rivter.me
rivter.me is visual scripting engine that is possible to generate any kind of language, by default it supports `Lua` and `JavaScript`. 

Tool can be embedded almost everywhere with CEF implementation.

### Features
- Compilation to real code
- Local variables (if possible) for best performance
- Node based system
- Extendable with easy to write extensions
- Styles
- Built-in code providers
- Clear, easy to modify TypeScript code
- Open source

### Example library
##### Console log
```ts
import { BlockDefinitions, BlockNodes, Color } from './rivter-latest';

export const definitions: BlockDefinitions = {
    '@your-library: console-log': {
        name: 'Console log',
        hoverTip: 'Logs message to console',

        motionStart: true,
        motionNext: true,

        inputs: [
			{
				name: 'Message',
				hoverTip: 'Message that will be logged to the console',
				type: 'string',
			}
		],
        outputs: [
            {
                name: 'success',
                hoverTip: 'was message logged to the console?',
                type: 'boolean',
            },
        ],
        
        isEvent: false,

        generateCode: {
            header: (message) => `console.log(${message});`
        }
    },
};
```

##### Events
```ts
import { BlockDefinitions, BlockNodes, Color } from './rivter-latest';

export const definitions: BlockDefinitions = {
    '@your-library: console-log': {
        name: 'Program started',
        hoverTip: 'Triggered when program is started',

        motionStart: false,
        motionNext: true,

        inputs: [],
        outputs: [
            {
                name: 'Process',
                hoverTip: 'Program process',
                type: 'process',
            },
        ],
        
        isEvent: true,

        generateCode: {
            header: () => `addEventListener('program-started', ({arg1}) => {`,
	    footer: () => `});`
        }
    },
};
```

##### Nodes
```ts
export const nodes: BlockNodes = {
    'string': {
        color: new Color(50, 255, 255),
        validConnections: ['string'],
    },
    'boolean': {
        color: new Color(50, 50, 255),
        validConnections: ['boolean'],
    }
};
```

### Example style
```ts
import { Color, Style } from "../final";

export const styleUnity: Style = {
    style: {
        'block-background': 'rgb(57, 57, 57)',
        'block-checkbox-inside': new Color().darken(80).rgb,
    },
    backgroundColor: new Color(32, 32, 32),
    gridColor: new Color(29, 29, 29),
};
```

## Documentation
#### In-work




![](https://img.shields.io/github/stars/borsuczyna/rivter.me.svg) ![](https://img.shields.io/github/forks/borsuczyna/rivter.me.svg) ![](https://img.shields.io/github/issues/borsuczyna/rivter.me.svg)



#### Join discord to be up-to-date
![Discord Banner 2](https://discordapp.com/api/guilds/1035583058029580378/widget.png?style=banner3)
