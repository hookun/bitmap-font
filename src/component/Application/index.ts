import {createElement, Fragment, ReactElement, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Control} from '../Control';
import {GlyphSelector} from '../GlyphSelector';
import {GlyphEditor} from '../GlyphEditor';
import {selectFontEditng} from '../../core/Font/selector';
import className from './style.css';
import {FontConfig} from '../FontConfig';
import {selectFontConfig} from '../../core/Editor/selector';

export const Application = (): ReactElement => {
    const codePointList = useSelector(selectFontEditng);
    const configMode = useSelector(selectFontConfig);
    useEffect(
        () => {
            if (configMode) {
                for (const element of document.querySelectorAll(`.${className.app},main`)) {
                    element.classList.add(className.config);
                }
            } else {
                for (const element of document.querySelectorAll(`.${className.config}`)) {
                    element.classList.remove(className.config);
                }
            }
        },
        [configMode],
    );
    return createElement(
        Fragment,
        null,
        createElement(Control),
        createElement(
            'div',
            {className: className.container},
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
        ),
        createElement(FontConfig),
    );
};
