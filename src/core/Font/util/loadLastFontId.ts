import {waitTransactionCompletion} from '../../../util/DBStore';
import {DB} from '../../type';
import {generateNewId} from '../../util/generateFontId';

export const loadLastFontId = async (
    {names, store}: DB,
): Promise<string> => {
    const database = await store.open();
    const storeName = names.app;
    const tr = database.transaction(storeName, 'readonly');
    const req = tr.objectStore(storeName).get('fontId');
    await waitTransactionCompletion(tr);
    return req.result || generateNewId();
};
