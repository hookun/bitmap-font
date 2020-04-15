import {createElement, Fragment, ReactElement, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Control} from '../Control';
import {GlyphSelector} from '../GlyphSelector';
import {GlyphEditor} from '../GlyphEditor';
import {FontConfig} from '../FontConfig';
import {
    selectFontConfig,
    selectEditngCodePoints,
    selectEditorStyle,
    selectEditor,
} from '../../core/Editor/selector';
import className from './style.css';
import {selectEditorLoading} from '../../core/Editor/selector';

export const Application = (): ReactElement => {
    const codePointList = useSelector(selectEditngCodePoints);
    const configMode = useSelector(selectFontConfig);
    const style = useSelector(selectEditorStyle);
    const editor = useSelector(selectEditor);
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
    if (useSelector(selectEditorLoading)) {
        return createElement(
            'div',
            {className: className.loading},
            '読み込み中',
        );
    }
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
                    style,
                    className: className.editors,
                    children: codePointList.map((codePoint) => createElement(
                        GlyphEditor,
                        {key: codePoint, codePoint},
                    )),
                },
            ),
            createElement(
                'pre',
                {style: {fontFamily: 'monospace'}},
                JSON.stringify(editor, null, 2),
            ),
            createElement(GlyphSelector),
        ),
        createElement(FontConfig),
    );
};
