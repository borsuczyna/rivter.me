import { BlockDefinitions, loadDefinitions } from "./lib";

const definitions: BlockDefinitions = {
    'Player joined': {
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
            }
        ],
        
        isEvent: true,
    }
};

loadDefinitions(definitions);