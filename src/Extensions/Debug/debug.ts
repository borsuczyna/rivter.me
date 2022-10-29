import { Editor, EditorExtension } from "../../Editor/main";
import { drawDebugGraph } from "./graph";

export class Debug extends EditorExtension {
    name: string = '@borsuk - Debug';
    private frameTime: number[] = [];
    private frames: number[] = [];
    private lastFrame: Date = new Date();
    private currentFrames: number = 0;
    priority: number = 500;

    constructor() {
        super();
    }

    private updateFPS() {
        this.frames.push(this.currentFrames*3);
        this.currentFrames = 0;
    }

    initialize = (editor: Editor) => {
        setInterval(this.updateFPS.bind(this), 1000/3);
    }

    update = (editor: Editor) => {
        if(!editor.DOM.context || !editor.DOM.canvas) return;

        let rect: DOMRect = editor.DOM.canvas.getBoundingClientRect();
        editor.DOM.context.clearRect(0, 0, rect.width, rect.height);

        drawDebugGraph(
            editor.DOM.context,
            rect.width * 0.05,
            rect.height * 0.05,
            rect.width * 0.25,
            rect.height * 0.2,
            this.frameTime,
            80,
            40
        );

        drawDebugGraph(
            editor.DOM.context,
            rect.width * 0.05,
            rect.height * 0.28,
            rect.width * 0.25,
            rect.height * 0.2,
            this.frames,
            10,
            80
        );

        this.frameTime.push(new Date().getTime() - this.lastFrame.getTime());
        this.lastFrame = new Date();

        this.currentFrames++;
    }
}