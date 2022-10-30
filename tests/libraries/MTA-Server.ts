import { BlockDefinitions, BlockNodes, Color } from '../../src/final';

export const definitions: BlockDefinitions = {
    '@mta-server: player-joined': {
        name: 'Player joined',
        hoverTip: 'Event is triggered when player joins server',

        motionStart: false,
        motionNext: true,

        inputs: [],
        outputs: [
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
    },
    '@mta-server: send-message': {
        name: 'Send message',
        hoverTip: 'Sends message to specified player',

        motionStart: true,
        motionNext: true,

        inputs: [
            {
                name: 'Player',
                hoverTip: 'Player that message will be sent to',
                type: 'player'
            },
            {
                name: 'Message',
                type: 'string',
                inputText: {
                    placeholder: 'message',
                    default: ''
                }
            },
            {
                name: 'Color',
                hoverTip: 'Message color',
                type: 'color'
            },
            {
                name: 'Colored code',
                hoverTip: 'Determinates whether or not \'#RRGGBB\' tags should be used.',
                type: 'check'
            },
        ],
        outputs: [
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
    },
};

export const nodes: BlockNodes = {
    'player': {
        color: new Color(255, 50, 50),
        validConnections: ['player'],
    },
    'string': {
        color: new Color(155, 255, 255),
        validConnections: ['string'],
    },
    'color': {
        color: new Color(155, 255, 50),
        validConnections: ['color'],
    },
    'check': {
        color: new Color(50, 50, 50),
        validConnections: ['check'],
    },
};