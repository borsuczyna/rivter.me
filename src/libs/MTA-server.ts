import { Color } from "../utils/color";
import { BlockDefinitions, BlockNodes, loadDefinitions, loadNodes } from "./lib";

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

const nodes: BlockNodes = {
    'player': {
        color: new Color(255, 50, 50),
        validConnections: ['player']
    }
};

loadDefinitions(definitions);
loadNodes(nodes);