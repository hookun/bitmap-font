import {createElement} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Application} from './component/Application';
import './style.css';
import {setup} from './core/setup';

const targetElement = document.querySelector('#App');
if (!targetElement) {
    throw new Error('NoElement: No #App found');
}
const appElement = document.createElement('div');
targetElement.replaceWith(appElement);
render(createElement(
    Provider,
    {store: setup(document)},
    createElement(Application),
), appElement);
