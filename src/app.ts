import {createElement} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Application} from './component/Application';
import {setup} from './core/setup';
import './style.css';
import className from './component/Application/style.css';

const targetElement = document.querySelector('#App');
if (!targetElement) {
    throw new Error('NoElement: No #App found');
}
const appElement = document.createElement('div');
appElement.classList.add(className.app);
targetElement.replaceWith(appElement);
render(createElement(
    Provider,
    {store: setup(document)},
    createElement(Application),
), appElement);
