import {createElement, useReducer} from 'react';
import {render} from 'react-dom';
import {createInitialState, StateContext} from './old-core';
import {pathGeneratorReducer} from './reducer';
import {Application} from './component/Application';
import {SideEffects} from './SideEffect';
import './style.css';

createInitialState()
.then((initialState) => {
    const targetElement = document.querySelector('#App');
    if (!targetElement) {
        throw new Error('NoElement: No #App found');
    }
    const appElement = document.createElement('div');
    targetElement.replaceWith(appElement);
    render(createElement(() => createElement(
        StateContext.Provider,
        {value: useReducer(pathGeneratorReducer, initialState)},
        createElement(Application),
        createElement(SideEffects),
    )), appElement);
})
.catch(console.error);
