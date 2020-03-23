import {waitTransactionCompletion} from '../../../util/DBStore';
import {Glyph} from '../type';
import {DB} from '../../type';

export const saveGlyph = async (
    {names, store}: DB,
    glyph: Glyph,
): Promise<void> => {
    const database = await store.open();
    const storeName = names.gryph;
    const tr = database.transaction(storeName, 'readwrite');
    tr.objectStore(storeName).put(glyph);
    await waitTransactionCompletion(tr);
};
