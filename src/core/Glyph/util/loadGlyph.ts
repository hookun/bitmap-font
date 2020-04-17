import {waitTransactionCompletion} from '../../../util/DBStore';
import {GlyphEntry} from '../type';
import {DB} from '../../type';

export const loadGlyph = async (
    {names, store}: DB,
    id: string,
    codePointList: Array<number>,
): Promise<Set<GlyphEntry>> => {
    const database = await store.open();
    const storeName = names.glyph;
    const tr = database.transaction(storeName, 'readonly');
    const sortedCodePointList = codePointList.slice().sort((a, b) => a < b ? -1 : 1);
    const request = await new Promise<IDBRequest<IDBCursorWithValue>>((resolve, reject) => {
        const keyRange = IDBKeyRange.bound(
            [id, sortedCodePointList[0]],
            [id, sortedCodePointList[sortedCodePointList.length - 1]],
        );
        const request = tr.objectStore(storeName).openCursor(keyRange);
        request.onerror = (event): void => reject(request.error || event);
        request.onsuccess = (): void => resolve(request);
    });
    const set = new Set<GlyphEntry>();
    for (const codePoint of sortedCodePointList) {
        let cursor = request.result;
        if (cursor && cursor.key[1] < codePoint) {
            await new Promise((resolve, reject) => {
                request.onerror = (event): void => reject(request.error || event);
                request.onsuccess = resolve;
                request.result.continue([id, codePoint]);
            });
        }
        cursor = request.result;
        if (cursor) {
            set.add(cursor.value);
        }
    }
    await waitTransactionCompletion(tr);
    return set;
};
