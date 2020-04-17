import {waitTransactionCompletion} from '../../../util/DBStore';
import {Glyph} from '../type';
import {DB} from '../../type';

export const saveGlyph = async (
    {names, store}: DB,
    id: string,
    codePoint: number,
    glyph: Glyph,
): Promise<void> => {
    const database = await store.open();
    const storeName = names.glyph;
    const tr = database.transaction(storeName, 'readwrite');
    tr.objectStore(storeName).put({id, codePoint, glyph});
    await waitTransactionCompletion(tr);
};
