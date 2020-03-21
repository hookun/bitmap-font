import {createElement, Fragment, ReactElement} from 'react';
import {Control} from '../Control';
import {Matrix} from '../Matrix';
import {MetrixLoader} from '../MatrixLoader';
import {Preview} from '../Preview';
import {Export} from '../Export';
import {PathValue} from '../PathValue';

export const Application = (): ReactElement => createElement(
    Fragment,
    null,
    createElement(Control),
    createElement(MetrixLoader),
    createElement(Matrix),
    createElement(PathValue),
    createElement(Preview),
    createElement(Export),
);
