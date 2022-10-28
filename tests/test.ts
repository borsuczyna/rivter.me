import { Editor, Background, Grabbing, Zooming, Block, Color } from "../src/final";
import styleWhite from "./style-white";

const editorDOM: HTMLDivElement = <HTMLDivElement> document.getElementById('editor');

const grabbing: Grabbing = new Grabbing();
const background: Background = new Background();
const zooming: Zooming = new Zooming();

// grabbing.limits.minX = 0;
// grabbing.limits.maxX = 200;
// grabbing.limits.minY = 0;
// grabbing.limits.maxY = 200;

const block = new Block('@mta-server: player-joined');
block.position.set(250, 250);
block.updatePosition();

zooming.min = 0.3;
zooming.max = 3;

background.gridWidth = 1;
// background.color.grid = new Color(255, 255, 255, 255);

import * as MTAServer from './libraries/MTA-Server';

const editor = new Editor(editorDOM)
.use(grabbing)
.use(zooming)
.use(background)
.loadLibrary(MTAServer.definitions, MTAServer.nodes)
.addBlock(block)
// .loadStyle(styleWhite)
// .addBlock(new Block('Test'));

// const editorDOM2: HTMLDivElement = <HTMLDivElement> document.getElementById('editor2');
// const editor2: Editor = new Editor();
// const background2: Background = new Background();
// const grabbing2: Grabbing = new Grabbing();
// const zooming2: Zooming = new Zooming();

// zooming.zoomToCursor = false;
// grabbing2.mobileSupport = false;
// zooming2.mobileSupport = false;

// editor2
// .setDOMElement(editorDOM2)
// .use(grabbing2)
// .use(zooming2)
// .use(background2);

// background2.color.background = new Color(11, 83, 147);
// background2.color.grid = new Color(44, 44, 155);
// background2.gridSize = 30;
// background2.gridWidth = 1;

function updateEditor() {
    requestAnimationFrame(updateEditor);
    
    editor.update();
    // editor2.update();
}

requestAnimationFrame(updateEditor);