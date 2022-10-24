import { Editor, Background, Color, Grabbing } from "../src/final";

const editorDOM: HTMLDivElement = <HTMLDivElement> document.getElementById('editor');
const editor: Editor = new Editor();

const grabbing: Grabbing = new Grabbing();
const background: Background = new Background();

editor
.setDOMElement(editorDOM)
.use(grabbing)
.use(background);

const editorDOM2: HTMLDivElement = <HTMLDivElement> document.getElementById('editor2');
const editor2: Editor = new Editor();
const background2: Background = new Background();

editor2
.setDOMElement(editorDOM2)
.use(grabbing)
.use(background2);

background2.color.background = new Color(11, 83, 147);
background2.color.grid = new Color(44, 44, 155);
background2.gridSize = 30;
background2.gridWidth = 4;