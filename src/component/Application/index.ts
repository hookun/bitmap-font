import {createElement, Fragment, ReactElement} from 'react';
import {Control} from '../Control';
import {GlyphSelector} from '../GlyphSelector';
import {GlyphEditor} from '../GlyphEditor';
import {useSelector} from 'react-redux';
import {selectFontEdting} from '../../core/Font/selector';

export const Application = (): ReactElement => {
    const codePointList = useSelector(selectFontEdting);
    console.log({codePointList});
    return createElement(
        Fragment,
        null,
        createElement(Control),
        createElement(
            'div',
            {
                children: codePointList.map((codePoint) => createElement(
                    GlyphEditor,
                    {key: codePoint, codePoint},
                )),
            },
        ),
        createElement(GlyphSelector),
    );
};
