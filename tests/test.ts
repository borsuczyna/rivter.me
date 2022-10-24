import { Editor, Background, Color, Grabbing } from "../src/final";

const editorDOM: HTMLDivElement = <HTMLDivElement> document.getElementById('editor');
const editor: Editor = new Editor();

const grabbing: Grabbing = new Grabbing();
const background: Background = new Background();

editor
.setDOMElement(editorDOM)
.use(grabbing)
.use(background);

background.color.background = new Color(255, 0, 0);
background.color.background = Color.fromHSL(0, 0, 25);