export interface EditorMessage {
    color?: string,
    text: string,
}

export type EditorState = {
    codePoint: number | null,
    size: number,
    origin: [number, number],
    pos: [number, number] | null,
    grabbing: null | {
        anchor: [number, number],
        d: [number, number],
    },
    element: string | null,
    menu: boolean,
    message: EditorMessage | null,
    config: boolean,
};
