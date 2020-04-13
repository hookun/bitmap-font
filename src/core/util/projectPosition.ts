export interface ProjectResult {
    size: number,
    origin: [number, number],
}

export const projectPosition = (
    {size, origin, pointer, drag, scale}: {
        size: number,
        origin: [number, number],
        pointer: [number, number],
        drag: [number, number],
        scale: number,
    },
): ProjectResult => {
    let [ox, oy] = origin;
    if (pointer) {
        const r = 1 - scale;
        ox += r * (pointer[0] - ox);
        oy += r * (pointer[1] - oy);
        if (drag) {
            ox += scale * drag[0];
            oy += scale * drag[1];
        }
    }
    return {
        size: size * scale,
        origin: [ox, oy],
    };
};
