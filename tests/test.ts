import { Editor, Background, Color, Grabbing, Zooming } from "../src/final";

const editorDOM: HTMLDivElement = <HTMLDivElement> document.getElementById('editor');
const editor: Editor = new Editor();

const grabbing: Grabbing = new Grabbing();
const background: Background = new Background();
const zooming: Zooming = new Zooming();

zooming.min = 0.3;
zooming.max = 4;

editor
.setDOMElement(editorDOM)
.use(grabbing)
.use(zooming)
.use(background);

const editorDOM2: HTMLDivElement = <HTMLDivElement> document.getElementById('editor2');
const editor2: Editor = new Editor();
const background2: Background = new Background();
const grabbing2: Grabbing = new Grabbing();
const zooming2: Zooming = new Zooming();

grabbing2.mobileSupport = false;
zooming2.mobileSupport = !false;

editor2
.setDOMElement(editorDOM2)
.use(grabbing2)
.use(zooming2)
.use(background2);

background2.color.background = new Color(11, 83, 147);
background2.color.grid = new Color(44, 44, 155);
background2.gridSize = 30;
background2.gridWidth = 1;

function updateEditor() {
    requestAnimationFrame(updateEditor);
    
    editor.update();
    editor2.update();
}

requestAnimationFrame(updateEditor);