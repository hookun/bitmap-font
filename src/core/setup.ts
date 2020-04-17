import {combineReducers, applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import {reducer as FontReducer} from './Font/reducer';
import {reducer as KeyboardReducer} from './KeyBoard/reducer';
import {reducer as EditorReducer} from './Editor/reducer';
import {reducer as GlyphReducer} from './Glyph/reducer';
import {list as listFontSaga} from './Font/saga';
import {list as listEditorSaga} from './Editor/saga';
import {list as listGlyphSaga} from './Glyph/saga';
import {list as listDebugSaga} from './Debug/saga';
import {Restart, PointerDown} from './action';
import {PressKey, ReleaseKey} from './KeyBoard/action';
import rootClassName from '../style.css';
import {forEachAncestors} from '../util/forEachAncestors';

export const reducer = combineReducers({
    Font: FontReducer,
    Keyboard: KeyboardReducer,
    Editor: EditorReducer,
    Glyph: GlyphReducer,
});

export const setup = (document: Document): Store => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(reducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run((function* () {
        yield all([
            ...listFontSaga(),
            ...listEditorSaga(),
            ...listGlyphSaga(),
            ...listDebugSaga(),
        ]);
    }));
    store.dispatch(Restart());
    document.addEventListener('keydown', (event) => {
        store.dispatch(PressKey(event));
    });
    document.addEventListener('keyup', (event) => {
        store.dispatch(ReleaseKey(event));
    });
    const isStopped = (element: Element): boolean => {
        let stopped = false;
        forEachAncestors(element as Element, (element) => {
            stopped = element.classList.contains(rootClassName.stopPropagation);
            return stopped;
        });
        return stopped;
    };
    document.addEventListener('mousedown', (event) => {
        if (!isStopped(event.target as Element)) {
            store.dispatch(PointerDown(event));
        }
    });
    document.addEventListener('touchstart', (event) => {
        const {touches: [touch1, touch2]} = event;
        if (!touch2 && isStopped(touch1.target as Element)) {
            store.dispatch(PointerDown(event));
        }
    });
    return store;
};

export type BMFState = ReturnType<typeof reducer>;
export type BMFSelector<Type> = (state: BMFState) => Type;
