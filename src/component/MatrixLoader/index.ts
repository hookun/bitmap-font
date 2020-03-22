import {createElement, FormEvent, useRef, useEffect, ReactElement, useCallback} from 'react';
import {useDispatch, useSelector} from '../../old-core';
import {LoadMatrixData} from '../../action';
import className from './style.css';
import {selectMatrixData} from '../../selector';

export const MetrixLoader = (): ReactElement => {
    const ref = useRef<HTMLInputElement>();
    const dispatch = useDispatch();
    const matrixData = useSelector(selectMatrixData);
    useEffect(() => {
        const input = ref.current;
        if (input && matrixData) {
            input.value = matrixData;
        }
    }, [matrixData]);
    return createElement(
        'form',
        {
            className: className.form,
            onSubmit: useCallback(
                (event: FormEvent) => {
                    event.preventDefault();
                    const input = event.currentTarget.querySelector<HTMLInputElement>('[name=matrixData]');
                    if (input) {
                        dispatch(LoadMatrixData(input.value));
                        input.value = '';
                    }
                },
                [dispatch],
            ),
        },
        createElement(
            'input',
            {
                ref,
                name: 'matrixData',
                type: 'text',
                placeholder: matrixData,
            },
        ),
        createElement(
            'button',
            {type: 'submit'},
            '読み込む',
        ),
    );
};
