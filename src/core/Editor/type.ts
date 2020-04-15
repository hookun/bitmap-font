export interface EditorMessage {
    color?: string,
    text: string,
}

export type EditorState = {
    id: string,
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
    editing: Array<number>,
    width: number,
    height: number,
    loading?: boolean,
    saving?: boolean,
    grid: boolean,
};
