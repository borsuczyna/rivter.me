import { Background } from "../src/Editor/Background/background";
import Color from "../src/Editor/Color/color";
import { Grabbing } from "../src/Editor/Grabbing/grabbing";
import { Editor } from "../src/Editor/main";

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