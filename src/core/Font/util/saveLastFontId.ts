import {waitTransactionCompletion} from '../../../util/DBStore';
import {DB} from '../../type';

export const saveLastFontId = async (
    {names, store}: DB,
    id: string,
): Promise<void> => {
    const database = await store.open();
    const storeName = names.app;
    const tr = database.transaction(storeName, 'readwrite');
    tr.objectStore(storeName).put(id, 'fontId');
    await waitTransactionCompletion(tr);
};
