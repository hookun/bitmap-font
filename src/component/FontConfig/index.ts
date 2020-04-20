import {
    ReactElement,
    createElement,
    useCallback,
    ChangeEvent,
    useState,
    EventHandler,
    FormEvent,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {classnames} from '@hookun/util/classnames';
import {CloseFontSettings, SetEditorConfig} from '../../core/Editor/action';
import {selectFont} from '../../core/Font/selector';
import {GlyphMetrics} from '../GlyphMetrics';
import {SetFontConfig} from '../../core/Font/action';
import {FontStateLimits} from '../../core/Font/util/patchFontState';
import {EditorStateLimits} from '../../core/Editor/util/patchEditorState';
import {
    selectFontConfig,
    selectEditorWidth,
    selectEditorHeight,
    selectEditorAdvance,
} from '../../core/Editor/selector';
import className from './style.css';

export interface InputData<Type> {
    value: Type,
    error: string,
    onChange: EventHandler<ChangeEvent<HTMLInputElement>>,
}

export interface NumberInputData extends InputData<number> {
    min: number,
    max: number,
    step: number,
}

export const useFontNameInput = (defaultValue: string): InputData<string> => {
    const [{value, error}, setData] = useState({value: defaultValue, error: ''});
    const onChange = useCallback<EventHandler<ChangeEvent<HTMLInputElement>>>(
        (event) => {
            const value = event.currentTarget.value.trim().replace(/\s+/, ' ');
            let error = '';
            if (!value) {
                error = 'フォント名を入力してください。';
            }
            setData({value, error});
        },
        [],
    );
    return {value, error, onChange};
};

export const useSizeInput = (
    defaultValue: number,
    {min, max, step = 1}: {
        min: number,
        max: number,
        step?: number,
    },
): NumberInputData => {
    const [{value, error}, setData] = useState({value: defaultValue, error: ''});
    const onChange = useCallback<EventHandler<ChangeEvent<HTMLInputElement>>>(
        (event) => {
            const value = Number.parseFloat(event.currentTarget.value);
            let error = '';
            if (Number.isInteger(value)) {
                if (min <= value) {
                    if (!(value <= max)) {
                        error = `${max}以下の値を入力してください。`;
                    }
                } else {
                    error = `${min}以上の値を入力してください。`;
                }
            } else {
                error = '整数を入力してください。';
            }
            setData({value, error});
        },
        [max, min],
    );
    return {value, error, min, max, step, onChange};
};

export const FontConfig = (): ReactElement => {
    const dispatch = useDispatch();
    const active = useSelector(selectFontConfig);
    const font = useSelector(selectFont);
    const editorWidth = useSelector(selectEditorWidth);
    const editorHeight = useSelector(selectEditorHeight);
    const editorAdvance = useSelector(selectEditorAdvance);
    const name = useFontNameInput(font.name);
    const ascent = useSizeInput(font.ascent, FontStateLimits.ascent);
    const descent = useSizeInput(font.descent, FontStateLimits.descent);
    const width = useSizeInput(editorWidth, EditorStateLimits.width);
    const height = useSizeInput(editorHeight, EditorStateLimits.height);
    const advance = useSizeInput(editorAdvance, EditorStateLimits.advance);
    const close = useCallback(() => dispatch(CloseFontSettings()), [dispatch]);
    return createElement(
        'div',
        {
            className: classnames(
                className.background,
                active && className.active,
            ),
            onClick: close,
        },
        createElement(
            'form',
            {
                className: className.container,
                onClick: useCallback(
                    (event: MouseEvent) => event.stopPropagation(),
                    [],
                ),
                onSubmit: useCallback(
                    (event: FormEvent) => {
                        event.preventDefault();
                        const error = false
                        || name.error
                        || ascent.error
                        || descent.error
                        || width.error
                        || height.error
                        || advance.error;
                        if (error) {
                            alert(error);
                        } else {
                            dispatch(SetFontConfig({
                                name: name.value,
                                ascent: ascent.value,
                                descent: descent.value,
                            }));
                            dispatch(SetEditorConfig({
                                width: width.value,
                                height: height.value,
                                advance: advance.value,
                            }));
                            dispatch(CloseFontSettings());
                        }
                    },
                    [name, ascent, descent, width, height, advance, dispatch],
                ),
            },
            createElement('h1', null, `フォントの設定 (ID: ${font.id})`),
            createElement('label', {htmlFor: className.name}, 'フォント名'),
            createElement('input', {
                id: className.name,
                className: className.name,
                defaultValue: font.name,
                onChange: name.onChange,
            }),
            createElement('div', {className: className.error}, name.error),
            createElement(GlyphMetrics),
            createElement('label', {htmlFor: className.asc}, '上端 (ascent)'),
            createElement('input', {
                id: className.asc,
                type: 'number',
                min: ascent.min,
                max: ascent.max,
                step: ascent.step,
                className: className.asc,
                defaultValue: font.ascent,
                onChange: ascent.onChange,
            }),
            createElement('div', {className: className.error}, ascent.error),
            createElement('label', {htmlFor: className.desc}, '下端 (descent)'),
            createElement('input', {
                id: className.desc,
                type: 'number',
                min: descent.min,
                max: descent.max,
                step: descent.step,
                className: className.desc,
                defaultValue: font.descent,
                onChange: descent.onChange,
            }),
            createElement('div', {className: className.error}, descent.error),
            createElement('label', {htmlFor: className.width}, '編集画面の幅（画面より大きくはなりません）'),
            createElement('input', {
                id: className.width,
                type: 'number',
                min: width.min,
                max: width.max,
                step: width.step,
                className: className.width,
                defaultValue: editorWidth,
                onChange: width.onChange,
            }),
            createElement('div', {className: className.error}, descent.error),
            createElement('label', {htmlFor: className.height}, '編集画面の高さ'),
            createElement('input', {
                id: className.height,
                type: 'number',
                min: height.min,
                max: height.max,
                step: height.step,
                className: className.height,
                defaultValue: editorHeight,
                onChange: height.onChange,
            }),
            createElement('div', {className: className.error}, descent.error),
            createElement('label', {htmlFor: className.advance}, 'デフォルトの文字幅'),
            createElement('input', {
                id: className.advance,
                type: 'number',
                min: advance.min,
                max: advance.max,
                step: advance.step,
                className: className.advance,
                defaultValue: editorAdvance,
                onChange: advance.onChange,
            }),
            createElement('div', {className: className.error}, descent.error),
            createElement(
                'div',
                {className: className.buttons},
                createElement('button', {onClick: close}, 'キャンセル'),
                createElement('button', {type: 'submit'}, '保存'),
            ),
        ),
    );
};
