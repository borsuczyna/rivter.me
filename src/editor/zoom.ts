import { clamp } from "../utils/clamp";
import { editorZoom, setEditorZoom } from "./main";

addEventListener('wheel', (event): void => {
    setEditorZoom(clamp(editorZoom - event.deltaY/400, 0.2, 4));
});