export interface EditorMessage {
    color?: string,
    text: string,
}

export type EditorState = {
    config?: true,
    codePoint?: number,
    element?: string,
    menu?: true,
    message?: EditorMessage,
};
