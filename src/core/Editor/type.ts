export interface EditorMessage {
    color?: string,
    text: string,
}

export type EditorState = null | {
    codePoint: number,
    element?: string,
    menu?: boolean,
    message?: EditorMessage,
};
