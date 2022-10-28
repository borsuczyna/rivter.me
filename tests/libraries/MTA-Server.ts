import { BlockDefinitions, BlockNodes, Color } from '../../src/final';

export const definitions: BlockDefinitions = {
    '@mta-server: player-joined': {
        name: 'Player joined',
        hoverTip: 'Event is triggered when player joins server',

        motionStart: false,
        motionNext: true,

        inputs: [
            {
                name: 'Callable test',
                hoverTip: 'Player that joined server',
                type: 'player',
                inputText: {
                    placeholder: 'message',
                    default: 'Hello, world!'
                }
            }
        ],
        outputs: [
            {
                name: 'Player',
                hoverTip: 'Player that joined server',
                type: 'player',
            },
            {
                name: 'Player',
                hoverTip: 'Player that joined server',
                type: 'player',
            },
            {
                name: 'Player',
                hoverTip: 'Player that joined server',
                type: 'player',
            },
        ],
        
        isEvent: true,

        generateCode: {
            header: () => 'addEventHandler("onPlayerJoin", resourceRoot, function()',
            footer: () => 'end)'
        }
    }
};

export const nodes: BlockNodes = {
    'player': {
        color: new Color(255, 50, 50),
        validConnections: ['player'],
    }
};