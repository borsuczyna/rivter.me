import { Block } from "../../Editor/Block/main";
import { Cursor } from "../Cursor/cursor";
import { Editor, EditorExtension } from "../../Editor/main";
import { isMobile } from "../../Editor/Mobile/check";
import { getTouchPosition } from "../../Editor/Mobile/position";
import { Position2D } from "../../Editor/Position/2D";
import { cursorPosition, isMouseButtonDown } from "../../Editor/Utils/cursor";
import { Grabbing } from "./grab";
import { Nodes } from "../../final";
import { DotNodes } from "../../Extensions/DotNodes/DotNodes";

const buildTime: number = new Date().getTime();

export class BlockGrabbing extends EditorExtension {
    name: string = '@borsuk - Block grabbing';
    mobileSupport: boolean = true;
    holding: Block | null;
    holdingPosition: Position2D = new Position2D();
    rotateWhileMoving: boolean = true;
    changeOpacity: boolean = true;

    constructor() {
        super();
    }

    update = (editor: Editor) => {
        if(this.holding) {
            if(
                (
                    isMouseButtonDown(0) ||
                    (isMobile() && this.mobileSupport && getTouchPosition(0).x != 0 && getTouchPosition(0).y != 0)
                ) &&
                !((<Nodes>editor.findExtensionByPartialName('Nodes'))?.holding)
            ) {
                (<Cursor>editor.findExtensionByPartialName('Cursor'))?.setCursor('grabbing');
                let editorPosition: Position2D = editor.getEditorFromScreenPosition(
                    (isMobile() && this.mobileSupport) ? getTouchPosition(0) : cursorPosition
                );
                let prePosition: Position2D = this.holding.position.clone();

                this.holding.position = Position2D.sum(editorPosition, this.holdingPosition);

                if(this.rotateWhileMoving) {
                    let difference: Position2D = Position2D.difference(prePosition, this.holding.position);
                    this.holding.DOM.style.setProperty('--rotation', `${-difference.x/20}deg`);
                }
                
                if(this.changeOpacity) {
                    this.holding.DOM.style.setProperty('opacity', '0.5');
                }

                this.holding.DOM.style.setProperty('z-index', `${Math.floor(new Date().getTime()%buildTime/100)}`);

                this.holding.updatePosition();
            } else {
                this.holding.DOM.style.setProperty('--rotation', `0deg`);
                this.holding.DOM.style.setProperty('opacity', '1');
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

        if(
            hoveredPart == 'header' && 
            !((<Nodes>editor.findExtensionByPartialName('Nodes'))?.holding) &&
            !((<DotNodes>editor.findExtensionByPartialName('Dot nodes'))?.holding)
        ) {
            (<Cursor>editor.findExtensionByPartialName('Cursor'))?.setCursor('grab');

            if(isMouseButtonDown(0) || (isMobile() && this.mobileSupport)) {
                this.holding = overBlock;
                
                let editorPosition: Position2D = editor.getEditorFromScreenPosition((isMobile() && this.mobileSupport) ? getTouchPosition(0) : cursorPosition);
                this.holdingPosition = Position2D.difference(overBlock.position, editorPosition);
            }
        }
    }
}