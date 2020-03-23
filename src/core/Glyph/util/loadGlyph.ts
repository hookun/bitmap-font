import {waitTransactionCompletion} from '../../../util/DBStore';
import {GlyphKey, Glyph} from '../type';
import {DB} from '../../type';
import {glyphQuery} from '../../util/glyphQuery';

export const loadGlyph = async (
    {names, store}: DB,
    glyphKey: GlyphKey,
): Promise<Glyph> => {
    const database = await store.open();
    const storeName = names.gryph;
    const tr = database.transaction(storeName, 'readonly');
    const req = tr.objectStore(storeName).get(glyphQuery(glyphKey));
    await waitTransactionCompletion(tr);
    return req.result;
};
