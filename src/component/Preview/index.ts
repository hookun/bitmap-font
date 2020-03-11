import {createElement, Fragment} from 'react';
import {useSelector, useDispatch} from '../../core';
import {selectPage, selectPageCharacters, selectCharacter} from '../../selector';
import {useMatrixAndPath, useStore} from '../../use';
import className from './style.css';
import {pages} from '../../constants';
import {SetCharacter, SetPage} from '../../action';
import {CharacterPage} from '../../type';
import {classnames} from '../../util/classnames';

export const CharacterPreview = ({character}: {character: string}) => {
    const store = useStore();
    const currentCharacter = useSelector(selectCharacter);
    const {d, width, height} = useMatrixAndPath(character);
    const size = Math.max(width, height);
    const dispatch = useDispatch();
    const textHeight = size * 0.4;
    if (!character) {
        return createElement('div', {className: className.svg});
    }
    return createElement(
        'svg',
        {
            className: classnames(
                className.svg,
                currentCharacter === character && className.selected,
            ),
            viewBox: `-1 -1 ${size + 2} ${size + 2 + textHeight}`,
            onClick: () => {
                store.get<string>(character)
                .then((matrixData) => {
                    dispatch(SetCharacter({character, matrixData}));
                })
                .catch(console.error);
            },
        },
        createElement(
            'text',
            {
                x: size / 2,
                y: textHeight / 2 - 1,
            },
            character,
        ),
        createElement(
            'path',
            {
                d,
                transform: `translate(${[
                    (size - width) / 2,
                    textHeight + (size - height) / 2
                ].join(',')})`,
            },
        ),
    );
};

export const PageSelector = () => {
    const currentPage = useSelector(selectPage);
    const currentCharacter = useSelector(selectCharacter);
    const store = useStore();
    const dispatch = useDispatch();
    return createElement(
        'div',
        {className: className.pages},
        ...Object.keys(pages).map((page: CharacterPage) => createElement(
            'button',
            {
                className: classnames(
                    className.page,
                    currentPage === page && className.selected,
                ),
                onClick: () => {
                    const index = pages[currentPage].join('').indexOf(currentCharacter);
                    const character = (index < 0 ? '' : pages[page].join('')[index]).trim();
                    store.get<string>(character)
                    .then((matrixData) => dispatch(SetPage({page, character, matrixData})))
                    .catch(console.error);
                },
            },
            page,
        )),
    );
};

export const Preview = () => {
    const characters = useSelector(selectPageCharacters);
    return createElement(
        Fragment,
        null,
        createElement(PageSelector),
        createElement(
            'div',
            {className: className.container},
            ...characters.map((character) => createElement(CharacterPreview, {character})),
        ),
    );
};
