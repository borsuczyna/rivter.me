import { Editor, Background, Grabbing, Zooming, Block, Color, BlockGrabbing, Cursor, Position2D, Debug, isMobile, Nodes, styleMonokai, styleUnity, LuaGenerator, CodeVisual, styleWhite, styleTest } from "../src/final";
// import { DotNodes } from '../src/Extensions/DotNodes/DotNodes';

const editorDOM: HTMLDivElement = <HTMLDivElement> document.getElementById('editor');

const grabbing: Grabbing = new Grabbing();
const background: Background = new Background();
const zooming: Zooming = new Zooming();
const blockGrabbing: BlockGrabbing = new BlockGrabbing();
const cursor: Cursor = new Cursor();
const debug: Debug = new Debug();
const nodes: Nodes = new Nodes();
const visual: CodeVisual = new CodeVisual();
// const dots: DotNodes = new DotNodes();
// blockGrabbing.mobileSupport = false;

const generator: LuaGenerator = new LuaGenerator();

visual.setDOM(<HTMLDivElement>document.getElementById('code-output'));

// grabbing.limits.minX = 0;
// grabbing.limits.maxX = 200;
// grabbing.limits.minY = 0;
// grabbing.limits.maxY = 200;

addEventListener('click', () => {
    if(!isMobile()) return;

    document.body.requestFullscreen();
})

const block = new Block('@mta-server: player-joined');
const block2 = new Block('@mta-server: send-message');
block2.position.set(350, 0);
block2.updatePosition();
block.createConnection(block2, 'motion-next');
// block.createConnection(block2, 'input', 1, 2);
block.createConnection(block2, 'input', 1, 1);

zooming.min = 0.3;
zooming.max = 3;

import * as MTAServer from './libraries/MTA-Server';

// dots.createDot(new Position2D(250, 250));

const editor = new Editor(editorDOM)
.use(grabbing)
.use(zooming)
.use(background)
.use(blockGrabbing)
.use(cursor)
.use(nodes)
.use(visual)
// .use(dots)
// .use(dots)
// .use(debug)
.loadLibrary(MTAServer.definitions, MTAServer.nodes)
.addBlock(block)
.addBlock(block2)
// .loadStyle(styleTest)
// .loadStyle(styleWhite)
// .loadStyle(styleUnity)
// .loadStyle(styleMonokai)
// .addBlock(new Block('@mta-server: send-message'));

addEventListener('contextmenu', (e) => {
    e.preventDefault();

    let position: Position2D = editor.getEditorFromScreenPosition(new Position2D(e.clientX, e.clientY));
    let block = new Block('@mta-server: send-message');
    block.position = position;
    block.updatePosition();

    editor.addBlock(block);
});

function regenerateCode() {
    generator.htmlHighlights = true;

    // @ts-ignore
    // document.getElementById('code-output').innerHTML = hljs.highlight(generator.generateProject(editor), {
    //     language: 'lua'
    // }).value;

    visual.setCode(generator.generateProject(editor));
    // editor.updateDimensions();
}

editor.addEventHandler('removed-node-connection', regenerateCode);
editor.addEventHandler('new-node-connection', regenerateCode);
document.getElementById('generate')?.addEventListener('click', regenerateCode);

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

let requestAnimationFrame = (callback) => setTimeout(callback, 0)

function updateEditor() {
    requestAnimationFrame(updateEditor);
    
    editor.update();
    // editor2.update();
}

requestAnimationFrame(updateEditor);