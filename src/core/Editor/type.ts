import {Point} from '../type';

export interface EditorMessage {
    color?: string,
    text: string,
}

export type EditorState = {
    id: string,
    codePoint: number | null,
    menu: number | null,
    size: number,
    origin: Point,
    drag: Point | null,
    scale: number,
    pointer: Point | null,
    element: string | null,
    message: EditorMessage | null,
    config: boolean,
    editing: Array<number>,
    width: number,
    height: number,
    advance: number,
    loading?: boolean,
    saving?: boolean,
    scroll?: boolean,
    axis: number,
    baseline: number,
    grid: number,
    boundingBox: number,
};
