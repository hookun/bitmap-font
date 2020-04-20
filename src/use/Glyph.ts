import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Glyph} from '../core/Glyph/type';
import {selectGlyphMap} from '../core/Glyph/selector';
import {EditorStateLimits} from '../core/Editor/util/patchEditorState';
import {selectDB} from '../core/selector';
import {selectFontId} from '../core/Font/selector';
import {loadGlyph} from '../core/Glyph/util/loadGlyph';

const defaultGlyph: Glyph = {
    pixels: new Map(),
    advance: EditorStateLimits.advance.default,
};

export const useGlyph = (codePoint: number): Glyph => {
    const [glyph, setGlyph] = useState<Glyph>(defaultGlyph);
    const map = useSelector(selectGlyphMap);
    const db = useSelector(selectDB);
    const fontId = useSelector(selectFontId);
    const editing = map.get(codePoint);
    useEffect(() => {
        let canceled = false;
        if (editing) {
            if (glyph !== editing) {
                setGlyph(editing);
            }
        } else if (glyph === defaultGlyph) {
            loadGlyph(db, fontId, [codePoint])
            .then((glyphSet) => {
                if (!canceled) {
                    for (const glyphEntry of glyphSet.values()) {
                        setGlyph(glyphEntry.glyph);
                        return;
                    }
                }
            });
        }
        return (): void => {
            canceled = true;
        };
    }, [glyph, editing, codePoint, fontId, db]);
    return glyph;
};
