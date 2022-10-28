import { Block } from "../Block/main";
import { Editor, EditorExtension } from "../main";
import { Grabbing } from "./grab";

export class BlockGrabbing extends EditorExtension {
    name: string = '@borsuk - Block grabbing';
    mobileSupport: boolean = true;
    holding: Block | null;

    constructor() {
        super();
    }

    update = (editor: Editor) => {
        let holding = this.editors.some((editor: Editor) => {
            return (<Grabbing>editor.findExtensionByPartialName('Grabbing'))?.grab.holding;
        });

        if(holding) return;

        let overBlock: Block | null = editor.getBlockUnderCursor();
        if(!overBlock) return;

        console.log(overBlock.getOverPart());
    }
}