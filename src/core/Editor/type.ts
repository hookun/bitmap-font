export interface EditorMessage {
    color?: string,
    text: string,
}

export type EditorState = {
    codePoint: number | null,
    menu: number | null,
    size: number,
    origin: [number, number],
    drag: [number, number] | null,
    scale: number,
    pointer: [number, number] | null,
    element: string | null,
    message: EditorMessage | null,
    config: boolean,
};
