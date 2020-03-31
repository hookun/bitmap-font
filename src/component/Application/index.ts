import {createElement, Fragment, ReactElement} from 'react';
import {useSelector} from 'react-redux';
import {Control} from '../Control';
import {GlyphSelector} from '../GlyphSelector';
import {GlyphEditor} from '../GlyphEditor';
import {selectFontEdting} from '../../core/Font/selector';
import className from './style.css';

export const Application = (): ReactElement => {
    const codePointList = useSelector(selectFontEdting);
    return createElement(
        Fragment,
        null,
        createElement(Control),
        createElement(
            'div',
            {
                className: className.editors,
                children: codePointList.map((codePoint) => createElement(
                    GlyphEditor,
                    {key: codePoint, codePoint},
                )),
            },
        ),
        createElement(GlyphSelector),
    );
};
