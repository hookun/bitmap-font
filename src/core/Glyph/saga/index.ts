import {debounce} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {onSetGlyph} from './onSetGlyph';
import {SetGlyph} from '../action';

export const list = () => [
    debounce(
        500,
        getType(SetGlyph),
        onSetGlyph,
    ),
];
