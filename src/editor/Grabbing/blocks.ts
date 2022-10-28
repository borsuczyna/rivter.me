import { Block } from "../Block/main";
import { Cursor } from "../Cursor/cursor";
import { Editor, EditorExtension } from "../main";
import { isMobile } from "../Mobile/check";
import { getTouchPosition } from "../Mobile/position";
import { Position2D } from "../Position/2D";
import { cursorPosition, isMouseButtonDown } from "../Utils/cursor";
import { Grabbing } from "./grab";

export class BlockGrabbing extends EditorExtension {
    name: string = '@borsuk - Block grabbing';
    mobileSupport: boolean = true;
    holding: Block | null;
    holdingPosition: Position2D = new Position2D();

    constructor() {
        super();
    }

    update = (editor: Editor) => {
        if(this.holding) {
            if(isMouseButtonDown(0) || (isMobile() && this.mobileSupport && getTouchPosition(0).x != 0 && getTouchPosition(0).y != 0)) {
                (<Cursor>editor.findExtensionByPartialName('Cursor'))?.setCursor('grabbing');
                let editorPosition: Position2D = editor.getEditorFromScreenPosition((isMobile() && this.mobileSupport) ? getTouchPosition(0) : cursorPosition);
                this.holding.position = Position2D.sum(editorPosition, this.holdingPosition);
                this.holding.updatePosition();
            } else {
                this.holding = null;
            }

            return;
        }

        let holding = this.editors.some((editor: Editor) => {
            return (<Grabbing>editor.findExtensionByPartialName('Grabbing'))?.grab.holding;
        });

        if(holding) return;

        let overBlock: Block | null = editor.getBlockUnderCursor();
        if(!overBlock) return;

        let hoveredPart: string | boolean = overBlock.getOverPart();
        if(!hoveredPart) return;

        if(hoveredPart == 'header') {
            (<Cursor>editor.findExtensionByPartialName('Cursor'))?.setCursor('grab');

            if(isMouseButtonDown(0) || (isMobile() && this.mobileSupport)) {
                this.holding = overBlock;
                
                let editorPosition: Position2D = editor.getEditorFromScreenPosition((isMobile() && this.mobileSupport) ? getTouchPosition(0) : cursorPosition);
                this.holdingPosition = Position2D.difference(overBlock.position, editorPosition);
            }
        }
    }
}