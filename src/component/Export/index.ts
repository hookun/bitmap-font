import {createElement, Fragment} from 'react';
import {useSelector, useDispatch} from '../../core';
import {selectEditableCharacterArray, selectExportFormat} from '../../selector';
import {useMatrixData, useMatrixAndPath} from '../../use';
import {ExportFormat} from '../../constants';
import {SetExportFormat} from '../../action';
import {classnames} from '../../util/classnames';
import className from './style.css';

export const PathLine = (
    {character, format, last, indent, br}: {
        format: string,
        character: string,
        last: boolean,
        indent: string,
        br: string,
    },
) => {
    const {d} = useMatrixAndPath(character);
    let text = '';
    if (format === ExportFormat.SVG) {
        const codePoint = character.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
        text = `${indent}<path id="U${codePoint}" d="${d}"/>`;
    } else if (format === ExportFormat.PathJS) {
        text = `${indent}'${character}': '${d}',`;
    } else {
        text = `${indent}"${character}": "${d}"${last ? '' : ','}`;
    }
    return createElement(Fragment, null, `${text}${br}`);
};

export const MatrixLine = (
    {character, format, last, indent, br}: {
        format: string,
        character: string,
        last: boolean,
        indent: string,
        br: string,
    },
) => {
    const matrixData = useMatrixData(character);
    let text = '';
    if (format === ExportFormat.MatrixJS) {
        text = `${indent}'${character}': '${matrixData}',`;
    } else {
        text = `${indent}"${character}": "${matrixData}"${last ? '' : ','}`;
    }
    return createElement(Fragment, null, `${text}${br}`);
};

export const ExportResult = ({format}: {format: string}) => {
    const characters = useSelector(selectEditableCharacterArray);
    const br = '\n';
    const indent = '    ';
    const lastIndex = characters.length - 1;
    let head = `{${br}`;
    let foot = `}`;
    let Line = MatrixLine;
    if (format === 'SVG') {
        head = `<svg style="height:0">${br}${indent}<defs>${br}`;
        foot = `${indent}</defs>${br}</svg>`;
    }
    switch (format) {
        case ExportFormat.SVG:
        case ExportFormat.PathJSON:
        case ExportFormat.PathJS:
            Line = PathLine;
            break;
        default:
    }
    return createElement(
        'div',
        {className: className.output},
        head,
        ...characters.map((character, index) => createElement(
            Line,
            {
                character,
                format,
                last: index === lastIndex,
                indent,
                br,
            },
        )),
        foot,
    );
};

export const ExportFormatList = () => {
    const currentFormat = useSelector(selectExportFormat);
    const dispatch = useDispatch();
    return createElement(
        'div',
        {className: className.formats},
        ...Object.values(ExportFormat).map((format) => {
            return createElement(
                'button',
                {
                    className: classnames(
                        className.format,
                        currentFormat === format && className.selected,
                    ),
                    onClick: () => dispatch(SetExportFormat(format)),
                },
                format || 'なし',
            );
        }),
    );
};

export const Export = () => {
    const format = useSelector(selectExportFormat);
    return createElement(
        'div',
        {className: className.container},
        createElement('h2', null, '出力'),
        createElement(ExportFormatList),
        format ? createElement(ExportResult, {format}) : createElement(
            'p',
            {className: className.output},
            '編集中は「なし」にしておくと処理を減らせます。',
        ),
    );
};
