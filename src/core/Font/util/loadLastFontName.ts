import {waitTransactionCompletion} from '../../../util/DBStore';
import {defaultFont} from '../reducer';
import {DB} from '../../type';

export const loadLastFontName = async (
    {names, store}: DB,
): Promise<string> => {
    const database = await store.open();
    const storeName = names.app;
    const tr = database.transaction(storeName, 'readonly');
    const req = tr.objectStore(storeName).get('fontName');
    await waitTransactionCompletion(tr);
    return req.result || defaultFont.fontName;
};
