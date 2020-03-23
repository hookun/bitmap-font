import {createElement, useReducer} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createInitialState, StateContext} from './old-core';
import {pathGeneratorReducer} from './reducer';
import {Application} from './component/Application';
import {SideEffects} from './SideEffect';
import './style.css';
import {setup} from './core/setup';

createInitialState()
.then((initialState) => {
    const targetElement = document.querySelector('#App');
    if (!targetElement) {
        throw new Error('NoElement: No #App found');
    }
    const Temp = createElement(() => createElement(
        StateContext.Provider,
        {value: useReducer(pathGeneratorReducer, initialState)},
        createElement(Application),
        createElement(SideEffects),
    ));
    const appElement = document.createElement('div');
    targetElement.replaceWith(appElement);
    render(createElement(
        Provider,
        {store: setup()},
        Temp,
    ), appElement);
})
.catch(console.error);
