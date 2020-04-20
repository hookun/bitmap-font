import {waitTransactionCompletion} from '../../../util/DBStore';
import {DB} from '../../type';

export const deleteGlyph = async (
    {names, store}: DB,
    id: string,
    codePoint: number,
): Promise<void> => {
    const database = await store.open();
    const storeName = names.glyph;
    const tr = database.transaction(storeName, 'readwrite');
    tr.objectStore(storeName).delete([id, codePoint]);
    await waitTransactionCompletion(tr);
};
