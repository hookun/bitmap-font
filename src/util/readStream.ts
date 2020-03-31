export const readStream = async function* <Type>(
    stream: ReadableStream<Type>,
): AsyncGenerator<Type> {
    const reader = stream.getReader();
    while (1) {
        const result = await reader.read();
        if (result.done) {
            break;
        }
        yield result.value;
    }
};
