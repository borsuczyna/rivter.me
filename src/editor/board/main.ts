import { editorDimensions, editorPosition, editorZoom, setEditorZoom, updateEditorPosition } from "../main";
import { Position2D } from "../../utils/position";

export interface GrabBoard {
    active: boolean;
    holding: boolean;
    x: number;
    y: number;
};
export var grabBoard = {
    active: false,
    holding: false,
    x: 0,
    y: 0
}

export function getEditorFromBoardPosition(x: number, y: number): Position2D {
    return {
        x: editorDimensions.width/2 + editorPosition.x * editorZoom + x * editorZoom,
        y: editorDimensions.height/2 + editorPosition.y * editorZoom + y * editorZoom
    };
};

export function getBoardFromEditorPosition(x: number, y: number): Position2D {
    return {
        x: (x - editorDimensions.width/2 - editorPosition.x * editorZoom) / editorZoom,
        y: (y - editorDimensions.height/2 - editorPosition.y * editorZoom) / editorZoom
    };
};