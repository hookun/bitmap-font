import {select, call, all} from 'redux-saga/effects';
import {selectDB} from '../../selector';
import {selectFont} from '../selector';
import {saveFont} from '../util/saveFont';
import {DB} from '../../type';
import {FontState} from '../type';

export const onUpdateFont = function* () {
    const [db, font]: [DB, FontState] = yield all([
        select(selectDB),
        select(selectFont),
    ]);
    yield call(saveFont, db, font);
};
